import { useState, useEffect } from 'react';

/**
 * A custom hook to synchronize onboarding tour state across multiple open tabs.
 * It listens to the window 'storage' event to keep state perfectly in sync reactively.
 */
export function useOnboardingTour() {
  const [tourCompleted, setTourCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('eudease_tour_completed') === 'true';
    } catch {
      return false;
    }
  });

  const [startImmediately, setStartImmediately] = useState<boolean>(() => {
    try {
      return localStorage.getItem('eudease_tour_start_immediately') === 'true';
    } catch {
      return false;
    }
  });

  // Track changes in other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'eudease_tour_completed') {
        setTourCompleted(event.newValue === 'true');
      }
      if (event.key === 'eudease_tour_start_immediately') {
        setStartImmediately(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const markCompleted = () => {
    try {
      localStorage.setItem('eudease_tour_completed', 'true');
      // Dispatch storage event manually for the SAME tab to propagate if needed (though local state handles it)
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'eudease_tour_completed',
        newValue: 'true'
      }));
    } catch {}
    setTourCompleted(true);
  };

  const setStartImmediate = (value: boolean) => {
    try {
      if (value) {
        localStorage.setItem('eudease_tour_start_immediately', 'true');
      } else {
        localStorage.removeItem('eudease_tour_start_immediately');
      }
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'eudease_tour_start_immediately',
        newValue: value ? 'true' : null
      }));
    } catch {}
    setStartImmediately(value);
  };

  const resetTour = () => {
    try {
      localStorage.removeItem('eudease_tour_completed');
      localStorage.removeItem('eudease_tour_start_immediately');
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'eudease_tour_completed',
        newValue: null
      }));
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'eudease_tour_start_immediately',
        newValue: null
      }));
    } catch {}
    setTourCompleted(false);
    setStartImmediately(false);
  };

  return {
    tourCompleted,
    startImmediately,
    markCompleted,
    setStartImmediate,
    resetTour
  };
}
