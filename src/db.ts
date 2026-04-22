import { PlayerScore } from './types';

/**
 * MongoDB Atlas Data API Configuration
 * 
 * To enable the global leaderboard, replace these placeholder values with your
 * actual MongoDB Atlas Data API credentials.
 * 
 * If left unconfigured, the application will gracefully fall back to returning
 * mock data so the UI can still be tested.
 */
export const MONGO_ENDPOINT = 'YOUR_MONGO_ENDPOINT_HERE'; // e.g., https://data.mongodb-api.com/app/data-xyz/endpoint/data/v1
export const MONGO_API_KEY = 'YOUR_MONGO_API_KEY_HERE';
export const DATA_SOURCE = 'Cluster0';
export const DATABASE_NAME = 'cookie_clicker_db';
export const COLLECTION_SCORES = 'leaderboard';

/**
 * Internal helper to make requests to the MongoDB Data API.
 * 
 * @param action The Data API action (e.g., 'find', 'updateOne')
 * @param body The payload body excluding standard DB config
 * @returns The JSON response from the API, or null if unconfigured
 */
async function mongoFetch(action: string, body: Record<string, unknown>): Promise<any> {
    // Check if the user has configured the database
    if (MONGO_ENDPOINT === 'YOUR_MONGO_ENDPOINT_HERE' || MONGO_API_KEY === 'YOUR_MONGO_API_KEY_HERE') {
        console.warn("MongoDB Data API is not configured. Using mock data fallback.");
        return null;
    }

    const response = await fetch(`${MONGO_ENDPOINT}/action/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': MONGO_API_KEY
        },
        body: JSON.stringify({
            dataSource: DATA_SOURCE,
            database: DATABASE_NAME,
            collection: COLLECTION_SCORES,
            ...body
        })
    });

    if (!response.ok) {
        throw new Error(`MongoDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Fetches the top 50 players from the global leaderboard.
 * 
 * @returns A promise resolving to an array of PlayerScore objects.
 */
export async function getLeaderboard(): Promise<PlayerScore[]> {
    try {
        const data = await mongoFetch('find', {
            filter: {},
            sort: { score: -1 }, // Sort descending by score
            limit: 50
        });

        // Fallback to mock data if the database isn't configured
        if (!data) {
            return [
                { playerName: 'Grandma', score: 9999999, updatedAt: new Date().toISOString() },
                { playerName: 'CookieMonster', score: 5000000, updatedAt: new Date().toISOString() },
                { playerName: 'ClickerPro', score: 250000, updatedAt: new Date().toISOString() },
                { playerName: 'CasualBaker', score: 10000, updatedAt: new Date().toISOString() },
                { playerName: 'Newbie', score: 100, updatedAt: new Date().toISOString() }
            ];
        }

        return data.documents as PlayerScore[];
    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        return [];
    }
}

/**
 * Submits a player's score to the global leaderboard.
 * Uses an upsert operation to only update the score if it's higher than their previous best.
 * 
 * @param playerName The player's display name
 * @param score The player's total cookies baked
 * @returns A promise resolving to true if successful, false otherwise
 */
export async function submitScore(playerName: string, score: number): Promise<boolean> {
    try {
        const data = await mongoFetch('updateOne', {
            filter: { playerName: playerName },
            update: {
                $set: {
                    playerName: playerName,
                    updatedAt: new Date().toISOString()
                },
                // $max ensures the score only updates if the new value is greater than the existing value
                $max: {
                    score: score 
                }
            },
            upsert: true
        });

        // If data is null, we are in mock mode, so we pretend it succeeded
        if (!data) {
            console.log(`[Mock DB] Score submitted for ${playerName}: ${score}`);
            return true;
        }

        return true;
    } catch (error) {
        console.error("Failed to submit score:", error);
        return false;
    }
}