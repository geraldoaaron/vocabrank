'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import type { QuizSession } from '@/types';
import { cn } from '@/lib/utils';
import { QuizRadarChart } from '@/components/quiz/quiz-radar-chart';

interface QuizResultsProps {
  session: QuizSession;
  totalXPEarned: number;
  totalRatingChange: number;
  totalCoinsEarned: number;
  onPlayAgain: () => void;
}

export function QuizResults({ session, totalXPEarned, totalRatingChange, totalCoinsEarned, onPlayAgain }: QuizResultsProps) {
  const { score, totalQuestions, answers } = session;
  const accuracy = Math.round((score / totalQuestions) * 100);
  const isPerfect = score === totalQuestions;

  const getGrade = () => {
    if (accuracy === 100) return { label: 'PERFECT!', emoji: '🏆', color: 'text-amber-500' };
    if (accuracy >= 80) return { label: 'Excellent!', emoji: '🌟', color: 'text-emerald-500' };
    if (accuracy >= 60) return { label: 'Good Job!', emoji: '👍', color: 'text-blue-500' };
    if (accuracy >= 40) return { label: 'Keep Trying!', emoji: '💪', color: 'text-amber-500' };
    return { label: 'Practice More!', emoji: '📚', color: 'text-red-500' };
  };

  const grade = getGrade();

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-6xl mb-3"
        >
          {grade.emoji}
        </motion.div>
        <h1 className={cn('text-3xl font-bold', grade.color)}>{grade.label}</h1>
        <p className="text-muted-foreground mt-1">Quiz completed</p>
      </motion.div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className={cn(
          'p-6 text-center border-border/50 relative overflow-hidden',
          isPerfect && 'border-amber-500/30'
        )}>
          {isPerfect && <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />}
          <div className="relative">
            <div className="flex items-center justify-center gap-1 mb-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-bold gradient-text"
              >
                {score}
              </motion.span>
              <span className="text-2xl text-muted-foreground">/ {totalQuestions}</span>
            </div>

            <div className="flex items-center justify-center gap-1 mb-4">
              <div className="w-full max-w-[200px] h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    'h-full rounded-full',
                    accuracy >= 80 ? 'bg-gradient-to-r from-emerald-400 to-green-500' :
                    accuracy >= 60 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                    accuracy >= 40 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                    'bg-gradient-to-r from-red-400 to-rose-500'
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="text-sm font-bold ml-2">{accuracy}%</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-muted/50">
                <Target className="h-4 w-4 text-indigo-500 mx-auto mb-1" />
                <p className={cn('text-lg font-bold', totalRatingChange >= 0 ? 'text-emerald-500' : 'text-red-500')}>
                  {totalRatingChange > 0 ? '+' : ''}{totalRatingChange}
                </p>
                <p className="text-[10px] text-muted-foreground">Rating</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <Zap className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-amber-500">+{totalXPEarned}</p>
                <p className="text-[10px] text-muted-foreground">XP Earned</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <Trophy className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{accuracy}%</p>
                <p className="text-[10px] text-muted-foreground">Accuracy</p>
              </div>
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center shrink-0">
                <span className="text-xl">🪙</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Coins Earned</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">+{totalCoinsEarned}</p>
              </div>
            </Card>
          </div>
        </Card>
      </motion.div>

      {/* Session Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <QuizRadarChart session={session} />
      </motion.div>

      {/* Answers Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-sm font-semibold mb-3">Answer Review</h3>
        <Card className="divide-y divide-border border-border/50">
          {session.questions.map((q, idx) => {
            const answer = answers[idx];
            const isCorrect = answer?.isCorrect ?? false;
            const userAnswer = session.gameplayType === 'multiple_choice'
              ? (answer?.selectedOptionId ? q.options.find(o => o.id === answer.selectedOptionId)?.text : 'Timed out')
              : (answer?.typedAnswer || 'Timed out');

            return (
              <div key={q.question.id} className="p-3 flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{q.question.englishWord}</p>
                  <p className="text-xs text-muted-foreground">
                    {!isCorrect && <span className="text-red-500 line-through mr-1">{userAnswer}</span>}
                    <span className="text-emerald-600 dark:text-emerald-400">{q.question.indonesianTranslation}</span>
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] rounded-lg shrink-0">
                  {q.question.difficulty}
                </Badge>
              </div>
            );
          })}
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3"
      >
        <Button
          size="lg"
          className="flex-1 rounded-xl gap-2 gradient-primary text-white shadow-lg shadow-indigo-500/25"
          onClick={onPlayAgain}
        >
          <RotateCcw className="h-4 w-4" />
          Play Again
        </Button>
        <Link
          href="/dashboard"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background hover:bg-muted text-sm font-medium h-9 px-4 transition-colors"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
