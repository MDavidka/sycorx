import { HostingPlan, ServerStatus, Subscription, ApiResponse } from './types';
import { delay } from './utils';

/**
 * DATABASE INTEGRATION STATUS: NOT CONNECTED
 * 
 * As per the current configuration, no external database integration is connected.
 * This file exports mock data functions to keep the UI functional with static copy.
 * 
 * Components should check `IS_DB_CONNECTED` and render a HeroUI banner or modal
 * prompting the user to connect a database from the Integrations tab.
 */

export const IS_DB_CONNECTED = false;

// ==========================================
// Static Mock Data
// ==========================================

const MOCK_PLANS: HostingPlan[] = [
  {
    _id: 'plan_shared_1',
    name: 'Starter',
    description: 'Perfect for personal blogs and small projects.',
    priceMonthly: 4.99,
    priceYearly: 49.90,
    features: ['1 Website', '10GB NVMe Storage', 'Free SSL Certificate', 'Standard Support'],
    type: 'shared',
    specs: {
      cpu: '1 Core',
      ram: '1 GB',
      storage: '10 GB',
      bandwidth: 'Unmetered'
    }
  },
  {
    _id: 'plan_vps_1',
    name: 'Professional VPS',
    description: 'Dedicated resources for growing businesses.',
    priceMonthly: 19.99,
    priceYearly: 199.90,
    features: ['Unlimited Websites', '50GB NVMe Storage', 'Dedicated IP', 'Priority 24/7 Support'],
    type: 'vps',
    isPopular: true,
    specs: {
      cpu: '4 Cores',
      ram: '8 GB',
      storage: '50 GB',
      bandwidth: '2 TB'
    }
  },
  {
    _id: 'plan_dedicated_1',
    name: 'Enterprise Bare Metal',
    description: 'Maximum performance and control for demanding applications.',
    priceMonthly: 99.99,
    priceYearly: 999.90,
    features: ['Full Root Access', '500GB NVMe Storage', 'DDoS Protection', 'White-glove Support'],
    type: 'dedicated',
    specs: {
      cpu: '16 Cores',
      ram: '64 GB',
      storage: '500 GB',
      bandwidth: '10 TB'
    }
  }
];

const MOCK_SERVER_STATUS: ServerStatus[] = [
  {
    _id: 'srv_1',
    serviceName: 'US-East Routing',
    region: 'us-east-1',
    status: 'operational',
    uptimePercentage: 99.99,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: 'srv_2',
    serviceName: 'EU-Central Database Clusters',
    region: 'eu-central-1',
    status: 'operational',
    uptimePercentage: 99.95,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: 'srv_3',
    serviceName: 'AP-South Edge Cache',
    region: 'ap-south-1',
    status: 'degraded',
    uptimePercentage: 98.50,
    lastUpdated: new Date().toISOString(),
    incidentMessage: 'Experiencing elevated latency due to upstream provider issues.'
  }
];

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    _id: 'sub_123',
    userId: 'user_1',
    planId: 'plan_vps_1',
    domain: 'myawesomeapp.com',
    status: 'active',
    ipAddress: '192.168.1.100',
    billingCycle: 'monthly',
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// ==========================================
// Mock API Fetch Wrappers
// ==========================================

/**
 * Fetches all available hosting plans.
 */
export async function getHostingPlans(): Promise<ApiResponse<HostingPlan[]>> {
  await delay(600); // Simulate network latency
  return {
    success: true,
    data: MOCK_PLANS
  };
}

/**
 * Fetches the current status of all server regions and services.
 */
export async function getServerStatus(): Promise<ApiResponse<ServerStatus[]>> {
  await delay(400);
  return {
    success: true,
    data: MOCK_SERVER_STATUS
  };
}

/**
 * Fetches active subscriptions for a given user.
 * @param userId The ID of the user.
 */
export async function getUserSubscriptions(userId: string): Promise<ApiResponse<Subscription[]>> {
  await delay(500);
  // In a real app, we would filter by userId. Here we just return the mock.
  return {
    success: true,
    data: MOCK_SUBSCRIPTIONS.filter(sub => sub.userId === userId || userId === 'user_1')
  };
}