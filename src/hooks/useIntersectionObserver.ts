import { useEffect, useState, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  // Skip observer on mobile devices to improve performance
  disableOnMobile?: boolean;
}

/**
 * Custom hook for using IntersectionObserver with performance optimization
 * for mobile devices
 */
export const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverOptions = {},
  elemRef?: RefObject<T>
): [boolean, RefObject<T>] => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<T>(null);
  const targetRef = elemRef || ref;
  
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    
    // Skip observer on mobile if specified in options
    if (options.disableOnMobile && window.innerWidth < 768) {
      setIsIntersecting(true); // Assume element is visible on mobile
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