'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/stores/user-store';
import { History, Search, CheckCircle, XCircle, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Difficulty } from '@/types';

export default function HistoryPage() {
  const quizHistory = useUserStore((s) => s.quizHistory);
  const [search, setSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [filterResult, setFilterResult] = useState<'all' | 'correct' | 'wrong'>('all');
  const [page, setPage] = useState(1);
  const perPage = 20;

  const filtered = useMemo(() => {
    return quizHistory.filter((entry) => {
      const matchSearch = search === '' || entry.englishWord.toLowerCase().includes(search.toLowerCase());
      const matchDifficulty = filterDifficulty === 'all' || entry.difficulty === filterDifficulty;
      const matchResult = filterResult === 'all' ||
        (filterResult === 'correct' && entry.isCorrect) ||
        (filterResult === 'wrong' && !entry.isCorrect);
      return matchSearch && matchDifficulty && matchResult;
    });
  }, [quizHistory, search, filterDifficulty, filterResult]);

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = paginated.length < filtered.length;

  const difficultyColors: Record<string, string> = {
    easy: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    hard: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    expert: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <History className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Quiz History</h1>
        </div>
        <p className="text-muted-foreground">{quizHistory.length} total answers</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search words..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Filters:
          </div>
          {(['all', 'easy', 'medium', 'hard', 'expert'] as const).map((d) => (
            <Button
              key={d}
              variant={filterDifficulty === d ? 'default' : 'outline'}
              size="sm"
              className="rounded-lg text-xs h-7"
              onClick={() => { setFilterDifficulty(d); setPage(1); }}
            >
              {d === 'all' ? 'All Levels' : d}
            </Button>
          ))}
          <div className="w-px bg-border mx-1" />
          {(['all', 'correct', 'wrong'] as const).map((r) => (
            <Button
              key={r}
              variant={filterResult === r ? 'default' : 'outline'}
              size="sm"
              className="rounded-lg text-xs h-7"
              onClick={() => { setFilterResult(r); setPage(1); }}
            >
              {r === 'all' ? 'All Results' : r === 'correct' ? '✓ Correct' : '✗ Wrong'}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card className="p-8 text-center border-border/50">
          <p className="text-muted-foreground">No history found. Start a quiz! 🚀</p>
        </Card>
      ) : (
        <Card className="divide-y divide-border border-border/50">
          {paginated.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.02 * Math.min(idx, 20) }}
              className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
            >
              {entry.isCorrect ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{entry.englishWord}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {!entry.isCorrect && (
                    <span className="text-red-500 line-through">{entry.userAnswer}</span>
                  )}
                  <span className={cn(!entry.isCorrect && 'ml-1', 'text-emerald-600 dark:text-emerald-400')}>
                    {entry.correctAnswer}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 space-y-0.5">
                <Badge variant="outline" className={cn('text-[10px] rounded-lg', difficultyColors[entry.difficulty])}>
                  {entry.difficulty}
                </Badge>
                <p className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(entry.timeAnswered), { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          ))}
        </Card>
      )}

      {hasMore && (
        <div className="text-center">
          <Button variant="outline" className="rounded-xl" onClick={() => setPage(p => p + 1)}>
            Load more ({filtered.length - paginated.length} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
