'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, QuizHistoryEntry, ActivityEntry, DailyChallenge } from '@/types';
import { DEFAULT_USER, getLevelFromXP, getStreakMultiplier, getSpeedMultiplier, ELO_K_FACTOR, XP_REWARDS, WRONG_ANSWER_PENALTY } from '@/lib/constants';
import type { Difficulty } from '@/types';
import { checkAchievements } from '@/data/achievements';

interface UserState {
  user: User;
  quizHistory: QuizHistoryEntry[];
  activities: ActivityEntry[];
  dailyChallenges: Record<string, DailyChallenge>;
  perfectQuizzes: number;

  // Actions
  updateProfile: (updates: Partial<User>) => void;
  addCorrectAnswer: (difficulty: Difficulty, entry: QuizHistoryEntry, timeSpent: number) => { xpEarned: number; ratingChange: number; coinsEarned: number; newAchievements: string[] };
  addWrongAnswer: (difficulty: Difficulty, entry: QuizHistoryEntry) => { ratingChange: number; coinsEarned: number };
  updateStreak: () => void;
  addActivity: (activity: Omit<ActivityEntry, 'id' | 'timestamp'>) => void;
  completeDailyChallenge: (date: string, score: number, totalQuestions: number) => void;
  getDailyChallenge: (date: string) => DailyChallenge | undefined;
  addPerfectQuiz: () => string[];
  toggleFavoriteWord: (wordId: string) => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => boolean;
  unlockVocab: (wordIds: string[]) => void;
  setClaimedStarter: () => void;
  setClaimedFree5x: () => void;
  setClaimedMailboxReward: () => void;
  setClaimedBonusReward: () => void;
  setClaimedCompensation: () => void;
  resetData: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: { ...DEFAULT_USER },
      quizHistory: [],
      activities: [],
      dailyChallenges: {},
      perfectQuizzes: 0,

