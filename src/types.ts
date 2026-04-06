/**
 * Represents the core state of the player's game.
 * This is the object that will be saved to and loaded from local storage.
 */
export interface GameState {
    /** The player's chosen display name */
    playerName: string;
    /** Current number of cookies available to spend */
    cookies: number;
    /** Total number of cookies ever baked (used for leaderboard score) */
    totalCookies: number;
    /** Current passive cookie generation rate per second */
    cookiesPerSecond: number;
    /** A map of upgrade IDs to the quantity owned by the player */
    inventory: Record<string, number>;
    /** Unix timestamp of the last time the game was saved (used for offline progress) */
    lastSaveTime: number;
}

/**
 * Defines a purchasable building/upgrade in the shop.
 */
export interface UpgradeItem {
    /** Unique identifier for the upgrade (e.g., 'cursor', 'grandma') */
    id: string;
    /** Display name of the upgrade */
    name: string;
    /** Flavor text or description */
    description: string;
    /** The initial cost of the first unit */
    baseCost: number;
    /** The multiplier applied to the cost for each subsequent purchase (typically 1.15) */
    costMultiplier: number;
    /** The amount of Cookies Per Second (CPS) one unit of this upgrade provides */
    baseCps: number;
    /** URL to the placeholder image/icon for this upgrade */
    iconUrl: string;
}

/**
 * Represents a player's score entry on the global leaderboard.
 * Matches the schema expected by the MongoDB database.
 */
export interface PlayerScore {
    /** Optional MongoDB document ID */
    _id?: string;
    /** The player's display name */
    playerName: string;
    /** The total number of cookies ever baked by the player */
    score: number;
    /** ISO 8601 timestamp of when the score was last updated */
    updatedAt: string;
}

/**
 * Defines the available views in the application routing.
 */
export type ViewState = 'game' | 'leaderboard' | 'settings';

/**
 * Configuration object for initializing the game engine.
 */
export interface GameEngineConfig {
    /** The DOM element where the app is mounted */
    rootElement: HTMLElement;
    /** The interval in milliseconds for the main game loop (e.g., 1000 / 60 for 60fps) */
    tickRateMs: number;
    /** The interval in milliseconds for auto-saving to local storage */
    saveIntervalMs: number;
}

/**
 * Callback type for when the game state changes, used to trigger UI re-renders.
 */
export type StateChangeCallback = (newState: GameState) => void;