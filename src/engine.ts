import { GameState, PlayerProfile, Upgrade, SiteConfig } from './types';
import { calculateTotalCps, calculateClickPower, calculateUpgradeCost } from './utils';
import { databases, DATABASE_ID, COLLECTION_PROFILES } from './appwrite';

// ============================================================================
// GAME CONFIGURATION
// ============================================================================

export const CONFIG: SiteConfig = {
  title: 'Cookie Clicker Clone',
  version: '1.0.0',
  saveIntervalMs: 15000, // Auto-save every 15 seconds
  tickRateMs: 100,       // Game loop runs 10 times per second
};

export const AVAILABLE_UPGRADES: Upgrade[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'Auto-clicks once every 10 seconds.',
    baseCost: 15,
    baseCps: 0.1,
    baseClickPower: 0,
    costMultiplier: 1.15,
    icon: '🖱️'
  },
  {
    id: 'grandma',
    name: 'Grandma',
    description: 'A nice grandma to bake more cookies.',
    baseCost: 100,
    baseCps: 1,
    baseClickPower: 0,
    costMultiplier: 1.15,
    icon: '👵'
  },
  {
    id: 'farm',
    name: 'Cookie Farm',
    description: 'Grows cookie plants from cookie seeds.',
    baseCost: 1100,
    baseCps: 8,
    baseClickPower: 0,
    costMultiplier: 1.15,
    icon: '🌾'
  },
  {
    id: 'mine',
    name: 'Mine',
    description: 'Mines out cookie dough and chocolate chips.',
    baseCost: 12000,
    baseCps: 47,
    baseClickPower: 0,
    costMultiplier: 1.15,
    icon: '⛏️'
  },
  {
    id: 'factory',
    name: 'Factory',
    description: 'Produces large quantities of cookies.',
    baseCost: 130000,
    baseCps: 260,
    baseClickPower: 0,
    costMultiplier: 1.15,
    icon: '🏭'
  },
  {
    id: 'clicker_upgrade',
    name: 'Reinforced Finger',
    description: 'Increases your manual clicking power.',
    baseCost: 500,
    baseCps: 0,
    baseClickPower: 1,
    costMultiplier: 2.5,
    icon: '👆'
  }
];

// ============================================================================
// ENGINE STATE
// ============================================================================

let state: GameState = {
  cookies: 0,
  totalCookies: 0,
  cps: 0,
  clickPower: 1,
  upgrades: {},
  lastSaveTime: Date.now()
};

let profileId: string | null = null;
let lastTickTime: number = Date.now();
let gameLoopId: number | null = null;
let saveLoopId: number | null = null;

type StateListener = (state: GameState) => void;
const listeners: Set<StateListener> = new Set();

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Initializes the game engine with a player's profile from the database.
 * @param profile The PlayerProfile fetched from Appwrite.
 */
export function initEngine(profile: PlayerProfile): void {
  profileId = profile.$id || null;
  
  try {
    if (profile.gameState) {
      const parsedState = JSON.parse(profile.gameState) as Partial<GameState>;
      state = {
        ...state,
        ...parsedState,
        // Ensure upgrades object exists even if empty in save
        upgrades: parsedState.upgrades || {}
      };
    }
  } catch (e) {
    console.error('Failed to parse game state, starting fresh.', e);
  }

  // Recalculate derived stats to ensure integrity
  recalculateStats();
  
  // Start the loops
  startEngine();
}

/**
 * Returns a readonly copy of the current game state.
 */
export function getState(): Readonly<GameState> {
  return state;
}

/**
 * Subscribes a listener function to state changes.
 * @param listener Function to call when state updates.
 * @returns A function to unsubscribe the listener.
 */
export function subscribe(listener: StateListener): () => void {
  listeners.add(listener);
  // Immediately call with current state
  listener(state);
  return () => listeners.delete(listener);
}

/**
 * Notifies all subscribed listeners of the current state.
 */
function notify(): void {
  listeners.forEach(listener => listener(state));
}

/**
 * Handles a manual cookie click.
 */
export function clickCookie(): void {
  state.cookies += state.clickPower;
  state.totalCookies += state.clickPower;
  notify();
}

/**
 * Attempts to purchase an upgrade.
 * @param upgradeId The ID of the upgrade to purchase.
 * @returns True if successful, false if insufficient funds or invalid ID.
 */
export function purchaseUpgrade(upgradeId: string): boolean {
  const upgrade = AVAILABLE_UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) return false;

  const currentLevel = state.upgrades[upgradeId] || 0;
  const cost = calculateUpgradeCost(upgrade.baseCost, upgrade.costMultiplier, currentLevel);

  if (state.cookies >= cost) {
    state.cookies -= cost;
    state.upgrades[upgradeId] = currentLevel + 1;
    recalculateStats();
    notify();
    return true;
  }

  return false;
}

/**
 * Recalculates CPS and Click Power based on currently owned upgrades.
 */
function recalculateStats(): void {
  state.cps = calculateTotalCps(state.upgrades, AVAILABLE_UPGRADES);
  state.clickPower = calculateClickPower(state.upgrades, AVAILABLE_UPGRADES);
}

// ============================================================================
// GAME LOOP & SAVING
// ============================================================================

/**
 * Starts the game loop and auto-save intervals.
 */
export function startEngine(): void {
  if (gameLoopId !== null) stopEngine();

  lastTickTime = Date.now();
  
  // Main Game Loop
  gameLoopId = window.setInterval(() => {
    const now = Date.now();
    const deltaMs = now - lastTickTime;
    lastTickTime = now;
    
    // Calculate cookies earned based on time passed (handles background tab throttling)
    if (state.cps > 0) {
      const deltaSec = deltaMs / 1000;
      const earned = state.cps * deltaSec;
      state.cookies += earned;
      state.totalCookies += earned;
      notify();
    }
  }, CONFIG.tickRateMs);

  // Auto-Save Loop
  saveLoopId = window.setInterval(() => {
    saveGame();
  }, CONFIG.saveIntervalMs);
}

/**
 * Stops the game loop and auto-save intervals.
 */
export function stopEngine(): void {
  if (gameLoopId !== null) {
    window.clearInterval(gameLoopId);
    gameLoopId = null;
  }
  if (saveLoopId !== null) {
    window.clearInterval(saveLoopId);
    saveLoopId = null;
  }
}

/**
 * Saves the current game state to the Appwrite database.
 */
export async function saveGame(): Promise<void> {
  if (!profileId) return;

  try {
    state.lastSaveTime = Date.now();
    
    // We store totalCookies and cps as integers for Appwrite indexing/sorting
    await databases.updateDocument(
      DATABASE_ID, 
      COLLECTION_PROFILES, 
      profileId, 
      {
        gameState: JSON.stringify(state),
        totalCookies: Math.floor(state.totalCookies),
        cps: Math.floor(state.cps)
      }
    );
    console.log('Game saved successfully.');
  } catch (error) {
    console.error('Failed to save game state to Appwrite:', error);
  }
}