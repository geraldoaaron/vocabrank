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

export default function DashboardPage() {
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
        <StreakDisplay />
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
