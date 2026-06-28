'use client';

import { useUserStore } from '@/stores/user-store';
import { getStreakMultiplier } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

export function StreakDisplay() {
  const user = useUserStore((s) => s.user);
  const multiplier = getStreakMultiplier(user.streak);

  if (user.streak === 0) {
    return (
      <Badge variant="secondary" className="text-sm px-3 py-1.5 gap-1.5 rounded-xl">
        <span>🔥</span>
        <span className="text-muted-foreground">No streak — play today!</span>
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge className="text-sm px-3 py-1.5 gap-1.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:bg-orange-500/15">
        <span className="animate-fire-flicker inline-block text-lg">🔥</span>
        <span className="font-bold">{user.streak} day streak</span>
      </Badge>
      {multiplier > 1 && (
        <Badge variant="outline" className="text-xs px-2 py-1 rounded-lg border-amber-500/30 text-amber-600 dark:text-amber-400">
          {multiplier}x XP
        </Badge>
      )}
    </div>
  );
}
