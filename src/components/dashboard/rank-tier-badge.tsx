'use client';

import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/user-store';
import { getRankTier, getRankProgress } from '@/data/rank-tiers';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function RankTierBadge() {
  const user = useUserStore((s) => s.user);
  const tier = getRankTier(user.rating);
  const progress = getRankProgress(user.rating);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-5 relative overflow-hidden border-border/50">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-[0.06]`} />

        <div className="relative flex items-center gap-4">
          <div className="text-4xl animate-float">{tier.icon}</div>
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Rank</p>
            <p className="text-xl font-bold" style={{ color: tier.color }}>
              {tier.name}
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{user.rating} Rating</span>
                <span>{tier.maxRating < 9999 ? tier.maxRating : '∞'}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
