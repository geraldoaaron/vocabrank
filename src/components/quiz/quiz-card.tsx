'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/types';
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  isAnswered: boolean;
  selectedOptionId: string | null;
  onAnswer: (optionId: string) => void;
}

export function QuizCard({ question, isAnswered, selectedOptionId, onAnswer }: QuizCardProps) {
  const difficultyColors: Record<string, string> = {
    easy: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    hard: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    expert: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  return (
    <motion.div
      key={question.question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Question Card */}
      <Card className="p-6 lg:p-8 mb-4 text-center border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 via-transparent to-purple-500/3" />
        <div className="relative">
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="outline" className={cn('rounded-lg text-xs', difficultyColors[question.question.difficulty])}>
              {question.question.difficulty}
            </Badge>
            <Badge variant="outline" className="rounded-lg text-xs">
              {question.question.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            What is the Indonesian meaning of:
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text">
              {question.question.englishWord}
            </h2>
            <button
              onClick={() => {
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(question.question.englishWord);
                  utterance.lang = 'en-US';
                  window.speechSynthesis.speak(utterance);
                }
              }}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
              title="Listen to pronunciation"
              aria-label="Play pronunciation"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground italic">
            {question.question.partOfSpeech} — &ldquo;{question.question.exampleSentence}&rdquo;
          </p>
        </div>
      </Card>

      {/* Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.isCorrect;
          const showCorrect = isAnswered && isCorrectOption;
          const showWrong = isAnswered && isSelected && !isCorrectOption;

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              onClick={() => !isAnswered && onAnswer(option.id)}
              disabled={isAnswered}
              className={cn(
                'p-4 rounded-2xl border-2 text-left font-medium transition-all duration-200 flex items-center gap-3 group',
                !isAnswered && 'hover:border-primary/50 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer',
                isAnswered && !showCorrect && !showWrong && 'opacity-50',
                showCorrect && 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20',
                showWrong && 'border-red-500 bg-red-500/10 animate-shake',
                !isAnswered && 'border-border bg-card'
              )}
            >
              <span className={cn(
                'flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold shrink-0 transition-colors',
                showCorrect ? 'bg-emerald-500 text-white' : showWrong ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
              )}>
                {showCorrect ? <CheckCircle2 className="h-4 w-4" /> : showWrong ? <XCircle className="h-4 w-4" /> : String.fromCharCode(65 + idx)}
              </span>
              <span className={cn(
                'text-sm lg:text-base',
                showCorrect && 'text-emerald-700 dark:text-emerald-400 font-semibold',
                showWrong && 'text-red-700 dark:text-red-400'
              )}>
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
