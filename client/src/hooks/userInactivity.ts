import { useEffect, useRef } from 'react';

const useInactivity = (timeout: number, onInactive: () => void) => {
  const lastActivityTime = useRef<number>(Date.now());

  const updateLastActivity = () => {
    lastActivityTime.current = Date.now();
  };

  useEffect(() => {
    // Event listeners for activity
    window.addEventListener('mousemove', updateLastActivity);
    window.addEventListener('keydown', updateLastActivity);
    window.addEventListener('click', updateLastActivity);

    const interval = setInterval(() => {
      const now = Date.now();
      const inactivityDuration = now - lastActivityTime.current;

      if (inactivityDuration > timeout) {
        onInactive(); // Trigger the callback
      }
    }, 1000); // Check every second

    return () => {
      // Cleanup
      window.removeEventListener('mousemove', updateLastActivity);
      window.removeEventListener('keydown', updateLastActivity);
      window.removeEventListener('click', updateLastActivity);
      clearInterval(interval);
    };
  }, [timeout, onInactive]);

  return null; // This is a hook, so no UI elements are rendered
};

export default useInactivity;
