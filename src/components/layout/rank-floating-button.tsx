'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { getRankTier } from '@/data/rank-tiers';
import { X } from 'lucide-react';

export function RankFloatingButton() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);
  
  if (pathname === '/leaderboard') {
    return (
      <Link 
        href="/dashboard"
        className="fixed top-6 right-6 z-50 flex items-center justify-center bg-card shadow-xl shadow-black/10 border border-border rounded-full h-12 w-12 hover:bg-muted transition-colors active:scale-95 text-muted-foreground"
        title="Back to Dashboard"
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close Leaderboard</span>
      </Link>
    );
  }

  // Only show the floating rank button on the dashboard/home page
  if (pathname !== '/dashboard') {
    return null;
  }

  const rankTier = getRankTier(user.rating);

  return (
    <Link 
      href="/leaderboard"
      className="fixed top-6 right-6 z-50 flex items-center justify-center bg-background shadow-xl shadow-black/10 border border-border rounded-full h-12 w-12 hover:scale-110 transition-transform active:scale-95 text-2xl"
      title={`Current Rank: ${rankTier.name}`}
    >
      <span className="drop-shadow-md">{rankTier.icon}</span>
      <span className="sr-only">Rank / Leaderboard</span>
    </Link>
  );
}
