'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/stores/app-store';
import { useUserStore } from '@/stores/user-store';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Settings, Volume2, Palette, User, Trash2, Download, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function SettingsPage() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);
  const user = useUserStore((s) => s.user);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const resetData = useUserStore((s) => s.resetData);

  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [country, setCountry] = useState(user.country);

  const handleSaveProfile = () => {
    updateProfile({ username, bio, country });
    toast.success('Profile updated!');
  };

  const handleExportData = () => {
    const data = {
      user: useUserStore.getState().user,
      quizHistory: useUserStore.getState().quizHistory,
      activities: useUserStore.getState().activities,
      dailyChallenges: useUserStore.getState().dailyChallenges,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocabrank-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported!');
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      resetData();
      toast.success('All data has been reset.');
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Settings</h1>
        </div>
        <p className="text-muted-foreground">Manage your preferences</p>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-5 border-border/50">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-purple-500" /> Appearance
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">Toggle between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </Card>
      </motion.div>

      {/* Sound */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="p-5 border-border/50">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <Volume2 className="h-4 w-4 text-blue-500" /> Sound
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sound-toggle" className="text-sm font-medium cursor-pointer">Sound Effects</Label>
              <p className="text-xs text-muted-foreground">Play sounds for correct/incorrect answers</p>
            </div>
            <Switch
              id="sound-toggle"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>
        </Card>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-5 border-border/50 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-500" /> Profile
          </h3>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Username</Label>
              <Input value={username} onChange={e => setUsername(e.target.value)} className="rounded-lg mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Bio</Label>
              <Input value={bio} onChange={e => setBio(e.target.value)} className="rounded-lg mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Country</Label>
              <Input value={country} onChange={e => setCountry(e.target.value)} className="rounded-lg mt-1" />
            </div>
            <Button size="sm" className="rounded-lg gap-1.5" onClick={handleSaveProfile}>
              <Save className="h-3.5 w-3.5" /> Save Changes
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Data */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card className="p-5 border-border/50 space-y-4">
          <h3 className="font-semibold">Data Management</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="rounded-lg gap-1.5" onClick={handleExportData}>
              <Download className="h-3.5 w-3.5" /> Export Data
            </Button>
            <Separator orientation="vertical" className="hidden sm:block" />
            <Button variant="destructive" className="rounded-lg gap-1.5" onClick={handleResetData}>
              <Trash2 className="h-3.5 w-3.5" /> Reset All Data
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
