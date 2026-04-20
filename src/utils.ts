import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Upgrade } from "./types";

/**
 * Merges Tailwind CSS classes safely.
 * Standard utility used by shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number into a compact, readable string (e.g., 1.5K, 2.3M).
 * 
 * @param num The number to format.
 * @returns A formatted string representation of the number.
 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return Math.floor(num).toString();
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Math.floor(num));
}

/**
 * Calculates the total Cookies Per Second (CPS) based on the player's inventory.
 * 
 * @param inventory A record mapping upgrade IDs to the quantity owned.
 * @param availableUpgrades The master list of all available upgrades in the game.
 * @returns The total calculated CPS.
 */
export function calculateCPS(
  inventory: Record<string, number>,
  availableUpgrades: Upgrade[]
): number {
  let totalCps = 0;

  for (const [upgradeId, quantity] of Object.entries(inventory)) {
    if (quantity <= 0) continue;

    const upgrade = availableUpgrades.find((u) => u.id === upgradeId);
    if (upgrade) {
      totalCps += upgrade.cpsBoost * quantity;
    }
  }

  return totalCps;
}

/**
 * Calculates the cost of the next upgrade based on the base cost, multiplier, and quantity owned.
 * Formula: BaseCost * (Multiplier ^ QuantityOwned)
 * 
 * @param baseCost The initial cost of the upgrade.
 * @param costMultiplier The rate at which the cost increases per purchase.
 * @param quantityOwned The number of this upgrade currently owned.
 * @returns The calculated cost for the next purchase, rounded up to the nearest integer.
 */
export function calculateUpgradeCost(
  baseCost: number,
  costMultiplier: number,
  quantityOwned: number
): number {
  if (quantityOwned === 0) return baseCost;
  return Math.ceil(baseCost * Math.pow(costMultiplier, quantityOwned));
}

/**
 * Calculates the number of cookies earned while the player was offline.
 * 
 * @param lastSaveTime The Unix timestamp (in milliseconds) of the last save.
 * @param currentCps The player's current Cookies Per Second.
 * @returns The total cookies earned offline.
 */
export function calculateOfflineProgress(
  lastSaveTime: number,
  currentCps: number
): number {
  if (!lastSaveTime || currentCps <= 0) return 0;

  const now = Date.now();
  const timeDiffMs = now - lastSaveTime;
  
  // Prevent negative time diffs (e.g., if system clock changes)
  if (timeDiffMs <= 0) return 0;

  const timeDiffSeconds = timeDiffMs / 1000;
  
  // Cap offline progress to a maximum of 7 days (604800 seconds) to prevent integer overflow/balance issues
  const maxOfflineSeconds = 7 * 24 * 60 * 60;
  const effectiveSeconds = Math.min(timeDiffSeconds, maxOfflineSeconds);

  return Math.floor(effectiveSeconds * currentCps);
}

/**
 * Generates a unique ID for a new user session if one doesn't exist.
 * 
 * @returns A random alphanumeric string.
 */
export function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}