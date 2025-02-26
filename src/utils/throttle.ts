/**
 * Creates a throttled function that only invokes the provided function at most once per
 * every `wait` milliseconds
 * 
 * @param callback Function to throttle
 * @param delay Time in milliseconds to throttle invocations
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      callback(...args);
      lastCall = now;
    }
  };
}