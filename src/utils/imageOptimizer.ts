/**
 * Utility for optimizing image loading based on device type and screen size
 * with SSR (Server-Side Rendering) compatibility
 */

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

// Helper function to detect if current device is mobile (SSR-safe)
export const isMobileDevice = (): boolean => {
  if (!isBrowser) return false; // Default to desktop on server
  
  return window.innerWidth < 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Interface for responsive image sources
interface ResponsiveImage {
  desktop: string;
  mobile?: string;
  tablet?: string;
}

/**
 * Returns the appropriate image source based on device type
 * Falls back to desktop image if specific size isn't available
 * SSR-safe by defaulting to desktop
 */
export const getResponsiveImage = (sources: ResponsiveImage): string => {
  if (!isBrowser) return sources.desktop; // Default to desktop on server
  
  if (isMobileDevice() && sources.mobile) {
    return sources.mobile;
  }
  
  if (window.innerWidth < 1024 && window.innerWidth >= 768 && sources.tablet) {
    return sources.tablet;
  }
  
  return sources.desktop;
};

/**
 * Prefetch critical images for faster loading
 * @param imagePaths Array of image paths to prefetch
 */
export const prefetchImages = (imagePaths: string[]): void => {
  if (!isBrowser) return; // Skip on server
  
  // Don't prefetch on mobile to save bandwidth
  if (isMobileDevice()) return;
  
  for (const path of imagePaths) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  }
};