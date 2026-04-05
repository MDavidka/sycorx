/**
 * Shared TypeScript interfaces and types for the Cookie Clicker game.
 */

export interface GameState {
  /** Current available cookies to spend */
  cookies: number;
  /** Total cookies ever baked (used for leaderboard scoring) */
  totalCookiesBaked: number;
  /** Current automated production rate (Cookies Per Second) */
  cookiesPerSecond: number;
  /** Current manual production rate (Cookies Per Click) */
  cookiesPerClick: number;
  /** Map of upgrade IDs to the quantity owned */
  upgrades: Record<string, number>;
  /** The player's chosen username */
  username: string;
  /** Timestamp of the last save (used for idle offline calculation) */
  lastSaved: number;
}

export interface Upgrade {
  /** Unique identifier for the upgrade */
  id: string;
  /** Display name of the upgrade */
  name: string;
  /** Short description of what the upgrade does */
  description: string;
  /** Initial cost of the upgrade (scales exponentially) */
  baseCost: number;
  /** Amount of cookies generated (either per second or per click based on type) */
  baseProduction: number;
  /** Whether this upgrade boosts manual clicking or passive idle generation */
  type: 'click' | 'passive';
  /** Emoji or image URL representing the upgrade */
  icon: string;
}

export interface LeaderboardEntry {
  /** Appwrite Document ID */
  $id: string;
  /** Player's username */
  username: string;
  /** Total cookies baked by the player */
  totalCookies: number;
  /** ISO Date string of when the score was last updated */
  updatedAt: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  version: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}