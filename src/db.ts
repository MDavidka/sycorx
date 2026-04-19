import { HostingPlan, User, Ticket, ActiveService, DatabaseResponse } from './types';

// ============================================================================
// DATABASE INTEGRATION STATUS: NOT CONNECTED
// ============================================================================
// The user has not connected a MongoDB integration in the Integrations tab.
// As per strict instructions, NO actual MongoDB Data API fetch calls, CRUD 
// helpers, or secrets are generated here. 
// 
// These functions act as structural stubs so the UI components can wire up 
// cleanly without dead-end mocks. The UI will check `IS_DB_CONNECTED` and 
// render a HeroUI banner/modal prompting the user to connect their database.
// ============================================================================

export const IS_DB_CONNECTED = false;

/**
 * Stub: Fetch all available hosting plans.
 */
export async function getHostingPlans(): Promise<DatabaseResponse<HostingPlan>> {
  console.warn("Database is not connected. Prompt user to connect integration.");
  return { documents: [] };
}

/**
 * Stub: Fetch a user profile by ID.
 */
export async function getUserProfile(userId: string): Promise<DatabaseResponse<User>> {
  console.warn("Database is not connected. Prompt user to connect integration.");
  return { document: undefined };
}

/**
 * Stub: Fetch active services for a specific user.
 */
export async function getUserServices(userId: string): Promise<DatabaseResponse<ActiveService>> {
  console.warn("Database is not connected. Prompt user to connect integration.");
  return { documents: [] };
}

/**
 * Stub: Fetch support tickets for a specific user.
 */
export async function getUserTickets(userId: string): Promise<DatabaseResponse<Ticket>> {
  console.warn("Database is not connected. Prompt user to connect integration.");
  return { documents: [] };
}

/**
 * Stub: Create a new support ticket.
 */
export async function createSupportTicket(ticketData: Partial<Ticket>): Promise<DatabaseResponse<Ticket>> {
  console.warn("Database is not connected. Cannot create ticket.");
  return { error: "Database integration required to create tickets." };
}

/**
 * Stub: Add a message to an existing ticket.
 */
export async function addTicketMessage(ticketId: string, message: string, senderId: string): Promise<DatabaseResponse<Ticket>> {
  console.warn("Database is not connected. Cannot add message.");
  return { error: "Database integration required to update tickets." };
}