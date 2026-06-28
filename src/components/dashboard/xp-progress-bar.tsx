'use client';

import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/user-store';
import { getXPProgressInLevel } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

export function XPProgressBar() {
  const user = useUserStore((s) => s.user);
  const xpProgress = getXPProgressInLevel(user.xp);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-5 relative overflow-hidden border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />

        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10">
                <Star className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Level</p>
                <p className="text-xl font-bold text-amber-500">{user.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {xpProgress.current.toLocaleString()} / {xpProgress.needed.toLocaleString()} XP
              </p>
            </div>
          </div>

          {/* Custom animated progress bar */}
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress.percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
