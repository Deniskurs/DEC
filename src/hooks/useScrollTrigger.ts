import { useState, useEffect } from 'react';
import { throttle } from '../utils/throttle';

// Check if running in browser environment
const isBrowser = typeof window !== 'undefined';

export const useScrollTrigger = (triggerDistance: number = 800) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Skip for SSR
    if (!isBrowser) return;
    
    let timeoutId: NodeJS.Timeout;
    
    // Use throttled scroll handler for better performance
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      
      // Show CTA when scrolling down and past trigger distance
      if (currentScrollY > lastScrollY && currentScrollY > triggerDistance) {
        clearTimeout(timeoutId);
        setIsVisible(true);
        
        // Hide after 5 seconds
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }
      
      setLastScrollY(currentScrollY);
    }, 150); // Use slightly higher throttle for non-critical UI

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY, triggerDistance]);

  return isVisible;
};