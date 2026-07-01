'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/stores/user-store';
import { VOCABULARY } from '@/data/vocabulary';
import { getVocabMasteryLevel, MASTERY_TIERS } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { BookOpen, Lock, Unlock, Search, Info, Volume2 } from 'lucide-react';
import type { Category, Question } from '@/types';

// Rarity mapping
const RARITY_MAP = {
  easy: { label: 'Common', color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/30' },
  medium: { label: 'Rare', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  hard: { label: 'Epic', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  expert: { label: 'Legendary', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' },
};

export default function GalleryPage() {
  const user = useUserStore((s) => s.user);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnlockedFirst, setShowUnlockedFirst] = useState(true);
  const [selectedVocab, setSelectedVocab] = useState<Question | null>(null);
  const [showMasteryRules, setShowMasteryRules] = useState(false);

  const playPronunciation = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') || v.name.includes('English'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Group by category
  const categories = Array.from(new Set(VOCABULARY.map(v => v.category)));
  
  // Filter and sort vocabulary
  const filteredVocab = VOCABULARY.filter(v => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesSearch = v.englishWord.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.indonesianTranslation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const unlockedVocab = user.unlockedVocab || [];
    const aUnlocked = unlockedVocab.includes(a.id);
    const bUnlocked = unlockedVocab.includes(b.id);
    
    // 1. Unlocked first (if enabled)
    if (showUnlockedFirst) {
      if (aUnlocked && !bUnlocked) return -1;
      if (!aUnlocked && bUnlocked) return 1;
    }
    
    // 2. Rarity order (Legendary -> Epic -> Rare -> Common)
    const difficultyOrder = { expert: 4, hard: 3, medium: 2, easy: 1 };
    const aRarity = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0;
    const bRarity = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0;
    
    if (aRarity !== bRarity) {
      return bRarity - aRarity;
    }

    // 3. Alphabetical order
    return a.englishWord.localeCompare(b.englishWord);
  });

  const unlockedVocab = user.unlockedVocab || [];
  const vocabMastery = user.vocabMastery || {};
  const unlockedCount = unlockedVocab.length;
  const totalCount = VOCABULARY.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight inline-flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" /> Vocabulary Gallery
          </h1>
          <p className="text-muted-foreground mt-1">View your unlocked vocabulary collection.</p>
        </div>
        
        <Card className="p-4 flex items-center gap-4 bg-primary/5 border-primary/20 shrink-0 min-w-[250px]">
          <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <Unlock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Collection</span>
              <span>{unlockedCount} / {totalCount}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm relative z-10">
        <div className="flex flex-wrap gap-2 flex-1 w-full">
          <Button 
            variant={selectedCategory === 'all' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setSelectedCategory('all')}
            className="rounded-full"
          >
            All Categories
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={selectedCategory === cat ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory(cat as Category)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="flex items-center flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Switch 
              id="show-unlocked" 
              checked={showUnlockedFirst}
              onCheckedChange={setShowUnlockedFirst}
            />
            <Label htmlFor="show-unlocked" className="text-sm font-medium whitespace-nowrap cursor-pointer">
              Unlocked First
            </Label>
          </div>
          <div className="relative w-full sm:w-auto shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full sm:w-[200px] md:w-[250px] rounded-full border border-input bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {filteredVocab.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No vocabulary found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredVocab.map((vocab, idx) => {
              const isUnlocked = unlockedVocab.includes(vocab.id);
              const rarityInfo = RARITY_MAP[vocab.difficulty];
              const masteryPoints = vocabMastery[vocab.id] || 0;
              const masteryLevel = getVocabMasteryLevel(masteryPoints);
              const masteryBg = masteryLevel.solidBg;
              
              // Find next tier for progress bar
              const currentTierIndex = MASTERY_TIERS.findIndex(t => t.name === masteryLevel.name);
              const nextTier = MASTERY_TIERS[currentTierIndex + 1];
              const maxPoints = nextTier ? nextTier.min : 5000;
              const progressPercentage = Math.min(100, Math.round((masteryPoints / maxPoints) * 100));

              return (
                <motion.div
                  key={vocab.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ layout: { duration: 0.4, ease: "circOut" } }}
                >
                  <Card 
                    onClick={() => isUnlocked && setSelectedVocab(vocab)}
                    className={`h-full p-4 relative overflow-hidden flex flex-col justify-center transition-all ${
                    isUnlocked 
                      ? `border ${rarityInfo.border} ${rarityInfo.bg} hover:shadow-md hover:-translate-y-1 cursor-pointer`
                      : `border-dashed ${rarityInfo.border} ${rarityInfo.bg} opacity-50`
                  }`}>
                    {/* Rarity Badge */}
                    <Badge variant="outline" className={`absolute top-2 left-2 text-[9px] uppercase tracking-wider ${rarityInfo.color} ${rarityInfo.border}`}>
                      {rarityInfo.label}
                    </Badge>

                    {/* Lock Status Icon or Mastery Badge */}
                    <div className="absolute top-2 right-2">
                      {isUnlocked ? (
                         <Badge variant="secondary" className={`${masteryLevel.color} ${masteryLevel.bg} border-0 text-[9px] uppercase px-1.5 py-0`}>
                           {masteryLevel.name}
                         </Badge>
                      ) : (
                        <div className={rarityInfo.color}>
                          <Lock className="h-3 w-3" />
                        </div>
                      )}
                    </div>

                    <div className="mt-8 mb-2 text-center">
                      <h3 className={`font-bold text-lg leading-tight ${isUnlocked ? rarityInfo.color : `${rarityInfo.color} blur-[3px] select-none`}`}>
                        {isUnlocked ? vocab.englishWord : '?????????'}
                      </h3>
                      <p className={`text-xs mt-1 ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/50 blur-[2px] select-none'}`}>
                        {isUnlocked ? vocab.indonesianTranslation : '??????'}
                      </p>
                    </div>

                    {isUnlocked && (
                      <div className="mt-auto pt-3 border-t border-border/50 flex flex-wrap justify-center gap-1">
                        <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded-sm bg-background/50">
                          {vocab.category}
                        </span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Vocab Details Dialog */}
      <Dialog open={!!selectedVocab} onOpenChange={(open) => !open && setSelectedVocab(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedVocab && (() => {
            const rarityInfo = RARITY_MAP[selectedVocab.difficulty];
            const masteryPoints = vocabMastery[selectedVocab.id] || 0;
            const masteryLevel = getVocabMasteryLevel(masteryPoints);
            const masteryBg = masteryLevel.solidBg;
            
            const currentTierIndex = MASTERY_TIERS.findIndex(t => t.name === masteryLevel.name);
            const nextTier = MASTERY_TIERS[currentTierIndex + 1];
            const maxPoints = nextTier ? nextTier.min : 5000;
            const progressPercentage = Math.min(100, Math.round((masteryPoints / maxPoints) * 100));

            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`${rarityInfo.color} ${rarityInfo.border} text-[10px] uppercase tracking-wider`}>
                      {rarityInfo.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{selectedVocab.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DialogTitle className={`text-2xl font-bold ${rarityInfo.color}`}>
                      {selectedVocab.englishWord}
                    </DialogTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground" 
                      onClick={() => playPronunciation(selectedVocab.englishWord)}
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div 
                    onClick={() => setShowMasteryRules(true)}
                    className="mt-4 bg-muted/30 p-3 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                      <span className="text-muted-foreground flex items-center gap-1">
                        Mastery <Info className="h-3 w-3" />
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={masteryLevel.color}>{masteryLevel.name}</span>
                        <span className="text-muted-foreground text-xs">({masteryPoints}{nextTier ? `/${maxPoints}` : '+'})</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${masteryBg} transition-all duration-1000`} 
                        style={{ width: `${progressPercentage}%` }} 
                      />
                    </div>
                  </div>
                  <DialogDescription className="text-base text-foreground font-medium flex items-center gap-2">
                    {selectedVocab.indonesianTranslation} 
                    <span className="text-xs text-muted-foreground font-normal italic">({selectedVocab.partOfSpeech})</span>
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {(selectedVocab.explanation || selectedVocab.explanationIndo) && (
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                      <h4 className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                        <Info className="h-3 w-3" /> Description
                      </h4>
                      <div className="space-y-2">
                        {selectedVocab.explanation && (
                          <p className="text-sm text-foreground/90">{selectedVocab.explanation}</p>
                        )}
                        {selectedVocab.explanationIndo && (
                          <p className="text-sm text-muted-foreground italic border-t border-primary/10 pt-2">
                            "{selectedVocab.explanationIndo}"
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3" /> Example Sentence
                    </h4>
                    <p className="text-sm italic">"{selectedVocab.exampleSentence}"</p>
                  </div>
                  
                  {selectedVocab.synonyms.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-2">Synonyms</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedVocab.synonyms.map((syn, idx) => (
                          <Badge key={idx} variant="secondary" className="font-normal bg-background border-border">
                            {syn}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
      {/* Mastery Rules Dialog */}
      <Dialog open={showMasteryRules} onOpenChange={setShowMasteryRules}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mastery Tiers</DialogTitle>
            <DialogDescription>
               Keep answering correctly in quizzes to increase your mastery!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {MASTERY_TIERS.map((tier) => {
               return (
                 <div key={tier.name} className={`flex items-center justify-between p-3 rounded-lg border ${tier.bg} ${tier.color.replace('text-', 'border-')}/30`}>
                   <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tier.solidBg} text-white font-bold`}>
                         {tier.name[0]}
                      </div>
                      <span className={`font-bold ${tier.color}`}>{tier.name}</span>
                   </div>
                   <span className="text-sm font-bold text-muted-foreground">{tier.min}+ pts</span>
                 </div>
               );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
