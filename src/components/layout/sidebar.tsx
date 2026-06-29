'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Gamepad2,
  CalendarCheck,
  Trophy,
  History,
  Award,
  User,
  Settings,
  Zap,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useUserStore } from '@/stores/user-store';
import { getRankTier } from '@/data/rank-tiers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/gacha', label: 'Summon', icon: Sparkles },
  { href: '/gallery', label: 'Gallery', icon: BookOpen },
  { href: '/quiz', label: 'Play Quiz', icon: Gamepad2 },
  { href: '/daily-challenge', label: 'Daily Challenge', icon: CalendarCheck },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/history', label: 'History', icon: History },
  { href: '/achievements', label: 'Achievements', icon: Award },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);
  const rankTier = getRankTier(user.rating);

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen sticky top-0 border-r border-border bg-card/50 backdrop-blur-sm">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight gradient-text">VocabRank</h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5 font-medium">Learn & Compete</p>
          </div>
        </Link>
      </div>

      {/* User mini profile */}
      <div className="p-4 mx-3 mt-3 rounded-xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-indigo-500/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-indigo-500/30">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.username}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">{rankTier.icon}</span>
              <span className="text-[11px] text-muted-foreground font-medium">{rankTier.name}</span>
              <span className="text-[11px] text-muted-foreground">• {user.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <item.icon className={cn('h-[18px] w-[18px]', isActive && 'text-primary-foreground')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border flex items-center justify-between">
        <ThemeToggle />
        <span className="text-[10px] text-muted-foreground">v1.0.0</span>
      </div>
    </aside>
  );
}
