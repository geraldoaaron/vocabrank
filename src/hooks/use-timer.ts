'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useTimer(
  initialTime: number,
  onTimeout: () => void,
  isActive: boolean
) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const reset = useCallback(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;
    setTimeRemaining(initialTime);
  }, [isActive, initialTime]);

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  useEffect(() => {
    if (isActive && timeRemaining === 0) {
      onTimeoutRef.current();
    }
  }, [isActive, timeRemaining]);

  const getTimeSpent = useCallback(() => {
    return initialTime - timeRemaining;
  }, [initialTime, timeRemaining]);

  return { timeRemaining, reset, getTimeSpent };
}
