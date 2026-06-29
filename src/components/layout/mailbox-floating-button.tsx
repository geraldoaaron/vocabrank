'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Mail, Gift, CheckCircle2 } from 'lucide-react';
import { useUserStore } from '@/stores/user-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export function MailboxFloatingButton() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);
  const setClaimedMailboxReward = useUserStore((s) => s.setClaimedMailboxReward);
  const setClaimedBonusReward = useUserStore((s) => s.setClaimedBonusReward);
  const addCoins = useUserStore((s) => s.addCoins);
  const [isOpen, setIsOpen] = useState(false);

  // Only show the floating mailbox button on the dashboard/home page
  if (pathname !== '/dashboard') {
    return null;
  }

  const hasUnread = !user.hasClaimedMailboxReward || !user.hasClaimedBonusReward;

  const handleClaim = () => {
    addCoins(500);
    setClaimedMailboxReward();
    toast.success('Claimed 500 Coins for 5x Free Summon!');
  };

  const handleClaimBonus = () => {
    addCoins(5000);
    setClaimedBonusReward();
    toast.success('Claimed 5000 Bonus Coins!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        className="fixed top-[5.5rem] right-6 z-50 flex items-center justify-center bg-background shadow-xl shadow-black/10 border border-border rounded-full h-12 w-12 hover:scale-110 transition-transform active:scale-95 text-primary"
        title="Mailbox"
      >
        <Mail className="h-5 w-5" />
        {hasUnread && (
          <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-red-500 rounded-full border-2 border-background animate-pulse" />
        )}
        <span className="sr-only">Mailbox</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" /> Mailbox
          </DialogTitle>
          <DialogDescription>
            Messages and rewards from the system.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="list" className="mt-4 w-full">
          <TabsList className="w-full">
            <TabsTrigger value="list" className="flex-1">List</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">Claim History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4 space-y-4 outline-none">
            {(!user.hasClaimedMailboxReward || !user.hasClaimedBonusReward) ? (
              <>
                {!user.hasClaimedMailboxReward && (
                  <div className="p-4 rounded-xl border bg-primary/5 border-primary/30">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-primary/20 text-primary">
                          <Gift className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Welcome Gift! 🎉</h3>
                          <p className="text-xs text-muted-foreground mt-1">Here is a free 5x Summon to kickstart your vocabulary journey. Claim it now!</p>
                          
                          <div className="mt-3">
                            <Button onClick={handleClaim} size="sm" className="h-8 rounded-full px-4 text-xs font-semibold">
                              Claim 500 Coins
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!user.hasClaimedBonusReward && (
                  <div className="p-4 rounded-xl border bg-amber-500/5 border-amber-500/30">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-amber-500/20 text-amber-500">
                          <Gift className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Special Bonus! 🌟</h3>
                          <p className="text-xs text-muted-foreground mt-1">Thank you for playing VocabRank! Here is a special gift of 5000 Coins!</p>
                          
                          <div className="mt-3">
                            <Button onClick={handleClaimBonus} size="sm" className="h-8 rounded-full px-4 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white">
                              Claim 5000 Coins
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-sm font-medium text-muted-foreground">
                No gifts available to claim.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-4 space-y-4 outline-none">
            {(user.hasClaimedMailboxReward || user.hasClaimedBonusReward) ? (
              <>
                {user.hasClaimedBonusReward && (
                  <div className="p-4 rounded-xl border bg-muted/30 border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
                          <Gift className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Special Bonus! 🌟</h3>
                          <p className="text-xs text-muted-foreground mt-1">You received 5000 Coins as a special bonus.</p>
                          
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4" /> Claimed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {user.hasClaimedMailboxReward && (
                  <div className="p-4 rounded-xl border bg-muted/30 border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
                          <Gift className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Welcome Gift! 🎉</h3>
                          <p className="text-xs text-muted-foreground mt-1">You received 500 Coins for a free 5x Summon.</p>
                          
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4" /> Claimed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-sm font-medium text-muted-foreground">
                No claim history yet.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
