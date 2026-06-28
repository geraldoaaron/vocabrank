'use client';

import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/user-store';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, TrendingUp, Award, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function RecentActivity() {
  const activities = useUserStore((s) => s.activities);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz_complete': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'achievement_unlock': return <Award className="h-4 w-4 text-amber-500" />;
      case 'level_up': return <TrendingUp className="h-4 w-4 text-indigo-500" />;
      case 'rank_change': return <Zap className="h-4 w-4 text-purple-500" />;
      case 'streak': return <span className="text-sm">🔥</span>;
      default: return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
      <Card className="divide-y divide-border border-border/50">
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground text-sm">No activity yet. Start a quiz to get going! 🚀</p>
          </div>
        ) : (
          activities.slice(0, 5).map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-center gap-3 p-3.5 hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-muted/50">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
              </div>
              <div className="text-right shrink-0">
                {activity.xpEarned && activity.xpEarned > 0 && (
                  <p className="text-xs font-semibold text-amber-500">+{activity.xpEarned} XP</p>
                )}
                <p className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </Card>
    </motion.div>
  );
}
