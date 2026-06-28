import type { Achievement } from '@/types';

export const ACHIEVEMENTS: Achievement[] = [
  // Correct answers milestones
  {
    id: 'first-correct',
    name: 'First Steps',
    description: 'Answer your first question correctly',
    icon: '🌱',
    requirement: 1,
    type: 'correct_answers',
    tier: 'bronze',
  },
  {
    id: 'correct-10',
    name: 'Getting Started',
    description: 'Answer 10 questions correctly',
    icon: '📚',
    requirement: 10,
    type: 'correct_answers',
    tier: 'bronze',
  },
  {
    id: 'correct-50',
    name: 'Dedicated Learner',
    description: 'Answer 50 questions correctly',
    icon: '🎯',
    requirement: 50,
    type: 'correct_answers',
    tier: 'silver',
  },
  {
    id: 'correct-100',
    name: 'Centurion',
    description: 'Answer 100 questions correctly',
    icon: '💯',
    requirement: 100,
    type: 'correct_answers',
    tier: 'silver',
  },
  {
    id: 'correct-250',
    name: 'Word Warrior',
    description: 'Answer 250 questions correctly',
    icon: '⚔️',
    requirement: 250,
    type: 'correct_answers',
    tier: 'gold',
  },
  {
    id: 'correct-500',
    name: 'Vocabulary Master',
    description: 'Answer 500 questions correctly',
    icon: '🏆',
    requirement: 500,
    type: 'correct_answers',
    tier: 'platinum',
  },
  {
    id: 'correct-1000',
    name: 'Legendary Scholar',
    description: 'Answer 1000 questions correctly',
    icon: '👑',
    requirement: 1000,
    type: 'correct_answers',
    tier: 'diamond',
  },

  // Streak achievements
  {
    id: 'streak-3',
    name: 'On Fire',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    requirement: 3,
    type: 'streak',
    tier: 'bronze',
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '📅',
    requirement: 7,
    type: 'streak',
    tier: 'silver',
  },
  {
    id: 'streak-14',
    name: 'Fortnight Fighter',
    description: 'Maintain a 14-day streak',
    icon: '⚡',
    requirement: 14,
    type: 'streak',
    tier: 'gold',
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '🌟',
    requirement: 30,
    type: 'streak',
    tier: 'platinum',
  },
  {
    id: 'streak-100',
    name: 'Unstoppable',
    description: 'Maintain a 100-day streak',
    icon: '💪',
    requirement: 100,
    type: 'streak',
    tier: 'diamond',
  },

  // Rating achievements
  {
    id: 'rating-1200',
    name: 'Silver Rank',
    description: 'Reach 1200 rating',
    icon: '🥈',
    requirement: 1200,
    type: 'rating',
    tier: 'silver',
  },
  {
    id: 'rating-1400',
    name: 'Gold Rank',
    description: 'Reach 1400 rating',
    icon: '🥇',
    requirement: 1400,
    type: 'rating',
    tier: 'gold',
  },
  {
    id: 'rating-1600',
    name: 'Platinum Rank',
    description: 'Reach 1600 rating',
    icon: '💎',
    requirement: 1600,
    type: 'rating',
    tier: 'platinum',
  },
  {
    id: 'rating-2000',
    name: 'Master Rank',
    description: 'Reach 2000 rating',
    icon: '👑',
    requirement: 2000,
    type: 'rating',
    tier: 'diamond',
  },

  // Perfect quiz
  {
    id: 'perfect-quiz',
    name: 'Perfectionist',
    description: 'Complete a quiz with 100% accuracy',
    icon: '✨',
    requirement: 1,
    type: 'perfect_quiz',
    tier: 'gold',
  },

  // Total questions
  {
    id: 'total-100',
    name: 'Curious Mind',
    description: 'Answer 100 total questions',
    icon: '🧠',
    requirement: 100,
    type: 'total_questions',
    tier: 'bronze',
  },
  {
    id: 'total-500',
    name: 'Knowledge Seeker',
    description: 'Answer 500 total questions',
    icon: '📖',
    requirement: 500,
    type: 'total_questions',
    tier: 'silver',
  },
  {
    id: 'total-1000',
    name: 'Grand Scholar',
    description: 'Answer 1000 total questions',
    icon: '🎓',
    requirement: 1000,
    type: 'total_questions',
    tier: 'gold',
  },

  // Level achievements
  {
    id: 'level-5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    requirement: 5,
    type: 'level',
    tier: 'bronze',
  },
  {
    id: 'level-10',
    name: 'Shining Star',
    description: 'Reach level 10',
    icon: '🌟',
    requirement: 10,
    type: 'level',
    tier: 'silver',
  },
  {
    id: 'level-25',
    name: 'Supernova',
    description: 'Reach level 25',
    icon: '💫',
    requirement: 25,
    type: 'level',
    tier: 'gold',
  },
  {
    id: 'level-50',
    name: 'Galaxy Brain',
    description: 'Reach level 50',
    icon: '🌌',
    requirement: 50,
    type: 'level',
    tier: 'diamond',
  },
];

export function checkAchievements(
  correctAnswers: number,
  streak: number,
  rating: number,
  totalQuestions: number,
  level: number,
  perfectQuizzes: number,
  currentAchievements: string[]
): string[] {
  const newAchievements: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (currentAchievements.includes(achievement.id)) continue;

    let earned = false;
    switch (achievement.type) {
      case 'correct_answers':
        earned = correctAnswers >= achievement.requirement;
        break;
      case 'streak':
        earned = streak >= achievement.requirement;
        break;
      case 'rating':
        earned = rating >= achievement.requirement;
        break;
      case 'perfect_quiz':
        earned = perfectQuizzes >= achievement.requirement;
        break;
      case 'total_questions':
        earned = totalQuestions >= achievement.requirement;
        break;
      case 'level':
        earned = level >= achievement.requirement;
        break;
    }

    if (earned) {
      newAchievements.push(achievement.id);
    }
  }

  return newAchievements;
}
