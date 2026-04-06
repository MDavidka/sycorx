/**
 * Represents an available upgrade in the shop.
 */
export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  baseCps: number; // Cookies per second added per level
  baseClickPower: number; // Click power added per level
  costMultiplier: number; // Multiplier for cost increase per purchase (e.g., 1.15)
  icon: string; // Emoji or image URL representation
}

/**
 * Represents the player's current game state.
 * This is the core data structure that gets saved and loaded.
 */
export interface GameState {
  cookies: number; // Current unspent cookies
  totalCookies: number; // Lifetime cookies baked (used for leaderboards/achievements)
  cps: number; // Current cookies per second
  clickPower: number; // Current cookies earned per manual click
  upgrades: Record<string, number>; // Map of upgrade ID to quantity owned
  lastSaveTime: number; // Unix timestamp of the last save
}

/**
 * Represents a player's profile as stored in the Appwrite database.
 */
export interface PlayerProfile {
  $id?: string; // Appwrite document ID
  userId: string; // Appwrite Auth User ID
  username: string; // Display name for the leaderboard
  gameState: string; // JSON stringified GameState for easy storage
  totalCookies: number; // Extracted for database indexing and leaderboard sorting
  cps: number; // Extracted for database indexing and leaderboard sorting
}

/**
 * Represents a single entry on the global leaderboard.
 */
export interface LeaderboardEntry {
  $id: string;
  username: string;
  totalCookies: number;
  cps: number;
}

/**
 * Represents a floating text particle (e.g., "+1") spawned when clicking the cookie.
 */
export interface FloatingText {
  id: string;
  x: number;
  y: number;
  value: number;
  createdAt: number;
}

/**
 * Configuration for the site/game.
 */
export interface SiteConfig {
  title: string;
  version: string;
  saveIntervalMs: number; // How often to auto-save to the database
  tickRateMs: number; // How often the game loop runs (e.g., 100ms for smooth updates)
}