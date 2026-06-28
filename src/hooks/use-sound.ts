'use client';

import { useCallback } from 'react';
import { useAppStore } from '@/stores/app-store';

export function useSound() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);

  const playSound = useCallback(
    (type: 'correct' | 'incorrect' | 'click' | 'levelup' | 'achievement') => {
      if (!soundEnabled) return;

      try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);

        switch (type) {
          case 'correct':
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
          case 'incorrect':
            oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(277, audioContext.currentTime + 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
          case 'click':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
          case 'levelup':
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
          case 'achievement':
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.15);
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.45);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.6);
            break;
        }
      } catch {
        // Web Audio API not available
      }
    },
    [soundEnabled]
  );

  return { playSound };
}
