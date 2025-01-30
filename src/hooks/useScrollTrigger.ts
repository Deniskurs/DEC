import { useState, useEffect } from 'react';

export const useScrollTrigger = (triggerDistance: number = 800) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY, triggerDistance]);

  return isVisible;
};