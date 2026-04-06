import confetti from 'canvas-confetti';
import { Upgrade } from './types';

/**
 * Formats a number into a compact, readable string (e.g., 1.2K, 1.5M, 2.3B).
 * @param num The number to format.
 * @returns A formatted string representation of the number.
 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return Math.floor(num).toString();
  }

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  });

  return formatter.format(num);
}

/**
 * Calculates the cost of an upgrade based on its base cost, multiplier, and current level.
 * Formula: BaseCost * (Multiplier ^ Level)
 * @param baseCost The initial cost of the upgrade.
 * @param multiplier The cost multiplier per level.
 * @param level The current number of this upgrade owned.
 * @returns The calculated cost for the next level.
 */
export function calculateUpgradeCost(baseCost: number, multiplier: number, level: number): number {
  return Math.floor(baseCost * Math.pow(multiplier, level));
}

/**
 * Calculates the total Cookies Per Second (CPS) based on owned upgrades.
 * @param ownedUpgrades A record mapping upgrade IDs to the quantity owned.
 * @param availableUpgrades The list of all available upgrades in the game.
 * @returns The total CPS.
 */
export function calculateTotalCps(ownedUpgrades: Record<string, number>, availableUpgrades: Upgrade[]): number {
  let totalCps = 0;
  for (const [id, level] of Object.entries(ownedUpgrades)) {
    const upgrade = availableUpgrades.find((u) => u.id === id);
    if (upgrade && upgrade.baseCps > 0) {
      totalCps += upgrade.baseCps * level;
    }
  }
  return totalCps;
}

/**
 * Calculates the total Click Power based on owned upgrades.
 * Base click power is always 1.
 * @param ownedUpgrades A record mapping upgrade IDs to the quantity owned.
 * @param availableUpgrades The list of all available upgrades in the game.
 * @returns The total cookies earned per click.
 */
export function calculateClickPower(ownedUpgrades: Record<string, number>, availableUpgrades: Upgrade[]): number {
  let clickPower = 1; // Base click power
  for (const [id, level] of Object.entries(ownedUpgrades)) {
    const upgrade = availableUpgrades.find((u) => u.id === id);
    if (upgrade && upgrade.baseClickPower > 0) {
      clickPower += upgrade.baseClickPower * level;
    }
  }
  return clickPower;
}

/**
 * Spawns a floating text element at the specified screen coordinates.
 * Used for visual feedback when clicking the cookie.
 * @param x The X coordinate on the screen.
 * @param y The Y coordinate on the screen.
 * @param value The numeric value to display (e.g., +1).
 */
export function spawnFloatingText(x: number, y: number, value: number): void {
  if (typeof document === 'undefined') return;

  const el = document.createElement('div');
  el.textContent = `+${formatNumber(value)}`;
  
  // Apply Tailwind and custom CSS classes
  el.className = 'animate-float-up absolute pointer-events-none select-none z-50 text-white font-extrabold text-2xl';
  
  // Add a slight random offset so multiple clicks don't perfectly overlap
  const offsetX = (Math.random() - 0.5) * 40;
  const offsetY = (Math.random() - 0.5) * 20;
  
  el.style.left = `${x + offsetX}px`;
  el.style.top = `${y + offsetY}px`;
  
  // Text shadow for better visibility over the cookie
  el.style.textShadow = '0px 2px 4px rgba(0,0,0,0.4), 0px 0px 2px rgba(0,0,0,0.8)';

  document.body.appendChild(el);

  // Remove the element after the animation completes (1s as defined in style.css)
  setTimeout(() => {
    if (document.body.contains(el)) {
      document.body.removeChild(el);
    }
  }, 1000);
}

/**
 * Triggers a celebratory confetti effect.
 * Used for major milestones or expensive upgrade purchases.
 */
export function triggerConfetti(): void {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#5D4037', '#FFC107', '#FF9800', '#FFF8E1']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#5D4037', '#FFC107', '#FF9800', '#FFF8E1']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  
  frame();
}