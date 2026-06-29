'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Gamepad2,
  User,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';

const mobileNavItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/quiz', label: 'Quiz', icon: Gamepad2 },
  { href: '/gacha', label: 'Summon', icon: Sparkles },
  { href: '/gallery', label: 'Gallery', icon: BookOpen },
  { href: '/achievements', label: 'Badges', icon: Award },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-between md:justify-around px-2 py-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 min-w-[56px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'p-1.5 rounded-xl transition-all duration-200',
                isActive && 'bg-primary/10'
              )}>
                <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
              </div>
              <span className={cn(
                'text-[10px] font-medium',
                isActive && 'text-primary font-semibold'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
