import { GameState, UserData, LeaderboardEntry } from './types';

/**
 * DATABASE STUB - NO INTEGRATION CONNECTED
 * 
 * Since no database integration is currently connected, this module uses 
 * browser localStorage to persist game state and returns static mock data 
 * for global features like the leaderboard.
 * 
 * Once a MongoDB integration is configured, replace these implementations 
 * with standard fetch() calls to the MongoDB Atlas Data API.
 */

const LOCAL_STORAGE_SAVE_KEY = 'cookie_clicker_save_state';
const LOCAL_STORAGE_USER_KEY = 'cookie_clicker_user_profile';

/**
 * Saves the user's current game state.
 * Currently stubbed to use localStorage.
 */
export async function saveGameState(userId: string, gameState: GameState): Promise<void> {
  try {
    const data = { 
      userId, 
      gameState, 
      updatedAt: new Date().toISOString() 
    };
    localStorage.setItem(`${LOCAL_STORAGE_SAVE_KEY}_${userId}`, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save game state locally:", error);
  }
}

/**
 * Loads the user's saved game state.
 * Currently stubbed to use localStorage.
 */
export async function loadGameState(userId: string): Promise<GameState | null> {
  try {
    const data = localStorage.getItem(`${LOCAL_STORAGE_SAVE_KEY}_${userId}`);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.gameState as GameState;
    }
  } catch (error) {
    console.error("Failed to load game state locally:", error);
  }
  return null;
}

/**
 * Retrieves the global leaderboard.
 * Currently stubbed to return static mock data.
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    { username: "Grandma", totalCookiesBaked: 999999999, cps: 50000 },
    { username: "CookieMonster", totalCookiesBaked: 50000000, cps: 2500 },
    { username: "ClickerPro", totalCookiesBaked: 1250000, cps: 150 },
    { username: "CasualBaker", totalCookiesBaked: 75000, cps: 45 },
    { username: "Newbie", totalCookiesBaked: 500, cps: 2 },
  ];
}

/**
 * Saves the user's profile data.
 * Currently stubbed to use localStorage.
 */
export async function saveUser(user: UserData): Promise<void> {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_USER_KEY}_${user.userId}`, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user profile locally:", error);
  }
}

/**
 * Retrieves the user's profile data.
 * Currently stubbed to use localStorage.
 */
export async function getUser(userId: string): Promise<UserData | null> {
  try {
    const data = localStorage.getItem(`${LOCAL_STORAGE_USER_KEY}_${userId}`);
    if (data) {
      return JSON.parse(data) as UserData;
    }
  } catch (error) {
    console.error("Failed to load user profile locally:", error);
  }
  return null;
}