/**
 * Shared utility functions for the Cookie Clicker game.
 */

/**
 * Formats large numbers into human-readable strings (e.g., 1,200 -> 1.2k, 1,000,000 -> 1M).
 * @param num The number to format.
 * @returns A formatted string.
 */
export function formatNumber(num: number): string {
  if (num < 1000) return Math.floor(num).toString();
  
  const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx"];
  const suffixIndex = Math.floor(Math.log10(num) / 3);
  
  if (suffixIndex >= suffixes.length) return num.toExponential(2);
  
  const shortValue = (num / Math.pow(1000, suffixIndex)).toFixed(1);
  return `${shortValue}${suffixes[suffixIndex]}`;
}

/**
 * Generates a simple random ID for local session tracking.
 * @returns A random string.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Clamps a number between a min and max value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce function to limit the rate of function execution.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}