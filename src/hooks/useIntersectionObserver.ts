import { useEffect, useState, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  // Skip observer on mobile devices to improve performance
  disableOnMobile?: boolean;
}

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Custom hook for using IntersectionObserver with performance optimization
 * for mobile devices and SSR compatibility
 */
export const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverOptions = {},
  elemRef?: RefObject<T>
): [boolean, RefObject<T>] => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<T>(null);
  const targetRef = elemRef || ref;
  
  useEffect(() => {
    // Early return for SSR
    if (!isBrowser) return;
    
    const target = targetRef.current;
    if (!target) return;
    
    // Skip observer on mobile if specified in options
    if (options.disableOnMobile && window.innerWidth < 768) {
      setIsIntersecting(true); // Assume element is visible on mobile
      return;
    }
    
    // Browser check for IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true); // Fallback for browsers without support
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, 
      {
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0,
      }
    );
    
    observer.observe(target);
    
    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [targetRef, options.root, options.rootMargin, options.threshold, options.disableOnMobile]);
  
  return [isIntersecting, targetRef];
};