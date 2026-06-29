'use client';

import { create } from 'zustand';
import type { QuizQuestion, QuizSession, QuizAnswer, Difficulty, Category } from '@/types';
import { VOCABULARY, generateQuizOptions, shuffleArray, getFilteredQuestions } from '@/data/vocabulary';
import { useUserStore } from '@/stores/user-store';

interface QuizState {
  session: QuizSession | null;
  isAnswered: boolean;
  selectedOptionId: string | null;
  timeRemaining: number;

  // Actions
  startQuiz: (mode: 'practice' | 'daily' | 'ranked', difficulty: Difficulty | 'all', category: Category | 'all', questionCount: number) => boolean;
  answerQuestion: (optionId: string, timeSpent: number) => QuizAnswer;
  timeoutQuestion: () => QuizAnswer;
  nextQuestion: () => boolean; // returns false if quiz is over
  endQuiz: () => QuizSession | null;
  resetQuiz: () => void;
  setTimeRemaining: (time: number) => void;
}

export const useQuizStore = create<QuizState>()((set, get) => ({
  session: null,
  isAnswered: false,
  selectedOptionId: null,
  timeRemaining: 10,

  startQuiz: (mode, difficulty, category, questionCount) => {
    const userState = useUserStore.getState();
    const unlockedVocab = userState.user.unlockedVocab || [];
    
    // Fallback if they haven't claimed starter (though they shouldn't be able to start)
    const baseQuestions = getFilteredQuestions(
      difficulty as string,
      category as string
    );

    // Only allow questions that the user has unlocked
    const filteredQuestions = baseQuestions.filter(q => unlockedVocab.includes(q.id));

    if (filteredQuestions.length === 0) return false;

    const selectedQuestions = shuffleArray(filteredQuestions).slice(0, questionCount);
    const quizQuestions: QuizQuestion[] = selectedQuestions.map((q) => ({
      question: q,
      options: generateQuizOptions(q, VOCABULARY),
    }));

    const session: QuizSession = {
      id: `quiz-${Date.now()}`,
      mode,
      difficulty,
      category,
      questions: quizQuestions,
      currentIndex: 0,
      score: 0,
      totalQuestions: quizQuestions.length,
      startedAt: new Date().toISOString(),
      answers: [],
    };

    set({ session, isAnswered: false, selectedOptionId: null, timeRemaining: 10 });
    return true;
  },

  answerQuestion: (optionId, timeSpent) => {
    const { session } = get();
    if (!session) {
      return { questionId: '', selectedOptionId: null, isCorrect: false, timeSpent: 0, ratingChange: 0, xpEarned: 0 };
    }

    const currentQuestion = session.questions[session.currentIndex];
    const selectedOption = currentQuestion.options.find((o) => o.id === optionId);
    const isCorrect = selectedOption?.isCorrect ?? false;

    const answer: QuizAnswer = {
      questionId: currentQuestion.question.id,
      selectedOptionId: optionId,
      isCorrect,
      timeSpent,
      ratingChange: 0,
      xpEarned: 0,
    };

    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            score: isCorrect ? state.session.score + 1 : state.session.score,
            answers: [...state.session.answers, answer],
          }
        : null,
      isAnswered: true,
      selectedOptionId: optionId,
    }));

    return answer;
  },

  timeoutQuestion: () => {
    const { session } = get();
    if (!session) {
      return { questionId: '', selectedOptionId: null, isCorrect: false, timeSpent: 10, ratingChange: 0, xpEarned: 0 };
    }

    const currentQuestion = session.questions[session.currentIndex];
    const answer: QuizAnswer = {
      questionId: currentQuestion.question.id,
      selectedOptionId: null,
      isCorrect: false,
      timeSpent: 10,
      ratingChange: 0,
      xpEarned: 0,
    };

    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            answers: [...state.session.answers, answer],
          }
        : null,
      isAnswered: true,
      selectedOptionId: null,
    }));

    return answer;
  },

  nextQuestion: () => {
    const { session } = get();
    if (!session) return false;

    const nextIndex = session.currentIndex + 1;
    if (nextIndex >= session.totalQuestions) {
      return false;
    }

    set({
      session: { ...session, currentIndex: nextIndex },
      isAnswered: false,
      selectedOptionId: null,
      timeRemaining: 10,
    });
    return true;
  },

  endQuiz: () => {
    const { session } = get();
    if (!session) return null;

    const completedSession = {
      ...session,
      completedAt: new Date().toISOString(),
    };

    set({ session: completedSession });
    return completedSession;
  },

  resetQuiz: () => {
    set({ session: null, isAnswered: false, selectedOptionId: null, timeRemaining: 10 });
  },

  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },
}));
