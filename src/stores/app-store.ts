'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      soundEnabled: true,
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'vocabrank-app',
      partialize: (state) => ({ soundEnabled: state.soundEnabled }),
    }
  )
);
