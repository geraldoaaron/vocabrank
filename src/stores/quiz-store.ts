'use client';

import { create } from 'zustand';
import type { QuizQuestion, QuizSession, QuizAnswer, Difficulty, Category, GameplayType } from '@/types';
import { VOCABULARY, generateQuizOptions, shuffleArray, getFilteredQuestions } from '@/data/vocabulary';
import { useUserStore } from '@/stores/user-store';

interface QuizState {
  session: QuizSession | null;
  isAnswered: boolean;
  selectedOptionId: string | null;
  typedAnswer: string | null;
  timeRemaining: number;

  // Actions
  startQuiz: (mode: 'practice' | 'daily' | 'ranked', gameplayType: GameplayType, difficulty: Difficulty | 'all', category: Category | 'all', questionCount: number) => boolean;
  answerQuestion: (optionId: string | null, typedAnswer: string | null, timeSpent: number) => QuizAnswer;
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
  typedAnswer: null,
  timeRemaining: 10,

  startQuiz: (mode, gameplayType, difficulty, category, questionCount) => {
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
      gameplayType,
      difficulty,
      category,
      questions: quizQuestions,
      currentIndex: 0,
      score: 0,
      totalQuestions: quizQuestions.length,
      startedAt: new Date().toISOString(),
      answers: [],
    };

    set({ session, isAnswered: false, selectedOptionId: null, typedAnswer: null, timeRemaining: 10 });
    return true;
  },

  answerQuestion: (optionId, typedAnswer, timeSpent) => {
    const { session } = get();
    if (!session) {
      return { questionId: '', selectedOptionId: null, isCorrect: false, timeSpent: 0, ratingChange: 0, xpEarned: 0 };
    }

    const currentQuestion = session.questions[session.currentIndex];
    let isCorrect = false;

    if (session.gameplayType === 'multiple_choice') {
      const selectedOption = currentQuestion.options.find((o) => o.id === optionId);
      isCorrect = selectedOption?.isCorrect ?? false;
    } else if (session.gameplayType === 'typing_translate' && typedAnswer) {
      const targetStr = currentQuestion.question.indonesianTranslation;
      const synonyms = currentQuestion.question.synonyms || [];
      
      const checkMatch = (input: string, target: string) => {
        const normInput = input.toLowerCase().trim();
        const normTarget = target.toLowerCase().trim();
        if (normInput === normTarget) return true;
        // Split by / or , to allow matching any part
        const parts = normTarget.split(/[\/,]/).map(p => p.trim()).filter(Boolean);
        if (parts.length > 1 && parts.includes(normInput)) return true;
        return false;
      };

      isCorrect = checkMatch(typedAnswer, targetStr) || synonyms.some(s => checkMatch(typedAnswer, s));
    } else if (session.gameplayType === 'typing_definition' && typedAnswer) {
      const targetStr = currentQuestion.question.englishWord.toLowerCase().trim();
      const inputStr = typedAnswer.toLowerCase().trim();
      isCorrect = inputStr === targetStr;
    }

    const answer: QuizAnswer = {
      questionId: currentQuestion.question.id,
      selectedOptionId: optionId,
      typedAnswer,
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
      typedAnswer,
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
      typedAnswer: null,
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
      typedAnswer: null,
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
      typedAnswer: null,
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
    set({ session: null, isAnswered: false, selectedOptionId: null, typedAnswer: null, timeRemaining: 10 });
  },

  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },
}));
