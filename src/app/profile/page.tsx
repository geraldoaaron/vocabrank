'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/stores/user-store';
import { getRankTier } from '@/data/rank-tiers';
import { getXPProgressInLevel } from '@/lib/constants';
import { ACHIEVEMENTS } from '@/data/achievements';
import {
  User, Target, Zap, Star, BarChart3, CheckCircle, XCircle, HelpCircle,
  Trophy, Edit3, Save, Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatsRadarChart } from '@/components/profile/stats-radar-chart';
import type { GameplayType } from '@/types';

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const quizHistory = useUserStore((s) => s.quizHistory);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [filter, setFilter] = useState<'all' | GameplayType>('all');

  const tier = getRankTier(user.rating);
  const xpProgress = getXPProgressInLevel(user.xp);
  const accuracy = user.totalQuestions > 0 ? Math.round((user.correctAnswers / user.totalQuestions) * 100) : 0;
  const unlockedAchievements = ACHIEVEMENTS.filter(a => user.achievements.includes(a.id));

  // Dynamic filter logic
  const filteredHistory = filter === 'all' 
    ? quizHistory 
    : quizHistory.filter(h => h.gameplayType === filter || (!h.gameplayType && filter === 'multiple_choice'));

  const filteredTotal = filteredHistory.length;
  const filteredCorrect = filteredHistory.filter(h => h.isCorrect).length;
  const filteredWrong = filteredTotal - filteredCorrect;
  const filteredAccuracy = filteredTotal > 0 ? Math.round((filteredCorrect / filteredTotal) * 100) : 0;
  
  let currentStreak = 0;
  let maxStreak = 0;
  filteredHistory.forEach(a => {
    if (a.isCorrect) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  });

  const displayTotal = filter === 'all' ? user.totalQuestions : filteredTotal;
  const displayCorrect = filter === 'all' ? user.correctAnswers : filteredCorrect;
  const displayWrong = filter === 'all' ? user.wrongAnswers : filteredWrong;
  const displayAccuracy = filter === 'all' ? accuracy : filteredAccuracy;
  const displayBestStreak = filter === 'all' ? user.bestStreak : maxStreak;

  const handleSave = () => {
    updateProfile({ username, bio });
    setIsEditing(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 relative overflow-hidden border-border/50">
          <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-[0.06]`} />
          <div className="relative">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-4" style={{ borderColor: tier.color }}>
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="rounded-lg"
                      placeholder="Username"
                    />
                    <Input
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="rounded-lg"
                      placeholder="Bio"
                    />
                    <Button size="sm" className="rounded-lg gap-1.5" onClick={handleSave}>
                      <Save className="h-3.5 w-3.5" /> Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold">{user.username}</h1>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => setIsEditing(true)}>
                        <Edit3 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="rounded-lg gap-1" style={{ borderColor: tier.color, color: tier.color }}>
                        {tier.icon} {tier.name}
                      </Badge>
                      <Badge variant="outline" className="rounded-lg">
                        {user.countryFlag} {user.country}
                      </Badge>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats and Radar Combined */}
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
        
        {/* Radar Chart: Top on Mobile, Right on Desktop */}
        <motion.div 
          className="w-full md:w-[300px] lg:w-[320px] shrink-0 order-1 md:order-2"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
        >
          <StatsRadarChart filter={filter} setFilter={setFilter} />
        </motion.div>

        {/* Stats Grid: Bottom on Mobile, Left on Desktop */}
        <motion.div
          className="flex-1 order-2 md:order-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 h-full content-start">
            {[
              { icon: Target, label: 'Rating', value: user.rating, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
              { icon: Zap, label: 'Total XP', value: user.xp.toLocaleString(), color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { icon: Star, label: 'Level', value: user.level, color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { icon: BarChart3, label: 'Accuracy', value: `${displayAccuracy}%`, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { icon: HelpCircle, label: 'Total', value: displayTotal, color: 'text-purple-500', bg: 'bg-purple-500/10' },
              { icon: CheckCircle, label: 'Correct', value: displayCorrect, color: 'text-green-500', bg: 'bg-green-500/10' },
              { icon: XCircle, label: 'Wrong', value: displayWrong, color: 'text-red-500', bg: 'bg-red-500/10' },
              { icon: Trophy, label: 'Best Streak', value: `${displayBestStreak}🔥`, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            ].map((stat) => (
              <Card key={stat.label} className="p-3 border-border/50">
                <div className={cn('p-1.5 rounded-lg w-fit mb-1.5', stat.bg)}>
                  <stat.icon className={cn('h-3.5 w-3.5', stat.color)} />
                </div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* XP Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" /> Achievements
          </h2>
          <Badge variant="secondary" className="rounded-lg">
            {unlockedAchievements.length} / {ACHIEVEMENTS.length}
          </Badge>
        </div>

        {unlockedAchievements.length === 0 ? (
          <Card className="p-6 text-center border-border/50">
            <p className="text-muted-foreground text-sm">No achievements yet. Keep playing! 🏆</p>
          </Card>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {unlockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="p-3 text-center border-border/50 hover:shadow-md transition-all">
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <p className="text-[10px] font-medium truncate">{achievement.name}</p>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
