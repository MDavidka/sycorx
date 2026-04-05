import { Client, Account, Databases, ID } from 'appwrite';

/**
 * Appwrite Client Initialization
 * Endpoint: https://fra.cloud.appwrite.io/v1
 * Project ID: 69c2b4a10015a5c19a9f
 */
const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69c2b4a10015a5c19a9f');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };

// Database and Collection IDs
// These should be created in your Appwrite Console:
// Database: 'game_db'
// Collection: 'leaderboard'
export const DATABASE_ID = 'game_db';
export const COLLECTION_LEADERBOARD = 'leaderboard';

/**
 * Helper to update or create a user's score in the leaderboard
 */
export async function updateLeaderboard(username: string, totalCookies: number) {
  try {
    // Attempt to find existing entry
    const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_LEADERBOARD, [
      // Query logic would go here if we had a unique index on username
    ]);

    // For simplicity in this implementation, we create a new entry
    // In a production app, you'd use a unique index on username to update existing
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_LEADERBOARD,
      ID.unique(),
      {
        username,
        totalCookies,
        updatedAt: new Date().toISOString(),
      }
    );
  } catch (error) {
    console.error('Failed to update leaderboard:', error);
    throw error;
  }
}