import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes, resolving conflicts.
 * Standard utility required for shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats large numbers into a compact, readable string (e.g., 1.2K, 1.5M, 2B).
 * Useful for displaying massive cookie counts in the UI.
 */
export function formatNumber(num: number): string {
  if (num < 1000) return Math.floor(num).toString();
  
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2
  }).format(Math.floor(num));
}

/**
 * Formats numbers with exact comma separation (e.g., 1,234,567).
 * Useful for tooltips or detailed stat views.
 */
export function formatExactNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(Math.floor(num));
}

/**
 * Calculates the cost of the next upgrade based on how many are already owned.
 * Uses the standard incremental game formula: BaseCost * (Multiplier ^ OwnedCount)
 * Default multiplier is 1.15.
 */
export function calculateUpgradeCost(baseCost: number, ownedCount: number, multiplier: number = 1.15): number {
  return Math.ceil(baseCost * Math.pow(multiplier, ownedCount));
}

/**
 * Calculates the total Cookies Per Second (CPS) based on the user's owned upgrades.
 */
export function calculateTotalCPS(
  ownedUpgrades: Record<string, number>,
  upgradeDefinitions: { id: string; cps: number }[]
): number {
  return upgradeDefinitions.reduce((total, upgrade) => {
    const count = ownedUpgrades[upgrade.id] || 0;
    return total + (count * upgrade.cps);
  }, 0);
}

/**
 * Generates a simple unique identifier.
 * Useful for assigning temporary IDs to guest players before they save their game.
 */
export function generateGuestId(): string {
  return 'guest_' + Math.random().toString(36).substring(2, 11);
}

/**
 * Calculates how many cookies are earned during an offline period.
 * @param cps Current Cookies Per Second
 * @param lastSaveTime Timestamp (ms) of the last save
 * @param currentTime Current timestamp (ms)
 * @returns Number of cookies earned while away
 */
export function calculateOfflineEarnings(cps: number, lastSaveTime: number, currentTime: number = Date.now()): number {
  if (!lastSaveTime || cps <= 0) return 0;
  
  const secondsOffline = Math.max(0, (currentTime - lastSaveTime) / 1000);
  // Cap offline earnings to a maximum of 7 days (604800 seconds) to prevent infinite scaling exploits
  const effectiveSeconds = Math.min(secondsOffline, 604800);
  
  return Math.floor(effectiveSeconds * cps);
}