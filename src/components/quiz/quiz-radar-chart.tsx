'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { QuizSession } from '@/types';

interface QuizRadarChartProps {
  session: QuizSession;
}

export function QuizRadarChart({ session }: QuizRadarChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalQuestions = session.totalQuestions || 1;
  
  // 1. Accuracy
  const accuracy = Math.round((session.score / totalQuestions) * 100);

  // 2. Speed (Average time spent, inverted so faster is higher score. Max 10s per Q)
  const totalTimeSpent = session.answers.reduce((acc, a) => acc + (a.timeSpent || 0), 0);
  const avgTime = totalTimeSpent / totalQuestions;
  const speed = Math.round(100 - (avgTime / 10 * 100));

  // 3. Focus (Percentage of non-timeout answers)
  // Timeout happens when both selectedOptionId and typedAnswer are null/empty
  const timeoutCount = session.answers.filter(a => !a.selectedOptionId && !a.typedAnswer).length;
  const focus = Math.round(100 - (timeoutCount / totalQuestions * 100));

  // 4. Reflex (Percentage of correct answers made under fast threshold)
  const fastThreshold = (session.gameplayType === 'typing_translate' || session.gameplayType === 'typing_definition') ? 8 : 4;
  const fastCorrect = session.answers.filter(a => a.isCorrect && a.timeSpent <= fastThreshold).length;
  const reflex = Math.round((fastCorrect / totalQuestions) * 100);

  // 5. Consistency (Longest correct streak within the session)
  let currentStreak = 0;
  let maxStreak = 0;
  session.answers.forEach(a => {
    if (a.isCorrect) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  });
  const consistency = Math.round((maxStreak / totalQuestions) * 100);

  // 6. Difficulty Base Score
  const diffMap: Record<string, number> = { easy: 40, medium: 60, hard: 80, expert: 100, all: 70 };
  const difficulty = diffMap[session.difficulty] || 50;

  const data = [
    { subject: 'Accuracy', value: accuracy, fullMark: 100 },
    { subject: 'Speed', value: Math.max(speed, 0), fullMark: 100 },
    { subject: 'Reflex', value: reflex, fullMark: 100 },
    { subject: 'Focus', value: focus, fullMark: 100 },
    { subject: 'Consistency', value: consistency, fullMark: 100 },
    { subject: 'Difficulty', value: difficulty, fullMark: 100 },
  ];

  if (!mounted) return <Card className="h-[250px] border-border/50 animate-pulse bg-muted/50" />;

  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#818cf8' : '#6366f1'; 
  const fillColor = isDark ? '#818cf8' : '#6366f1';
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <Card className="p-4 border-border/50 h-[280px] flex flex-col relative overflow-hidden bg-card shadow-sm">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xs font-semibold flex items-center gap-2 text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Session Analysis
        </h3>
      </div>
      <div className="flex-1 w-full h-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: textColor, fontSize: 10, fontWeight: 600 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 500,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: any, name: string) => [`${value}/100`, name]}
              labelStyle={{ display: 'none' }}
            />
            <Radar
              name="Performance"
              dataKey="value"
              stroke={strokeColor}
              fill={fillColor}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
