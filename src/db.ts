/**
 * Database Integration Stub
 * 
 * NO DATABASE CONNECTED.
 * This file currently uses `localStorage` to mock database interactions so the game
 * remains fully functional locally. 
 * 
 * Once a database integration (e.g., MongoDB Atlas Data API) is connected, 
 * update these functions to use standard fetch() calls to your endpoint.
 */

export const IS_DB_CONNECTED = false;

const LOCAL_STORAGE_KEY = 'cookie_clicker_save';
const LEADERBOARD_KEY = 'cookie_clicker_leaderboard';

/**
 * Saves the player's game state.
 * Currently mocks a network request and saves to localStorage.
 */
export async function savePlayerData(playerId: string, data: any): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const saves = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
      saves[playerId] = { ...data, lastSaved: Date.now() };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saves));
      
      // Simulate network latency
      setTimeout(() => resolve(true), 300);
    } catch (e) {
      console.error('Failed to save player data locally', e);
      resolve(false);
    }
  });
}

/**
 * Loads the player's game state.
 * Currently mocks a network request and loads from localStorage.
 */
export async function loadPlayerData(playerId: string): Promise<any | null> {
  return new Promise((resolve) => {
    try {
      const saves = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
      
      // Simulate network latency
      setTimeout(() => resolve(saves[playerId] || null), 300);
    } catch (e) {
      console.error('Failed to load player data locally', e);
      resolve(null);
    }
  });
}

/**
 * Retrieves the global leaderboard.
 * Returns mock data combined with any local high scores.
 */
export async function getLeaderboard(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let localLeaderboard: any[] = [];
      try {
        localLeaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
      } catch (e) {
        console.error('Failed to load leaderboard locally', e);
      }

      // Static mock data to populate the leaderboard when offline/disconnected
      const mockLeaderboard = [
        { id: 'mock_1', playerName: 'CookieMonster', score: 999999999 },
        { id: 'mock_2', playerName: 'Grandma_Supreme', score: 50000000 },
        { id: 'mock_3', playerName: 'ClickerPro99', score: 1234567 },
        { id: 'mock_4', playerName: 'DoughBoy', score: 750000 },
        { id: 'mock_5', playerName: 'CasualBaker', score: 10000 },
      ];

      // Combine and sort
      const combined = [...localLeaderboard, ...mockLeaderboard];
      
      // Deduplicate by playerName (keeping highest score)
      const uniqueMap = new Map<string, any>();
      combined.forEach(entry => {
        const existing = uniqueMap.get(entry.playerName);
        if (!existing || existing.score < entry.score) {
          uniqueMap.set(entry.playerName, entry);
        }
      });

      const finalLeaderboard = Array.from(uniqueMap.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 100); // Top 100

      resolve(finalLeaderboard);
    }, 500);
  });
}

/**
 * Submits a new high score to the leaderboard.
 */
export async function saveHighScore(playerId: string, playerName: string, score: number): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
      const existingEntryIndex = leaderboard.findIndex((entry: any) => entry.playerId === playerId);

      if (existingEntryIndex >= 0) {
        if (leaderboard[existingEntryIndex].score < score) {
          leaderboard[existingEntryIndex].score = score;
          leaderboard[existingEntryIndex].playerName = playerName;
        }
      } else {
        leaderboard.push({ 
          id: 'local_' + Math.random().toString(36).substring(2, 9), 
          playerId, 
          playerName, 
          score 
        });
      }

      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
      
      setTimeout(() => resolve(true), 400);
    } catch (e) {
      console.error('Failed to save high score locally', e);
      resolve(false);
    }
  });
}