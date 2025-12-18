import { useState, useEffect } from 'react';

interface TimerState {
  remaining: number; // in seconds
  isRunning: boolean;
  isCompleted: boolean;
}

export const useOrderTimer = (
  estimatedMinutes: number | undefined,
  isStarted: boolean,
  startTime: number | undefined
): TimerState => {
  const [remaining, setRemaining] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Set initial remaining time
    if (estimatedMinutes) {
      setRemaining(estimatedMinutes * 60);
    }
  }, [estimatedMinutes]);

  useEffect(() => {
    if (!isStarted || !startTime) {
      setIsRunning(false);
      return;
    }

    setIsRunning(true);

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000; // in seconds
      const totalSeconds = (estimatedMinutes || 0) * 60;
      const newRemaining = Math.max(0, totalSeconds - elapsed);

      setRemaining(newRemaining);

      if (newRemaining <= 0) {
        setIsCompleted(true);
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 100); // Update every 100ms for smooth countdown

    return () => clearInterval(interval);
  }, [isStarted, startTime, estimatedMinutes]);

  return {
    remaining: Math.ceil(remaining),
    isRunning,
    isCompleted,
  };
};

// Format seconds to MM:SS
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
