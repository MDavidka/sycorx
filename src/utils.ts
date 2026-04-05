/**
 * Formats a number into a compact string representation (e.g., 1.2M, 3.4B).
 * Uses the standard Intl.NumberFormat for robust localization and formatting.
 * 
 * @param num The number to format.
 * @returns The formatted string.
 */
export function formatNumber(num: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
  return formatter.format(Math.floor(num));
}

/**
 * Generates a short random unique identifier.
 * Useful for DOM element IDs or temporary keys.
 * 
 * @returns A random string ID.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

/**
 * Clamps a number between a minimum and maximum value.
 * 
 * @param value The value to clamp.
 * @param min The minimum allowed value.
 * @param max The maximum allowed value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Creates a debounced function that delays invoking the provided function 
 * until after `wait` milliseconds have elapsed since the last time it was invoked.
 * Useful for saving state to the cloud without spamming API requests.
 * 
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Calculates the exponential cost of an upgrade based on the quantity already owned.
 * Uses the standard incremental game formula: baseCost * (growthFactor ^ owned)
 * 
 * @param baseCost The initial cost of the upgrade.
 * @param owned The number of this upgrade currently owned.
 * @param growthFactor The rate at which the price increases (default 1.15).
 * @returns The calculated cost for the next upgrade.
 */
export function calculateUpgradeCost(baseCost: number, owned: number, growthFactor: number = 1.15): number {
  return Math.ceil(baseCost * Math.pow(growthFactor, owned));
}