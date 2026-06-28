import type { Difficulty } from '@/types';

// XP rewards per difficulty
export const XP_REWARDS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 35,
  expert: 50,
};

// Elo K-factor per difficulty
export const ELO_K_FACTOR: Record<Difficulty, number> = {
  easy: 16,
  medium: 24,
  hard: 32,
  expert: 40,
};

// Rating penalty for wrong answers (fraction of K-factor)
export const WRONG_ANSWER_PENALTY = 0.6;

// Level thresholds (XP needed to reach each level)
export function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function getLevelFromXP(totalXP: number): number {
  let level = 1;
  let xpNeeded = 0;
  while (true) {
    xpNeeded += getXPForLevel(level);
    if (totalXP < xpNeeded) return level;
    level++;
    if (level > 100) return 100;
  }
}

export function getXPProgressInLevel(totalXP: number): { current: number; needed: number; percentage: number } {
  let level = 1;
  let xpAccumulated = 0;
  while (true) {
    const xpForThisLevel = getXPForLevel(level);
    if (totalXP < xpAccumulated + xpForThisLevel) {
      const current = totalXP - xpAccumulated;
      return {
        current,
        needed: xpForThisLevel,
        percentage: Math.round((current / xpForThisLevel) * 100),
      };
    }
    xpAccumulated += xpForThisLevel;
    level++;
    if (level > 100) {
      return { current: 0, needed: 1, percentage: 100 };
    }
  }
}

// Streak bonus multiplier
export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 2.0;
  if (streak >= 14) return 1.5;
  if (streak >= 7) return 1.3;
  if (streak >= 3) return 1.1;
  return 1.0;
}

// Speed bonus multiplier
export function getSpeedMultiplier(timeSpent: number): number {
  if (timeSpent <= 3) return 2.0;
  if (timeSpent <= 6) return 1.5;
  if (timeSpent <= 10) return 1.2;
  return 1.0;
}

// Daily challenge config
export const DAILY_CHALLENGE_QUESTIONS = 20;
export const DAILY_CHALLENGE_BONUS_XP = 100;
export const DAILY_CHALLENGE_BONUS_RATING = 25;

// Quiz config
export const QUIZ_TIMER_SECONDS = 20;
export const QUIZ_OPTIONS_COUNT = 4;
export const DEFAULT_QUIZ_QUESTIONS = 10;
export const QUIZ_AUTO_ADVANCE_MS = 1500;

// Default user
export const DEFAULT_USER = {
  id: 'user-1',
  username: 'Player',
  email: 'player@vocabrank.com',
  avatar: '',
  bio: 'Learning Indonesian vocabulary!',
  rating: 1000,
  xp: 0,
  level: 1,
  streak: 0,
  bestStreak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  country: 'Indonesia',
  countryFlag: '🇮🇩',
  createdAt: new Date().toISOString(),
  achievements: [] as string[],
  favoriteWords: [] as string[],
};

// Nav items
export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/quiz', label: 'Play Quiz', icon: 'Gamepad2' },
  { href: '/daily-challenge', label: 'Daily Challenge', icon: 'CalendarCheck' },
  { href: '/leaderboard', label: 'Leaderboard', icon: 'Trophy' },
  { href: '/history', label: 'History', icon: 'History' },
  { href: '/achievements', label: 'Achievements', icon: 'Award' },
  { href: '/profile', label: 'Profile', icon: 'User' },
  { href: '/settings', label: 'Settings', icon: 'Settings' },
] as const;
