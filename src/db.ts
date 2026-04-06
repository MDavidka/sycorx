/**
 * MongoDB Atlas Data API wrapper for Cookie Clicker Pro
 * 
 * NOTE: To use this, replace the placeholders below with your actual 
 * MongoDB Atlas Data API credentials from your cluster dashboard.
 */

export const MONGO_ENDPOINT = 'https://data.mongodb-api.com/app/data-abcde/endpoint/data/v1';
export const MONGO_API_KEY = 'YOUR_API_KEY_HERE';
export const DATA_SOURCE = 'Cluster0';
export const DATABASE_NAME = 'cookie_clicker_db';
export const COLLECTION_LEADERBOARD = 'high_scores';

/**
 * Fetches the top N entries from the leaderboard
 */
export async function getLeaderboard(limit: number = 10) {
  try {
    const response = await fetch(`${MONGO_ENDPOINT}/action/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGO_API_KEY,
      },
      body: JSON.stringify({
        dataSource: DATA_SOURCE,
        database: DATABASE_NAME,
        collection: COLLECTION_LEADERBOARD,
        sort: { score: -1 },
        limit: limit,
      }),
    });

    const data = await response.json();
    return data.documents || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

/**
 * Inserts a new score into the leaderboard
 */
export async function submitScore(username: string, score: number) {
  try {
    const response = await fetch(`${MONGO_ENDPOINT}/action/insertOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGO_API_KEY,
      },
      body: JSON.stringify({
        dataSource: DATA_SOURCE,
        database: DATABASE_NAME,
        collection: COLLECTION_LEADERBOARD,
        document: {
          username,
          score,
          timestamp: Date.now(),
        },
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error submitting score:', error);
    return null;
  }
}