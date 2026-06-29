'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/stores/quiz-store';
import { useUserStore } from '@/stores/user-store';
import { useTimer } from '@/hooks/use-timer';
import { useConfetti } from '@/hooks/use-confetti';
import { useSound } from '@/hooks/use-sound';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizHeader } from '@/components/quiz/quiz-header';
import { QuizCard } from '@/components/quiz/quiz-card';
import { QuizResults } from '@/components/quiz/quiz-results';
import { QUIZ_TIMER_SECONDS, QUIZ_AUTO_ADVANCE_MS, DAILY_CHALLENGE_QUESTIONS, DAILY_CHALLENGE_BONUS_XP, DAILY_CHALLENGE_BONUS_RATING } from '@/lib/constants';
import { CalendarCheck, Clock, Gift, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import type { QuizHistoryEntry } from '@/types';

type Phase = 'info' | 'playing' | 'results';

export default function DailyChallengeQuiz() {
  const [phase, setPhase] = useState<Phase>('info');
  const [lastRatingChange, setLastRatingChange] = useState(0);
  const [lastXPEarned, setLastXPEarned] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  const [totalRatingChange, setTotalRatingChange] = useState(0);
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);

  const today = new Date().toISOString().split('T')[0];
  const {
    session, isAnswered, selectedOptionId,
    startQuiz, answerQuestion, timeoutQuestion, nextQuestion, endQuiz, resetQuiz,
  } = useQuizStore();
  const { addCorrectAnswer, addWrongAnswer, addActivity, completeDailyChallenge, getDailyChallenge, addPerfectQuiz, updateProfile } = useUserStore();
  const user = useUserStore((s) => s.user);
  const dailyChallenge = getDailyChallenge(today);
  const isCompleted = dailyChallenge?.completed ?? false;
  const { fireConfetti } = useConfetti();
  const { playSound } = useSound();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      setHoursRemaining(Math.floor(diff / (1000 * 60 * 60)));
      setMinutesRemaining(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTimeout = () => {
    if (!session || isAnswered) return;
    timeoutQuestion();
    handleAnswerResult(false, null);
  };

  const { timeRemaining, reset: resetTimer } = useTimer(
    QUIZ_TIMER_SECONDS,
    handleTimeout,
    phase === 'playing' && !isAnswered
  );

  const handleStart = () => {
    const started = startQuiz('daily', 'all', 'all', DAILY_CHALLENGE_QUESTIONS);
    if (!started) {
      toast.error('Gagal memulai daily challenge. Data soal tidak tersedia.');
      return;
    }
    setPhase('playing');
    setTotalXPEarned(0);
    setTotalRatingChange(0);
    setTotalCoinsEarned(0);
    resetTimer();
  };

  const handleAnswer = (optionId: string) => {
    if (isAnswered || !session) return;
    playSound('click');
    const timeSpent = QUIZ_TIMER_SECONDS - timeRemaining;
    answerQuestion(optionId, timeSpent);
    const currentQ = session.questions[session.currentIndex];
    const selectedOption = currentQ.options.find(o => o.id === optionId);
    handleAnswerResult(selectedOption?.isCorrect ?? false, optionId, timeSpent);
  };

  const handleAnswerResult = (isCorrect: boolean, optionId: string | null, timeSpent: number = QUIZ_TIMER_SECONDS) => {
    if (!session) return;
    const currentQ = session.questions[session.currentIndex];
    const difficulty = currentQ.question.difficulty;

    const historyEntry: QuizHistoryEntry = {
      id: `hist-${Date.now()}`,
      sessionId: session.id,
      englishWord: currentQ.question.englishWord,
      userAnswer: optionId
        ? currentQ.options.find(o => o.id === optionId)?.text || 'No answer'
        : 'Timed out',
      correctAnswer: currentQ.question.indonesianTranslation,
      isCorrect,
      timeAnswered: new Date().toISOString(),
      difficulty,
      category: currentQ.question.category,
      ratingChange: 0,
      xpEarned: 0,
    };

    if (isCorrect) {
      playSound('correct');
      const result = addCorrectAnswer(difficulty, historyEntry, timeSpent);
      setLastRatingChange(result.ratingChange);
      setLastXPEarned(result.xpEarned);
      setTotalXPEarned(prev => prev + result.xpEarned);
      setTotalRatingChange(prev => prev + result.ratingChange);
      setTotalCoinsEarned(prev => prev + result.coinsEarned);
    } else {
      playSound('incorrect');
      const result = addWrongAnswer(difficulty, historyEntry);
      setLastRatingChange(result.ratingChange);
      setLastXPEarned(0);
      setTotalRatingChange(prev => prev + result.ratingChange);
    }

    setTimeout(() => {
      const hasNext = nextQuestion();
      if (hasNext) {
        setLastRatingChange(0);
        setLastXPEarned(0);
        resetTimer();
      } else {
        const completedSession = endQuiz();
        if (completedSession) {
          const score = completedSession.score;
          const total = completedSession.totalQuestions;
          const isPerfect = score === total;

          // Apply daily bonus
          const finalXP = totalXPEarned + (isCorrect ? lastXPEarned : 0) + DAILY_CHALLENGE_BONUS_XP;
          const finalRating = totalRatingChange + lastRatingChange + DAILY_CHALLENGE_BONUS_RATING;
          // Also give bonus coins for daily challenge!
          const bonusCoins = 50;
          updateProfile({ 
            xp: user.xp + DAILY_CHALLENGE_BONUS_XP, 
            rating: user.rating + DAILY_CHALLENGE_BONUS_RATING,
            coins: (user.coins || 0) + bonusCoins
          });
          setTotalCoinsEarned(prev => prev + bonusCoins);

          completeDailyChallenge(today, score, total);

          if (isPerfect) {
            addPerfectQuiz();
            fireConfetti();
            playSound('achievement');
          }

          addActivity({
            type: 'quiz_complete',
            title: `Daily Challenge: ${score}/${total}`,
            description: `${isPerfect ? '🎯 Perfect! ' : ''}Bonus: +${DAILY_CHALLENGE_BONUS_XP} XP, +${DAILY_CHALLENGE_BONUS_RATING} Rating`,
            xpEarned: finalXP,
            ratingChange: finalRating,
          });

          setTotalXPEarned(prev => prev + DAILY_CHALLENGE_BONUS_XP);
          setTotalRatingChange(prev => prev + DAILY_CHALLENGE_BONUS_RATING);
        }
        setPhase('results');
      }
    }, QUIZ_AUTO_ADVANCE_MS);
  };

  const handlePlayAgain = () => {
    resetQuiz();
    setPhase('info');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {phase === 'info' && (
          <motion.div
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 lg:p-8 max-w-2xl mx-auto space-y-6"
          >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 mb-4">
                <CalendarCheck className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-semibold text-amber-600">Daily Challenge</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Today&apos;s Challenge</h1>
              <p className="text-muted-foreground mt-2">Complete 20 questions for bonus rewards!</p>
            </motion.div>

            <Card className="p-6 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 border-amber-500/10">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <p className="text-2xl font-bold text-amber-500">{DAILY_CHALLENGE_QUESTIONS}</p>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-500">+{DAILY_CHALLENGE_BONUS_XP}</p>
                  <p className="text-xs text-muted-foreground">Bonus XP</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-indigo-500">+{DAILY_CHALLENGE_BONUS_RATING}</p>
                  <p className="text-xs text-muted-foreground">Bonus Rating</p>
                </div>
              </div>

              {isCompleted ? (
                <div className="text-center space-y-3">
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-lg">
                    ✅ Completed Today
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Score: {dailyChallenge?.score}/{dailyChallenge?.totalQuestions}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Next challenge in {hoursRemaining}h {minutesRemaining}m
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Gift className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium">Mixed difficulty from all categories</span>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-xl gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                    onClick={handleStart}
                  >
                    Start Daily Challenge
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {phase === 'playing' && session && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 lg:p-8 max-w-3xl mx-auto"
          >
            <QuizHeader
              currentIndex={session.currentIndex}
              totalQuestions={session.totalQuestions}
              timeRemaining={timeRemaining}
              score={session.score}
              rating={user.rating}
              ratingChange={lastRatingChange}
              xpEarned={lastXPEarned}
            />
            <QuizCard
              question={session.questions[session.currentIndex]}
              isAnswered={isAnswered}
              selectedOptionId={selectedOptionId}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}

        {phase === 'results' && session && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResults
              session={session}
              totalXPEarned={totalXPEarned + DAILY_CHALLENGE_BONUS_XP}
              totalRatingChange={totalRatingChange + DAILY_CHALLENGE_BONUS_RATING}
              totalCoinsEarned={totalCoinsEarned}
              onPlayAgain={() => setPhase('info')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
