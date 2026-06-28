'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/stores/user-store';
import { ACHIEVEMENTS } from '@/data/achievements';
import { Award, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const tierColors = {
  bronze: 'border-amber-700/30 bg-amber-700/5',
  silver: 'border-gray-400/30 bg-gray-400/5',
  gold: 'border-yellow-500/30 bg-yellow-500/5',
  platinum: 'border-cyan-500/30 bg-cyan-500/5',
  diamond: 'border-blue-400/30 bg-blue-400/5',
};

export default function AchievementsPage() {
  const user = useUserStore((s) => s.user);

  const getProgress = (achievement: typeof ACHIEVEMENTS[0]): number => {
    switch (achievement.type) {
      case 'correct_answers': return Math.min(100, (user.correctAnswers / achievement.requirement) * 100);
      case 'streak': return Math.min(100, (user.streak / achievement.requirement) * 100);
      case 'rating': return Math.min(100, (user.rating / achievement.requirement) * 100);
      case 'total_questions': return Math.min(100, (user.totalQuestions / achievement.requirement) * 100);
      case 'level': return Math.min(100, (user.level / achievement.requirement) * 100);
      case 'perfect_quiz': return user.achievements.includes(achievement.id) ? 100 : 0;
      default: return 0;
    }
  };

  const unlocked = ACHIEVEMENTS.filter(a => user.achievements.includes(a.id));
  const locked = ACHIEVEMENTS.filter(a => !user.achievements.includes(a.id));

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Award className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Achievements</h1>
        </div>
        <p className="text-muted-foreground">
          {unlocked.length} of {ACHIEVEMENTS.length} unlocked
        </p>
      </motion.div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">✨ Unlocked</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unlocked.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * idx }}
              >
                <Card className={cn(
                  'p-4 border-2 hover:shadow-lg transition-all hover:-translate-y-0.5',
                  tierColors[achievement.tier]
                )}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <Badge variant="outline" className="mt-1.5 text-[10px] rounded-md capitalize">
                        {achievement.tier}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">🔒 Locked</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {locked.map((achievement, idx) => {
            const progress = getProgress(achievement);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.03 * idx }}
              >
                <Card className="p-4 border-border/50 opacity-70 hover:opacity-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="text-3xl grayscale">{achievement.icon}</span>
                      <Lock className="h-3 w-3 absolute -bottom-0.5 -right-0.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <div className="mt-2 space-y-1">
                        <Progress value={progress} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground">{Math.round(progress)}%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
