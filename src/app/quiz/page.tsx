'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/stores/quiz-store';
import { useUserStore } from '@/stores/user-store';
import { useTimer } from '@/hooks/use-timer';
import { useConfetti } from '@/hooks/use-confetti';
import { useSound } from '@/hooks/use-sound';
import { QUIZ_TIMER_SECONDS, QUIZ_AUTO_ADVANCE_MS } from '@/lib/constants';
import { QuizSetup } from '@/components/quiz/quiz-setup';
import { QuizHeader } from '@/components/quiz/quiz-header';
import { QuizCard } from '@/components/quiz/quiz-card';
import { QuizResults } from '@/components/quiz/quiz-results';
import type { Difficulty, Category, QuizHistoryEntry } from '@/types';
import { toast } from 'sonner';

type QuizPhase = 'setup' | 'playing' | 'results';

export default function QuizPage() {
  const [phase, setPhase] = useState<QuizPhase>('setup');
  const [lastRatingChange, setLastRatingChange] = useState(0);
  const [lastXPEarned, setLastXPEarned] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  const [totalRatingChange, setTotalRatingChange] = useState(0);

  const {
    session,
    isAnswered,
    selectedOptionId,
    startQuiz,
    answerQuestion,
    timeoutQuestion,
    nextQuestion,
    endQuiz,
    resetQuiz,
  } = useQuizStore();

  const { addCorrectAnswer, addWrongAnswer, addActivity } = useUserStore();
  const user = useUserStore((s) => s.user);
  const addPerfectQuiz = useUserStore((s) => s.addPerfectQuiz);
  const { fireConfetti } = useConfetti();
  const { playSound } = useSound();

  const handleTimeout = () => {
    if (!session || isAnswered) return;
    const answer = timeoutQuestion();
    handleAnswerResult(answer.isCorrect, null);
  };

  const { timeRemaining, reset: resetTimer } = useTimer(
    QUIZ_TIMER_SECONDS,
    handleTimeout,
    phase === 'playing' && !isAnswered
  );

  const handleStartQuiz = (difficulty: Difficulty | 'all', category: Category | 'all', count: number) => {
    const started = startQuiz('practice', difficulty, category, count);
    if (!started) {
      toast.error('Belum ada soal untuk kategori & kesulitan ini. Coba kombinasi lain!');
      return;
    }
    setPhase('playing');
    setTotalXPEarned(0);
    setTotalRatingChange(0);
    resetTimer();
  };

  const handleAnswer = (optionId: string) => {
    if (isAnswered || !session) return;
    playSound('click');
    const timeSpent = QUIZ_TIMER_SECONDS - timeRemaining;
    const answer = answerQuestion(optionId, timeSpent);
    handleAnswerResult(answer.isCorrect, optionId, timeSpent);
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
        ? currentQ.options.find((o) => o.id === optionId)?.text || 'No answer'
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
      setTotalXPEarned((prev) => prev + result.xpEarned);
      setTotalRatingChange((prev) => prev + result.ratingChange);
    } else {
      playSound('incorrect');
      const result = addWrongAnswer(difficulty, historyEntry);
      setLastRatingChange(result.ratingChange);
      setLastXPEarned(0);
      setTotalRatingChange((prev) => prev + result.ratingChange);
    }

    // Auto advance
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

          if (isPerfect) {
            addPerfectQuiz();
            fireConfetti();
            playSound('achievement');
          }

          addActivity({
            type: 'quiz_complete',
            title: `Quiz Completed: ${score}/${total}`,
            description: `${isPerfect ? '🎯 Perfect score! ' : ''}Earned ${totalXPEarned + (isCorrect ? lastXPEarned : 0)} XP`,
            xpEarned: totalXPEarned + (isCorrect ? lastXPEarned : 0),
            ratingChange: totalRatingChange + lastRatingChange,
          });
        }
        setPhase('results');
      }
    }, QUIZ_AUTO_ADVANCE_MS);
  };

  const handlePlayAgain = () => {
    resetQuiz();
    setPhase('setup');
    setLastRatingChange(0);
    setLastXPEarned(0);
    setTotalXPEarned(0);
    setTotalRatingChange(0);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizSetup onStart={handleStartQuiz} />
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
              totalXPEarned={totalXPEarned}
              totalRatingChange={totalRatingChange}
              onPlayAgain={handlePlayAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
