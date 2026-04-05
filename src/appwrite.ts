import { Client, Account, Databases, ID, Query } from 'appwrite';

/**
 * Initialize the Appwrite Client
 * Uses the exact endpoint and project ID provided for the Cookie Clicker game.
 */
const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69c2b4a10015a5c19a9f');

/**
 * Export initialized Appwrite services
 */
export const account = new Account(client);
export const databases = new Databases(client);
export { client, ID, Query };

/**
 * Database and Collection Constants
 * These IDs must match the configuration in the Appwrite Console.
 */
export const DATABASE_ID = 'cookie_clicker_db';
export const COLLECTION_LEADERBOARD = 'leaderboard';

/**
 * Updates the global leaderboard with the player's latest score.
 * If the player already exists, it updates their score (only if higher).
 * If the player does not exist, it creates a new entry.
 * 
 * @param username The player's chosen username
 * @param totalCookies The total number of cookies baked (all-time)
 */
export async function updateLeaderboard(username: string, totalCookies: number): Promise<void> {
  if (!username || totalCookies <= 0) return;

  try {
    // 1. Check if the user already has an entry in the leaderboard
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_LEADERBOARD,
      [Query.equal('username', username)]
    );

    const now = new Date().toISOString();

    if (response.documents.length > 0) {
      // User exists, check if we need to update their score
      const docId = response.documents[0].$id;
      const currentScore = response.documents[0].totalCookies;
      
      // Only update if the new score is strictly higher
      if (totalCookies > currentScore) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_LEADERBOARD,
          docId,
          {
            totalCookies: totalCookies,
            updatedAt: now
          }
        );
      }
    } else {
      // User does not exist, create a new leaderboard entry
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_LEADERBOARD,
        ID.unique(),
        {
          username: username,
          totalCookies: totalCookies,
          updatedAt: now
        }
      );
    }
  } catch (error) {
    // We catch and log the error gracefully so the game loop doesn't crash
    // if the user is offline or the database is temporarily unreachable.
    console.error('Failed to sync score to global leaderboard:', error);
  }
}

/**
 * Fetches the top players from the global leaderboard.
 * 
 * @param limit The maximum number of players to retrieve (default: 10)
 * @returns An array of leaderboard documents
 */
export async function getLeaderboard(limit: number = 10) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_LEADERBOARD,
      [
        Query.orderDesc('totalCookies'),
        Query.limit(limit)
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error);
    return [];
  }
}