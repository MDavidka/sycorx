/**
 * Shared TypeScript interfaces and types for the Cookie Clicker application.
 */

// ==========================================
// Site & Navigation Types
// ==========================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: string;
}

// ==========================================
// Game Mechanics Types
// ==========================================

/**
 * Defines a purchasable upgrade in the game.
 */
export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number; // How much the cost increases per purchase (e.g., 1.15)
  cpsBoost: number; // Cookies Per Second added per unit of this upgrade
  iconUrl?: string; // Optional URL for the upgrade's icon
}

/**
 * Represents the current state of a player's game.
 */
export interface GameState {
  cookies: number; // Current unspent cookies
  totalCookiesBaked: number; // Lifetime cookies earned (used for achievements/leaderboard)
  cps: number; // Current Cookies Per Second
  clickPower: number; // How many cookies are earned per manual click
  inventory: Record<string, number>; // Map of upgradeId to quantity owned
  lastSaveTime: number; // Unix timestamp of the last save (used for offline progress calculation)
}

// ==========================================
// User & Database Types
// ==========================================

/**
 * Represents a user's profile and saved data in the database.
 */
export interface UserData {
  _id?: string; // MongoDB document ID
  userId: string; // Unique identifier for the user (e.g., session ID or auth ID)
  username: string; // Display name for the leaderboard
  gameState: GameState; // The user's saved game progress
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Represents a single entry on the global leaderboard.
 */
export interface LeaderboardEntry {
  username: string;
  totalCookiesBaked: number;
  cps: number;
}

// ==========================================
// Component Prop Types
// ==========================================

export interface CookieButtonProps {
  onClick: () => void;
  clickPower: number;
  disabled?: boolean;
}

export interface UpgradeCardProps {
  upgrade: Upgrade;
  quantityOwned: number;
  currentCost: number;
  canAfford: boolean;
  onPurchase: (upgradeId: string, cost: number) => void;
}

export interface HeaderProps {
  currentCookies: number;
  cps: number;
}