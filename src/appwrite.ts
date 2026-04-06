import { Client, Account, Databases, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69c2b4a10015a5c19a9f');

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Export ID utility for generating unique document IDs
export { ID };

// ============================================================================
// APPWRITE DATABASE CONFIGURATION
// ============================================================================
// IMPORTANT: You must create a Database and a Collection in your Appwrite 
// Console that match these exact IDs.
//
// 1. Create Database: "cookie_clicker_db"
// 2. Create Collection inside the database: "profiles"
// 3. Add the following attributes to the "profiles" collection:
//    - userId (String, required, size 36)
//    - username (String, required, size 50)
//    - gameState (String, required, size 10000) - Stores JSON stringified GameState
//    - totalCookies (Integer, required) - Used for leaderboard sorting
//    - cps (Integer, required) - Used for leaderboard sorting
// 4. Create an Index on the "profiles" collection:
//    - Key: "leaderboard_sort"
//    - Type: Key
//    - Attributes: ["totalCookies"]
//    - Orders: ["DESC"]
// 5. Update Collection Settings -> Permissions:
//    - Role: Any -> Read
//    - Role: Users -> Create, Read, Update, Delete
// ============================================================================

export const DATABASE_ID = 'cookie_clicker_db';
export const COLLECTION_PROFILES = 'profiles';

// Export the client as default or named export if needed elsewhere
export { client };