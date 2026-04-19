import { HostingPlan, ActiveService, Ticket } from './types';
import { delay } from './utils';

/**
 * DATABASE INTEGRATION STATUS
 * Currently, no database integration is connected.
 * This flag is exported so UI components can display a "Connect Database" CTA.
 */
export const IS_DB_CONNECTED = false;

// ============================================================================
// STATIC PLACEHOLDER DATA
// Used to keep the UI functional and demonstrate layout while disconnected.
// ============================================================================

const MOCK_PLANS: HostingPlan[] = [
  {
    _id: 'plan_1',
    name: 'Starter Cloud',
    type: 'shared',
    price: 5.99,
    billingCycle: 'monthly',
    description: 'Perfect for personal blogs and small projects.',
    features: ['1 Website', 'Free SSL Certificate', 'Daily Backups', '24/7 Support'],
    cpu: '1 Core',
    ram: '1 GB',
    storage: '10 GB NVMe',
    bandwidth: 'Unmetered',
  },
  {
    _id: 'plan_2',
    name: 'Pro VPS',
    type: 'vps',
    price: 19.99,
    billingCycle: 'monthly',
    isPopular: true,
    description: 'Dedicated resources for growing businesses.',
    features: ['Unlimited Websites', 'Root Access', 'Dedicated IP', 'Weekly Snapshots'],
    cpu: '2 Cores',
    ram: '4 GB',
    storage: '50 GB NVMe',
    bandwidth: '2 TB',
  },
  {
    _id: 'plan_3',
    name: 'Enterprise Dedicated',
    type: 'dedicated',
    price: 99.99,
    billingCycle: 'monthly',
    description: 'Maximum performance and control for heavy workloads.',
    features: ['Bare Metal Server', 'Advanced DDoS Protection', 'Custom Configuration', 'Priority Support'],
    cpu: '8 Cores (Dedicated)',
    ram: '32 GB',
    storage: '2x 500 GB NVMe (RAID 1)',
    bandwidth: '10 TB',
  }
];

const MOCK_SERVICES: ActiveService[] = [
  {
    _id: 'srv_1',
    userId: 'user_1',
    planId: 'plan_2',
    planName: 'Pro VPS',
    domain: 'myawesomeapp.com',
    ipAddress: '192.168.1.100',
    status: 'active',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const MOCK_TICKETS: Ticket[] = [
  {
    _id: 'tkt_1',
    userId: 'user_1',
    subject: 'Need help configuring SSL',
    message: 'I recently purchased the Pro VPS plan and need assistance setting up Let\'s Encrypt.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// ============================================================================
// DATA ACCESS FUNCTIONS
// Structured as async functions so they can be easily swapped with real 
// MongoDB Data API fetch() calls once the integration is connected.
// ============================================================================

/**
 * Fetches all available hosting plans.
 */
export async function getHostingPlans(): Promise<HostingPlan[]> {
  await delay(500); // Simulate network latency
  return MOCK_PLANS;
}

/**
 * Fetches active services for a specific user.
 * @param userId The ID of the user.
 */
export async function getActiveServices(userId: string): Promise<ActiveService[]> {
  await delay(600);
  // In a real app, this would query the DB. For now, return mock data if it matches, 
  // or just return the mock data for demonstration purposes.
  return MOCK_SERVICES;
}

/**
 * Fetches support tickets for a specific user.
 * @param userId The ID of the user.
 */
export async function getTickets(userId: string): Promise<Ticket[]> {
  await delay(400);
  return MOCK_TICKETS;
}

/**
 * Creates a new support ticket.
 * @param ticketData The ticket details.
 */
export async function createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
  await delay(800);
  
  const newTicket: Ticket = {
    _id: `tkt_${Math.random().toString(36).substring(2, 9)}`,
    userId: ticketData.userId || 'user_1',
    subject: ticketData.subject || 'New Ticket',
    message: ticketData.message || '',
    status: 'open',
    priority: ticketData.priority || 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // In a connected state, this would execute a POST request to the MongoDB Data API.
  console.log('Mock Ticket Created:', newTicket);
  
  return newTicket;
}