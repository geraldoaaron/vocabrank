export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type Category =
  | 'TOEFL'
  | 'IELTS'
  | 'SAT'
  | 'Business English'
  | 'Academic Words'
  | 'Daily Conversation'
  | 'Phrasal Verbs'
  | 'Idioms'
  | 'Slang';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'pronoun'
  | 'phrase';

export interface Question {
  id: string;
  englishWord: string;
  indonesianTranslation: string;
  difficulty: Difficulty;
  category: Category;
  exampleSentence: string;
  synonyms: string[];
  partOfSpeech: PartOfSpeech;
  explanation?: string;
  explanationIndo?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export type QuizMode = 'practice' | 'daily' | 'ranked';

export type GameplayType = 'multiple_choice' | 'typing_translate' | 'typing_definition';

export interface QuizQuestion {
  question: Question;
  options: QuizOption[];
}

export interface QuizSession {
  id: string;
  mode: QuizMode;
  gameplayType: GameplayType;
  difficulty: Difficulty | 'all';
  category: Category | 'all';
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  totalQuestions: number;
  startedAt: string;
  completedAt?: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string | null;
  typedAnswer?: string | null;
  isCorrect: boolean;
  timeSpent: number;
  ratingChange: number;
  xpEarned: number;
}

export interface QuizHistoryEntry {
  id: string;
  sessionId: string;
  vocabId?: string;
  englishWord: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeAnswered: string;
  difficulty: Difficulty;
  category: Category;
  gameplayType?: GameplayType;
  ratingChange: number;
  xpEarned: number;
  timeSpent?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  rating: number;
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  lastActiveDate: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  country: string;
  countryFlag: string;
  createdAt: string;
  achievements: string[];
  favoriteWords: string[];
  coins: number;
  unlockedVocab: string[];
  hasClaimedStarter: boolean;
  hasClaimedFree5x: boolean;
  hasClaimedMailboxReward: boolean;
  hasClaimedBonusReward: boolean;
  hasClaimedCompensation: boolean;
  vocabMastery?: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'correct_answers' | 'streak' | 'rating' | 'perfect_quiz' | 'total_questions' | 'level';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

export interface RankTier {
  name: string;
  minRating: number;
  maxRating: number;
  icon: string;
  color: string;
  gradient: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  level: number;
  xp: number;
  country: string;
  countryFlag: string;
  rank: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface DailyChallenge {
  date: string;
  completed: boolean;
  score: number;
  totalQuestions: number;
  bonusXP: number;
  bonusRating: number;
}

export interface ActivityEntry {
  id: string;
  type: 'quiz_complete' | 'achievement_unlock' | 'level_up' | 'rank_change' | 'streak';
  title: string;
  description: string;
  timestamp: string;
  xpEarned?: number;
  ratingChange?: number;
}
