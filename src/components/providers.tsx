'use client';

import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { RankFloatingButton } from '@/components/layout/rank-floating-button';
import { MailboxFloatingButton } from '@/components/layout/mailbox-floating-button';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClientOnly } from '@/components/client-only';
import { useQuizStore } from '@/stores/quiz-store';
import { cn } from '@/lib/utils';

// Supress the next-themes script tag warning overlay in development
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag while rendering React component')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  const isQuizPlaying = useQuizStore((s) => !!s.session && !s.session.completedAt);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <ClientOnly>
          <div className="flex w-full min-h-screen overflow-x-hidden">
            {!isQuizPlaying && <Sidebar />}
            <main className={cn("flex-1 w-full min-w-0", !isQuizPlaying && "lg:pb-0 pb-20")}>
              {children}
            </main>
          </div>
          {!isQuizPlaying && (
            <>
              <MobileNav />
              <RankFloatingButton />
              <MailboxFloatingButton />
            </>
          )}
        </ClientOnly>
        <Toaster richColors position="top-center" />
      </TooltipProvider>
    </ThemeProvider>
  );
}
