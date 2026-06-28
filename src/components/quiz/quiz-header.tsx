'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Zap, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  score: number;
  rating: number;
  ratingChange: number;
  xpEarned: number;
}

export function QuizHeader({
  currentIndex,
  totalQuestions,
  timeRemaining,
  score,
  rating,
  ratingChange,
  xpEarned,
}: QuizHeaderProps) {
  const progress = ((currentIndex) / totalQuestions) * 100;
  const isUrgent = timeRemaining <= 3;

  return (
    <div className="mb-6 space-y-4">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground font-medium">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{score} correct</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Timer */}
        <motion.div
          animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isUrgent ? Infinity : 0, duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className={cn(
              'text-base px-3 py-1.5 rounded-xl gap-1.5 font-bold transition-colors',
              isUrgent
                ? 'border-red-500/50 text-red-500 bg-red-500/10'
                : 'border-border'
            )}
          >
            <Timer className={cn('h-4 w-4', isUrgent && 'text-red-500')} />
            {timeRemaining}s
          </Badge>
        </motion.div>

        {/* Rating + XP indicators */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-xl gap-1.5 px-2.5 py-1">
            <Target className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-medium">{rating}</span>
            <AnimatePresence>
              {ratingChange !== 0 && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={cn(
                    'text-xs font-bold',
                    ratingChange > 0 ? 'text-emerald-500' : 'text-red-500'
                  )}
                >
                  {ratingChange > 0 ? '+' : ''}{ratingChange}
                </motion.span>
              )}
            </AnimatePresence>
          </Badge>

          <AnimatePresence>
            {xpEarned > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Badge className="rounded-xl gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-bold">+{xpEarned} XP</span>
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
