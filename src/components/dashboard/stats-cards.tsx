'use client';

import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/user-store';
import { Target, Zap, CheckCircle, XCircle, HelpCircle, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StatsCards() {
  const user = useUserStore((s) => s.user);
  const accuracy = user.totalQuestions > 0
    ? Math.round((user.correctAnswers / user.totalQuestions) * 100)
    : 0;

  const stats = [
    {
      label: 'Rating',
      value: user.rating.toLocaleString(),
      icon: Target,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      iconColor: 'text-indigo-500',
    },
    {
      label: 'Total XP',
      value: user.xp.toLocaleString(),
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
    },
    {
      label: 'Accuracy',
      value: `${accuracy}%`,
      icon: BarChart3,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      label: 'Correct',
      value: user.correctAnswers.toLocaleString(),
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-500',
    },
    {
      label: 'Wrong',
      value: user.wrongAnswers.toLocaleString(),
      icon: XCircle,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-500/10',
      iconColor: 'text-red-500',
    },
    {
      label: 'Total Questions',
      value: user.totalQuestions.toLocaleString(),
      icon: HelpCircle,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={item}>
          <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-border/50 group cursor-default">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${stat.bgColor} transition-colors`}>
                <stat.icon className={`h-3.5 w-3.5 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="text-xl lg:text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{stat.label}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
