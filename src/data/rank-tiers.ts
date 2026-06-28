import type { RankTier } from '@/types';

export const RANK_TIERS: RankTier[] = [
  {
    name: 'Bronze',
    minRating: 0,
    maxRating: 1199,
    icon: '🥉',
    color: '#CD7F32',
    gradient: 'from-amber-700 to-amber-500',
  },
  {
    name: 'Silver',
    minRating: 1200,
    maxRating: 1399,
    icon: '🥈',
    color: '#C0C0C0',
    gradient: 'from-gray-400 to-gray-300',
  },
  {
    name: 'Gold',
    minRating: 1400,
    maxRating: 1599,
    icon: '🥇',
    color: '#FFD700',
    gradient: 'from-yellow-500 to-yellow-400',
  },
  {
    name: 'Platinum',
    minRating: 1600,
    maxRating: 1799,
    icon: '💎',
    color: '#00CED1',
    gradient: 'from-cyan-500 to-teal-400',
  },
  {
    name: 'Diamond',
    minRating: 1800,
    maxRating: 1999,
    icon: '💠',
    color: '#B9F2FF',
    gradient: 'from-blue-400 to-purple-400',
  },
  {
    name: 'Master',
    minRating: 2000,
    maxRating: 9999,
    icon: '👑',
    color: '#FF4500',
    gradient: 'from-purple-600 to-pink-500',
  },
];

export function getRankTier(rating: number): RankTier {
  for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
    if (rating >= RANK_TIERS[i].minRating) {
      return RANK_TIERS[i];
    }
  }
  return RANK_TIERS[0];
}

export function getRankProgress(rating: number): number {
  const tier = getRankTier(rating);
  const range = tier.maxRating - tier.minRating;
  if (range <= 0) return 100;
  return Math.min(100, Math.round(((rating - tier.minRating) / range) * 100));
}
