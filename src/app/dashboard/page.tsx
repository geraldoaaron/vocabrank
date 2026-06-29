'use client';

import { motion } from 'framer-motion';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ActionButtons } from '@/components/dashboard/action-buttons';
import { XPProgressBar } from '@/components/dashboard/xp-progress-bar';
import { RankTierBadge } from '@/components/dashboard/rank-tier-badge';
import { StreakDisplay } from '@/components/dashboard/streak-display';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { useUserStore } from '@/stores/user-store';
import { useEffect } from 'react';
import { Coins } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const updateStreak = useUserStore((s) => s.updateStreak);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to expand your vocabulary today?
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Badge className="text-sm px-3 py-1.5 gap-1.5 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/15">
            <Coins className="h-4 w-4" />
            <span className="font-bold">{user.coins || 0} Coins</span>
          </Badge>
          <StreakDisplay />
        </div>
      </motion.div>

      {/* Rank + XP Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RankTierBadge />
        <XPProgressBar />
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Action Buttons */}
      <ActionButtons />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
