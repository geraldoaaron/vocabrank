'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/stores/user-store';
import { VOCABULARY } from '@/data/vocabulary';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Coins, Gift, ChevronRight, X } from 'lucide-react';
import { toast } from 'sonner';
import { useSound } from '@/hooks/use-sound';
import { useConfetti } from '@/hooks/use-confetti';
import type { Question } from '@/types';

// Rarity mapping
const RARITY_MAP = {
  easy: { label: 'Common', color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/30' },
  medium: { label: 'Rare', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  hard: { label: 'Epic', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  expert: { label: 'Legendary', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' },
};

type PullResult = {
  vocab: Question;
  isDuplicate: boolean;
};

export default function GachaPage() {
  const user = useUserStore((s) => s.user);
  const { deductCoins, unlockVocab, addCoins, setClaimedStarter } = useUserStore();
  const { playSound } = useSound();
  const { fireConfetti } = useConfetti();
  
  const [pullResults, setPullResults] = useState<PullResult[] | null>(null);
  const [isPulling, setIsPulling] = useState(false);
  const isPullingRef = useRef(false);

  const performPull = (count: number, guaranteedRare: boolean = false): PullResult[] => {
    const results: PullResult[] = [];
    const unlockedSet = new Set(user.unlockedVocab || []);
    
    // Create pools
    const easyPool = VOCABULARY.filter(v => v.difficulty === 'easy');
    const mediumPool = VOCABULARY.filter(v => v.difficulty === 'medium');
    const hardPool = VOCABULARY.filter(v => v.difficulty === 'hard');
    const expertPool = VOCABULARY.filter(v => v.difficulty === 'expert');

    for (let i = 0; i < count; i++) {
      let roll = Math.random() * 100;
      let pool = easyPool;

      // Guaranteed rare for the last pull if specified
      if (guaranteedRare && i === count - 1) {
        roll = Math.random() * 40; // 0-40 ensures medium or better (30 medium + 8 hard + 2 expert = 40)
      }

      if (roll <= 2) {
        pool = expertPool; // 2%
      } else if (roll <= 10) {
        pool = hardPool; // 8%
      } else if (roll <= 40) {
        pool = mediumPool; // 30%
      } else {
        pool = easyPool; // 60%
      }

      // Fallback if a pool is empty (shouldn't happen with our data)
      if (pool.length === 0) pool = easyPool;

      const randomVocab = pool[Math.floor(Math.random() * pool.length)];
      const isDuplicate = unlockedSet.has(randomVocab.id);
      
      results.push({ vocab: randomVocab, isDuplicate });
      unlockedSet.add(randomVocab.id); // Add to set so we don't count duplicate in the same pull
    }

    return results;
  };

  const handlePull = (count: number, cost: number, guaranteedRare: boolean = false) => {
    if (isPullingRef.current) return;
    
    const currentCoins = user.coins || 0;
    if (currentCoins < cost) {
      toast.error('Not enough coins!');
      playSound('incorrect');
      return;
    }

    isPullingRef.current = true;
    setIsPulling(true);
    playSound('achievement');

    setTimeout(() => {
      deductCoins(cost);
      const results = performPull(count, guaranteedRare);
      
      let coinsRefunded = 0;
      const newVocabs: string[] = [];
      
      results.forEach(res => {
        if (res.isDuplicate) {
          coinsRefunded += 50;
        } else {
          newVocabs.push(res.vocab.id);
        }
      });

      if (newVocabs.length > 0) unlockVocab(newVocabs);
      if (coinsRefunded > 0) addCoins(coinsRefunded);

      setPullResults(results);
      setIsPulling(false);
      isPullingRef.current = false;

      if (results.some(r => r.vocab.difficulty === 'expert' || r.vocab.difficulty === 'hard')) {
        fireConfetti();
      }
    }, 1500);
  };

  const handleStarterPull = () => {
    if (isPullingRef.current) return;
    isPullingRef.current = true;
    setIsPulling(true);
    playSound('achievement');

    setTimeout(() => {
      setClaimedStarter();
      // Starter gives 10 free pulls with 1 guaranteed Epic+
      const results = performPull(9, false); // 9 normal
      // 1 guaranteed Epic+
      const epicPlusPool = VOCABULARY.filter(v => v.difficulty === 'hard' || v.difficulty === 'expert');
      const guaranteed = epicPlusPool[Math.floor(Math.random() * epicPlusPool.length)];
      results.push({ vocab: guaranteed, isDuplicate: false });

      const newVocabs = results.map(r => r.vocab.id);
      unlockVocab(newVocabs);

      setPullResults(results);
      setIsPulling(false);
      isPullingRef.current = false;
      fireConfetti();
    }, 1500);
  };

  const handleStarter5xPull = () => {
    if (isPullingRef.current) return;
    isPullingRef.current = true;
    setIsPulling(true);
    playSound('achievement');

    setTimeout(() => {
      useUserStore.getState().setClaimedFree5x();
      // Starter gives 5 free pulls with 1 guaranteed Rare+
      const results = performPull(5, true); 

      const newVocabs = results.map(r => r.vocab.id);
      unlockVocab(newVocabs);

      setPullResults(results);
      setIsPulling(false);
      fireConfetti();
    }, 1500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight inline-flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> Summon Vocabulary
          </h1>
          <p className="text-muted-foreground mt-1">Unlock new words to appear in your quizzes!</p>
        </div>
        <Card className="px-4 py-2 flex items-center gap-3 bg-primary/5 border-primary/20">
          <Coins className="h-5 w-5 text-yellow-500" />
          <span className="text-xl font-bold text-yellow-600 dark:text-yellow-500">{user.coins || 0} Coins</span>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {!pullResults && !isPulling && (
          <motion.div
            key="banners"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Starter Banner */}
            {!user.hasClaimedStarter && (
              <Card className="p-6 md:col-span-2 relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="z-10">
                  <Badge variant="outline" className="mb-2 bg-orange-500/20 text-orange-600 border-orange-500/30">Limited Time</Badge>
                  <h2 className="text-2xl font-bold mb-2">Free Starter 10x Summon!</h2>
                  <p className="text-muted-foreground">Start your journey with 10 free vocabularies, including 1 guaranteed Epic+ word!</p>
                </div>
                <Button size="lg" className="z-10 bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20" onClick={handleStarterPull}>
                  <Gift className="mr-2 h-5 w-5" /> Claim Free Summon
                </Button>
                <div className="absolute right-0 top-0 text-[10rem] opacity-5 -translate-y-1/4 translate-x-1/4">🎁</div>
              </Card>
            )}

            {/* Starter 5x Banner */}
            {!user.hasClaimedFree5x && (
              <Card className="p-6 md:col-span-2 relative overflow-hidden bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="z-10">
                  <Badge variant="outline" className="mb-2 bg-indigo-500/20 text-indigo-600 border-indigo-500/30">Limited Time</Badge>
                  <h2 className="text-2xl font-bold mb-2">Free Starter 5x Summon!</h2>
                  <p className="text-muted-foreground">Start your journey with 5 free vocabularies, including 1 guaranteed Rare+ word!</p>
                </div>
                <Button size="lg" className="z-10 bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" onClick={handleStarter5xPull}>
                  <Gift className="mr-2 h-5 w-5" /> Claim 5x Summon
                </Button>
                <div className="absolute right-0 top-0 text-[10rem] opacity-5 -translate-y-1/4 translate-x-1/4">🎁</div>
              </Card>
            )}

            {/* Standard Banners */}
            <Card className="p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Standard 1x Summon</h3>
                  <p className="text-sm text-muted-foreground mt-2">Get 1 random vocabulary word.</p>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Common: 60%</span>
                    <span>Rare: 30%</span>
                    <span>Epic: 8%</span>
                    <span>Legendary: 2%</span>
                  </div>
                  <Button className="w-full h-12" variant="outline" onClick={() => handlePull(1, 100)}>
                    <Coins className="mr-2 h-4 w-4 text-yellow-500" /> 100 Coins
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 relative overflow-hidden group border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4"><Badge className="bg-primary/20 text-primary border-primary/30">Guaranteed Rare+</Badge></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Standard 5x Summon</h3>
                  <p className="text-sm text-muted-foreground mt-2">Get 5 random vocabulary words with 1 guaranteed Rare or higher.</p>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Duplicates refund 50 coins</span>
                  </div>
                  <Button className="w-full h-12 bg-primary/10 hover:bg-primary/20 text-primary" onClick={() => handlePull(5, 500, true)}>
                    <Coins className="mr-2 h-4 w-4 text-yellow-500" /> 500 Coins
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {isPulling && (
          <motion.div
            key="pulling"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-[400px] flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <Sparkles className="h-24 w-24 text-primary animate-bounce relative z-10" />
            </div>
            <h2 className="text-2xl font-bold animate-pulse">Summoning...</h2>
          </motion.div>
        )}

        {pullResults && !isPulling && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Summon Results</h2>
              <Button variant="ghost" onClick={() => setPullResults(null)}>
                <X className="mr-2 h-4 w-4" /> Close
              </Button>
            </div>
            
            <div className={`grid gap-4 ${pullResults.length === 1 ? 'max-w-sm mx-auto' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
              {pullResults.map((result, idx) => {
                const rarityInfo = RARITY_MAP[result.vocab.difficulty];
                return (
                  <motion.div
                    key={`${result.vocab.id}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, type: 'spring' }}
                  >
                    <Card className={`h-full p-4 relative overflow-hidden flex flex-col items-center justify-center text-center gap-2 border-2 ${rarityInfo.border} ${rarityInfo.bg}`}>
                      <Badge variant="outline" className={`absolute top-2 left-2 text-[10px] uppercase tracking-wider ${rarityInfo.color} ${rarityInfo.border}`}>
                        {rarityInfo.label}
                      </Badge>
                      
                      {result.isDuplicate && (
                        <Badge variant="secondary" className="absolute top-2 right-2 text-[10px] bg-background/80 backdrop-blur-sm z-10">
                          Duplicate
                        </Badge>
                      )}

                      <div className={`mt-6 mb-2 ${result.isDuplicate ? 'opacity-50 grayscale' : ''}`}>
                        <h3 className={`font-bold text-lg leading-tight ${rarityInfo.color}`}>
                          {result.vocab.englishWord}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{result.vocab.indonesianTranslation}</p>
                      </div>

                      {result.isDuplicate && (
                        <div className="mt-auto pt-2 w-full flex items-center justify-center text-xs font-bold text-yellow-600 bg-yellow-500/10 rounded-md py-1">
                          +50 Coins
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center pt-8">
              <Button size="lg" onClick={() => setPullResults(null)}>
                Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
