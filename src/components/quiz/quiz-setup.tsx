'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Zap, BookOpen, GraduationCap, Brain, ArrowRight } from 'lucide-react';
import type { Difficulty, Category } from '@/types';

const difficulties: { value: Difficulty | 'all'; label: string; color: string; icon: string }[] = [
  { value: 'all', label: 'All Levels', color: 'bg-gradient-to-r from-indigo-500 to-purple-500', icon: '🎯' },
  { value: 'easy', label: 'Easy', color: 'bg-emerald-500', icon: '🟢' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-500', icon: '🟡' },
  { value: 'hard', label: 'Hard', color: 'bg-orange-500', icon: '🟠' },
  { value: 'expert', label: 'Expert', color: 'bg-red-500', icon: '🔴' },
];

const categories: { value: Category | 'all'; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All Categories', icon: <BookOpen className="h-4 w-4" /> },
  { value: 'Daily Conversation', label: 'Daily Conversation', icon: '💬' },
  { value: 'TOEFL', label: 'TOEFL', icon: <GraduationCap className="h-4 w-4" /> },
  { value: 'IELTS', label: 'IELTS', icon: '📝' },
  { value: 'SAT', label: 'SAT', icon: <Brain className="h-4 w-4" /> },
  { value: 'Business English', label: 'Business English', icon: '💼' },
  { value: 'Academic Words', label: 'Academic Words', icon: '📖' },
  { value: 'Phrasal Verbs', label: 'Phrasal Verbs', icon: '🔗' },
  { value: 'Idioms', label: 'Idioms', icon: '💡' },
  { value: 'Slang', label: 'Slang', icon: '🤙' },
];

const questionCounts = [10, 15, 20, 30];

interface QuizSetupProps {
  onStart: (difficulty: Difficulty | 'all', category: Category | 'all', count: number) => void;
}

export function QuizSetup({ onStart }: QuizSetupProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [count, setCount] = useState(10);

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary">Quiz Mode</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Choose Your Challenge</h1>
        <p className="text-muted-foreground mt-2">Select difficulty, category, and number of questions</p>
      </motion.div>

      {/* Difficulty */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" /> Difficulty
        </h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <Button
              key={d.value}
              variant={difficulty === d.value ? 'default' : 'outline'}
              size="sm"
              className={`rounded-xl gap-1.5 ${difficulty === d.value ? 'shadow-md' : ''}`}
              onClick={() => setDifficulty(d.value)}
            >
              <span>{d.icon}</span>
              {d.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Category */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" /> Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((c) => (
            <Button
              key={c.value}
              variant={category === c.value ? 'default' : 'outline'}
              size="sm"
              className={`rounded-xl gap-1.5 justify-start text-left ${category === c.value ? 'shadow-md' : ''}`}
              onClick={() => setCategory(c.value)}
            >
              <span className="shrink-0">{typeof c.icon === 'string' ? c.icon : c.icon}</span>
              <span className="truncate text-xs">{c.label}</span>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Question count */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-sm font-semibold mb-3">Questions</h3>
        <div className="flex gap-2">
          {questionCounts.map((c) => (
            <Button
              key={c}
              variant={count === c ? 'default' : 'outline'}
              size="sm"
              className={`rounded-xl min-w-[60px] ${count === c ? 'shadow-md' : ''}`}
              onClick={() => setCount(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Summary & Start */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="p-5 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 border-primary/10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="rounded-lg">{difficulty === 'all' ? 'All Levels' : difficulty}</Badge>
              <Badge variant="secondary" className="rounded-lg">{category === 'all' ? 'All Categories' : category}</Badge>
              <Badge variant="secondary" className="rounded-lg">{count} questions</Badge>
            </div>
            <Button
              size="lg"
              className="rounded-xl gap-2 gradient-primary text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              onClick={() => onStart(difficulty, category, count)}
            >
              Start Quiz
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
