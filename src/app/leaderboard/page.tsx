'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { MOCK_LEADERBOARD } from '@/data/mock-leaderboard';
import { useUserStore } from '@/stores/user-store';
import { getRankTier } from '@/data/rank-tiers';
import { cn } from '@/lib/utils';
import type { LeaderboardEntry } from '@/types';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('global');
  const user = useUserStore((s) => s.user);

  const userEntry: LeaderboardEntry = {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    rating: user.rating,
    level: user.level,
    xp: user.xp,
    country: user.country,
    countryFlag: user.countryFlag,
    rank: 0,
    totalQuestions: user.totalQuestions,
    correctAnswers: user.correctAnswers,
  };

  const leaderboard = useMemo(() => {
    const allEntries = [...MOCK_LEADERBOARD, userEntry];
    allEntries.sort((a, b) => b.rating - a.rating);
    return allEntries.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  }, [user.rating, user.level, user.xp, userEntry]);

  const podiumIcons = [
    <Medal key="1" className="h-6 w-6 text-amber-500" />,
    <Medal key="2" className="h-6 w-6 text-gray-400" />,
    <Medal key="3" className="h-6 w-6 text-amber-700" />,
  ];

  const renderLeaderboard = (entries: LeaderboardEntry[]) => (
    <>
      {/* Podium - Top 3 */}
      {entries.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[entries[1], entries[0], entries[2]].map((entry, idx) => {
            const actualRank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
            const isUser = entry.id === user.id;
            const tier = getRankTier(entry.rating);

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className={cn(
                  'p-4 text-center relative overflow-hidden',
                  idx === 1 && 'border-amber-500/30 -mt-4',
                  isUser && 'border-primary/30 bg-primary/5'
                )}>
                  {idx === 1 && <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />}
                  <div className="relative">
                    <div className="mb-2">{podiumIcons[actualRank - 1]}</div>
                    <Avatar className="h-12 w-12 mx-auto mb-2 border-2" style={{ borderColor: tier.color }}>
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold">
                        {entry.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold truncate">{entry.username}</p>
                    <p className="text-lg font-bold" style={{ color: tier.color }}>{entry.rating}</p>
                    <p className="text-[10px] text-muted-foreground">{entry.countryFlag} Lv.{entry.level}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Table - Rest */}
      <Card className="border-border/50 divide-y divide-border">
        {entries.slice(3).map((entry, idx) => {
          const isUser = entry.id === user.id;
          const tier = getRankTier(entry.rating);

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.02 * idx }}
              className={cn(
                'flex items-center gap-3 p-3 transition-colors hover:bg-muted/50',
                isUser && 'bg-primary/5 border-l-2 border-l-primary'
              )}
            >
              <span className="text-sm font-bold text-muted-foreground w-8 text-center">
                #{entry.rank}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[10px] font-bold">
                  {entry.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium truncate', isUser && 'text-primary font-semibold')}>
                  {entry.username} {isUser && '(You)'}
                </p>
                <p className="text-[10px] text-muted-foreground">{entry.countryFlag} Level {entry.level}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: tier.color }}>{entry.rating}</p>
                <p className="text-[10px] text-muted-foreground">{tier.icon} {tier.name}</p>
              </div>
            </motion.div>
          );
        })}
      </Card>
    </>
  );

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Leaderboard</h1>
        </div>
        <p className="text-muted-foreground">Compete with players worldwide</p>
      </motion.div>

      {/* User rank highlight */}
      {(() => {
        const userRank = leaderboard.find(e => e.id === user.id);
        return userRank ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/10">
              <div className="flex items-center gap-3">
                <Badge className="gradient-primary text-white text-lg font-bold px-3 py-1 rounded-xl">
                  #{userRank.rank}
                </Badge>
                <div>
                  <p className="text-sm font-semibold">Your Global Rank</p>
                  <p className="text-xs text-muted-foreground">Rating: {user.rating} • Level: {user.level}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : null;
      })()}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="rounded-xl">
          <TabsTrigger value="global" className="rounded-lg gap-1.5">
            <Award className="h-3.5 w-3.5" /> Global
          </TabsTrigger>
          <TabsTrigger value="weekly" className="rounded-lg">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="rounded-lg">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-4">
          {renderLeaderboard(leaderboard)}
        </TabsContent>
        <TabsContent value="weekly" className="mt-4">
          {renderLeaderboard(leaderboard.slice(0, 15))}
        </TabsContent>
        <TabsContent value="monthly" className="mt-4">
          {renderLeaderboard(leaderboard.slice(0, 20))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
