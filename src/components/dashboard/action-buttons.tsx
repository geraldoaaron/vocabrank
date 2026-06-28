'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Gamepad2,
  CalendarCheck,
  Trophy,
  History,
  User,
} from 'lucide-react';

const actions = [
  {
    href: '/quiz',
    label: 'Play Quiz',
    description: 'Test your vocabulary',
    icon: Gamepad2,
    gradient: 'from-indigo-500 to-purple-600',
    shadow: 'shadow-indigo-500/25',
  },
  {
    href: '/daily-challenge',
    label: 'Daily Challenge',
    description: '20 questions, bonus XP',
    icon: CalendarCheck,
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/25',
  },
  {
    href: '/leaderboard',
    label: 'Leaderboard',
    description: 'See global rankings',
    icon: Trophy,
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/25',
  },
  {
    href: '/history',
    label: 'History',
    description: 'Review past quizzes',
    icon: History,
    gradient: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-blue-500/25',
  },
  {
    href: '/profile',
    label: 'Profile',
    description: 'View your stats',
    icon: User,
    gradient: 'from-pink-500 to-rose-600',
    shadow: 'shadow-pink-500/25',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function ActionButtons() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action) => (
          <motion.div key={action.href} variants={item}>
            <Link
              href={action.href}
              className={`group block p-4 rounded-2xl bg-gradient-to-br ${action.gradient} text-white shadow-lg ${action.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]`}
            >
              <action.icon className="h-7 w-7 mb-3 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-110" />
              <p className="font-semibold text-sm">{action.label}</p>
              <p className="text-[11px] text-white/70 mt-0.5">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
