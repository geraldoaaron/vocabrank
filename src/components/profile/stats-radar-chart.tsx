'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserStore } from '@/stores/user-store';
import type { GameplayType } from '@/types';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface StatsRadarChartProps {
  filter: 'all' | GameplayType;
  setFilter: (val: 'all' | GameplayType) => void;
}

export function StatsRadarChart({ filter, setFilter }: StatsRadarChartProps) {
  const user = useUserStore((s) => s.user);
  const quizHistory = useUserStore((s) => s.quizHistory);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter history based on selected mode
  const filteredHistory = filter === 'all' 
    ? quizHistory 
    : quizHistory.filter(h => h.gameplayType === filter || (!h.gameplayType && filter === 'multiple_choice'));

  const historyLen = Math.max(filteredHistory.length, 1);

  // 1. Accuracy (Calculated from filtered history)
  const correctInHistory = filteredHistory.filter(h => h.isCorrect).length;
  const accuracy = filteredHistory.length > 0 ? Math.round((correctInHistory / filteredHistory.length) * 100) : 0;
  
  // 2. Speed (Average time spent, default 6s if undefined for old data)
  const totalTimeSpent = filteredHistory.reduce((acc, a) => acc + (a.timeSpent !== undefined ? a.timeSpent : 6), 0);
  const avgTime = filteredHistory.length > 0 ? totalTimeSpent / historyLen : 10;
  const speed = Math.round(100 - (avgTime / 10 * 100));

  // 3. Focus (Percentage of non-timeout answers)
  const timeoutCount = filteredHistory.filter(a => a.userAnswer === 'Timed out').length;
  const focus = filteredHistory.length > 0 ? Math.round(100 - (timeoutCount / historyLen * 100)) : 0;

  // 4. Reflex (Percentage of correct answers made under fast threshold)
  const fastCorrect = filteredHistory.filter(a => {
    if (!a.isCorrect) return false;
    const itemThreshold = (a.gameplayType === 'typing_translate' || a.gameplayType === 'typing_definition') ? 8 : 4;
    const timeSpent = a.timeSpent !== undefined ? a.timeSpent : 6;
    return timeSpent <= itemThreshold;
  }).length;
  const reflex = filteredHistory.length > 0 ? Math.round((fastCorrect / historyLen) * 100) : 0;
  
  // 5. Tenacity (Longest contiguous correct answers in history)
  let currentTenacity = 0;
  let maxTenacity = 0;
  filteredHistory.forEach(a => {
    if (a.isCorrect) {
      currentTenacity++;
      if (currentTenacity > maxTenacity) maxTenacity = currentTenacity;
    } else {
      currentTenacity = 0;
    }
  });
  const tenacity = Math.min(Math.round((maxTenacity / 20) * 100), 100); // 20 correct in a row = 100

  // 6. Mastery (Average difficulty of correct answers)
  const diffMap: Record<string, number> = { easy: 40, medium: 60, hard: 80, expert: 100, all: 70 };
  const correctAnswersHistory = filteredHistory.filter(a => a.isCorrect);
  const totalDifficulty = correctAnswersHistory.reduce((acc, a) => acc + (diffMap[a.difficulty] || 50), 0);
  const mastery = correctAnswersHistory.length > 0 ? Math.round(totalDifficulty / correctAnswersHistory.length) : 0;
  
  // Normalize stats to 0-100 scale for the radar chart
  const data = [
    { subject: 'Accuracy', value: accuracy, realValue: `${accuracy}%`, fullMark: 100 },
    { subject: 'Speed', value: Math.max(speed, 0), realValue: filteredHistory.length > 0 ? `${avgTime.toFixed(1)}s avg` : 'N/A', fullMark: 100 },
    { subject: 'Reflex', value: reflex, realValue: `${reflex}% fast`, fullMark: 100 },
    { subject: 'Focus', value: focus, realValue: `${focus}%`, fullMark: 100 },
    { subject: 'Tenacity', value: tenacity, realValue: `${maxTenacity} Streak`, fullMark: 100 },
    { subject: 'Mastery', value: mastery, realValue: `${mastery}/100 diff.`, fullMark: 100 },
  ];

  if (!mounted) return <Card className="h-[300px] border-border/50 animate-pulse bg-muted/50" />;

  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#818cf8' : '#6366f1'; 
  const fillColor = isDark ? '#818cf8' : '#6366f1';
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <Card className="p-4 border-border/50 h-[320px] flex flex-col relative overflow-hidden bg-gradient-to-br from-card to-card/50">
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          Overall Performance
        </h3>
        <Select value={filter} onValueChange={(val: any) => setFilter(val)}>
          <SelectTrigger className="w-[140px] h-7 text-xs bg-card">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="multiple_choice">Choices</SelectItem>
            <SelectItem value="typing_translate">Typing</SelectItem>
            <SelectItem value="typing_definition">Definition</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 w-full h-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: textColor, fontSize: 11, fontWeight: 600 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500,
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: any, name: any, props: any) => [props.payload.realValue, props.payload.subject]}
              labelStyle={{ display: 'none' }}
            />
            <Radar
              name="Performance"
              dataKey="value"
              stroke={strokeColor}
              fill={fillColor}
              fillOpacity={0.4}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
