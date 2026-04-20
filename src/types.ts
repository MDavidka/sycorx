export interface GameState {
  /** Current number of cookies available to spend */
  cookies: number;
  /** Total number of cookies baked across the entire lifetime of the save */
  totalCookiesBaked: number;
  /** Current cookies generated per second (CPS) */
  cookiesPerSecond: number;
  /** Dictionary mapping upgrade IDs to the quantity owned */
  inventory: Record<string, number>;
  /** Timestamp of the last save, used for offline progress calculation */
  lastSaveTime: number;
  /** Unique identifier for the player */
  playerId: string;
  /** Display name for the player */
  username: string;
}

export interface Upgrade {
  /** Unique identifier for the upgrade */
  id: string;
  /** Display name of the upgrade */
  name: string;
  /** Flavor text or description */
  description: string;
  /** Initial cost of the first purchase */
  baseCost: number;
  /** Amount of CPS added per unit of this upgrade */
  baseCps: number;
  /** Multiplier applied to the cost for each subsequent purchase (e.g., 1.15) */
  costMultiplier: number;
  /** Optional icon identifier (e.g., Lucide icon name) */
  iconName?: string;
}

export interface PlayerScore {
  /** Database identifier */
  _id?: string;
  /** Unique identifier matching the GameState playerId */
  playerId: string;
  /** Display name for the leaderboard */
  username: string;
  /** Total cookies baked (used for ranking) */
  totalCookies: number;
  /** Highest achieved CPS */
  highestCps: number;
  /** ISO timestamp of the last update */
  updatedAt: string;
}

export interface NavItem {
  /** Display text for the navigation link */
  title: string;
  /** URL path */
  href: string;
  /** Optional icon identifier */
  icon?: string;
}

export interface SiteConfig {
  /** Name of the application */
  name: string;
  /** Short description of the application */
  description: string;
  /** Current version string */
  version: string;
}