      updateProfile: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),

      addCorrectAnswer: (difficulty, entry, timeSpent) => {
        const state = get();
        const streakMultiplier = getStreakMultiplier(state.user.streak);
        const speedMultiplier = getSpeedMultiplier(timeSpent);
        const baseXP = XP_REWARDS[difficulty];
        const xpEarned = Math.round(baseXP * streakMultiplier * speedMultiplier);
        
        // Rarity multiplier logic applied to rating
        const kFactor = ELO_K_FACTOR[difficulty];
        let rarityMultiplier = 1;
        if (difficulty === 'medium') rarityMultiplier = 1.5;
        if (difficulty === 'hard') rarityMultiplier = 2.0;
        if (difficulty === 'expert') rarityMultiplier = 3.0;

        const ratingChange = Math.round((kFactor * 0.5 * rarityMultiplier) * speedMultiplier);
        
        // Coins reward
        const coinsEarned = 10;

        const newXP = state.user.xp + xpEarned;
        const newLevel = getLevelFromXP(newXP);
        const newRating = state.user.rating + ratingChange;
        const newCorrect = state.user.correctAnswers + 1;
        const newTotal = state.user.totalQuestions + 1;
        const newCoins = (state.user.coins || 0) + coinsEarned;

        const newAchievements = checkAchievements(
          newCorrect,
          state.user.streak,
          newRating,
          newTotal,
          newLevel,
          state.perfectQuizzes,
          state.user.achievements
        );

        const currentMastery = state.user.vocabMastery || {};
        const newMastery = { ...currentMastery };
        if (entry.vocabId) {
          const currentPoints = newMastery[entry.vocabId] || 0;
          newMastery[entry.vocabId] = Math.min(10000, currentPoints + 100);
        }

        set((s) => ({
          user: {
            ...s.user,
            xp: newXP,
            level: newLevel,
            rating: newRating,
            correctAnswers: newCorrect,
            totalQuestions: newTotal,
            coins: newCoins,
            achievements: [...s.user.achievements, ...newAchievements],
            vocabMastery: newMastery,
          },
          quizHistory: [
            { ...entry, ratingChange, xpEarned },
            ...s.quizHistory,
          ],
        }));

        if (newLevel > state.user.level) {
          get().addActivity({
            type: 'level_up',
            title: 'Level Up!',
            description: `You reached level ${newLevel}!`,
            xpEarned,
          });
        }

        return { xpEarned, ratingChange, coinsEarned, newAchievements };
      },

      addWrongAnswer: (difficulty, entry) => {
        const kFactor = ELO_K_FACTOR[difficulty];
        const ratingChange = -Math.round(kFactor * WRONG_ANSWER_PENALTY);

        const currentMastery = state.user.vocabMastery || {};
        const newMastery = { ...currentMastery };
        if (entry.vocabId) {
          const currentPoints = newMastery[entry.vocabId] || 0;
          newMastery[entry.vocabId] = Math.max(0, currentPoints - 25);
        }

        set((state) => ({
          user: {
            ...state.user,
            rating: Math.max(0, state.user.rating + ratingChange),
            wrongAnswers: state.user.wrongAnswers + 1,
            totalQuestions: state.user.totalQuestions + 1,
            vocabMastery: newMastery,
          },
          quizHistory: [
            { ...entry, ratingChange, xpEarned: 0 },
            ...state.quizHistory,
          ],
        }));

        return { ratingChange, coinsEarned: 0 };
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          const lastActive = state.user.lastActiveDate;
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

          let newStreak = state.user.streak;
          if (lastActive === today) {
            return state; // Already active today
          } else if (lastActive === yesterday) {
            newStreak = state.user.streak + 1;
          } else {
            newStreak = 1; // Reset streak
          }

          const newBestStreak = Math.max(state.user.bestStreak, newStreak);

          // Check streak achievements
          const newAchievements = checkAchievements(
            state.user.correctAnswers,
            newStreak,
            state.user.rating,
            state.user.totalQuestions,
            state.user.level,
            state.perfectQuizzes,
            state.user.achievements
          );

          return {
            user: {
              ...state.user,
              streak: newStreak,
              bestStreak: newBestStreak,
              lastActiveDate: today,
              achievements: [...state.user.achievements, ...newAchievements],
            },
          };
        });
      },

      addActivity: (activity) =>
        set((state) => ({
          activities: [
            {
              ...activity,
              id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              timestamp: new Date().toISOString(),
            },
            ...state.activities.slice(0, 49), // Keep last 50
          ],
        })),

      completeDailyChallenge: (date, score, totalQuestions) =>
        set((state) => ({
          dailyChallenges: {
            ...state.dailyChallenges,
            [date]: {
              date,
              completed: true,
              score,
              totalQuestions,
              bonusXP: 100,
              bonusRating: 25,
            },
          },
        })),

      getDailyChallenge: (date) => {
        return get().dailyChallenges[date];
      },

      addPerfectQuiz: () => {
        const state = get();
        const newPerfectCount = state.perfectQuizzes + 1;
        const newAchievements = checkAchievements(
          state.user.correctAnswers,
          state.user.streak,
          state.user.rating,
          state.user.totalQuestions,
          state.user.level,
          newPerfectCount,
          state.user.achievements
        );

        set((s) => ({
          perfectQuizzes: newPerfectCount,
          user: {
            ...s.user,
            achievements: [...s.user.achievements, ...newAchievements],
          },
        }));

        return newAchievements;
      },

      toggleFavoriteWord: (wordId) =>
        set((state) => {
          const favorites = state.user.favoriteWords;
          const newFavorites = favorites.includes(wordId)
            ? favorites.filter((id) => id !== wordId)
            : [...favorites, wordId];
          return {
            user: { ...state.user, favoriteWords: newFavorites },
          };
        }),

      addCoins: (amount) =>
        set((state) => ({
          user: { ...state.user, coins: (state.user.coins || 0) + amount },
        })),

      deductCoins: (amount) => {
        const state = get();
        const currentCoins = state.user.coins || 0;
        if (currentCoins >= amount) {
          set((s) => ({
            user: { ...s.user, coins: currentCoins - amount },
          }));
          return true;
        }
        return false;
      },

      unlockVocab: (wordIds) =>
        set((state) => {
          const currentUnlocked = state.user.unlockedVocab || [];
          const newUnlocked = new Set([...currentUnlocked, ...wordIds]);
          return {
            user: { ...state.user, unlockedVocab: Array.from(newUnlocked) },
          };
        }),

      setClaimedStarter: () =>
        set((state) => ({
          user: { ...state.user, hasClaimedStarter: true },
        })),

      setClaimedFree5x: () =>
        set((state) => ({
          user: { ...state.user, hasClaimedFree5x: true },
        })),

      setClaimedMailboxReward: () => 
        set((state) => ({
          user: { ...state.user, hasClaimedMailboxReward: true },
        })),

      setClaimedBonusReward: () => 
        set((state) => ({
          user: { ...state.user, hasClaimedBonusReward: true },
        })),

      setClaimedCompensation: () =>
        set((state) => ({
          user: { ...state.user, hasClaimedCompensation: true },
        })),

      resetData: () =>
        set({
          user: { ...DEFAULT_USER, createdAt: new Date().toISOString() },
          quizHistory: [],
          activities: [],
          dailyChallenges: {},
          perfectQuizzes: 0,
        }),
    }),
    {
      name: 'vocabrank-user',
    }
  )
);
