import { 
  HostingPlan, 
  Instance, 
  User, 
  BillingRecord, 
  ApiResponse 
} from './types';
import { delay } from './utils';

/**
 * DATABASE CONNECTION FLAG
 * Currently set to false as no database integration is connected.
 * UI components should use this flag to display a "Connect Database" banner/modal.
 */
export const IS_DB_CONNECTED = false;

// ============================================================================
// MOCK DATA
// Used to populate the UI while the database is disconnected.
// ============================================================================

const MOCK_USER: User = {
  id: "usr_mock_123",
  name: "Demo User",
  email: "demo@modernhosting.com",
  role: "admin",
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
};

const MOCK_PLANS: HostingPlan[] = [
  {
    id: "plan_vps_basic",
    name: "Starter VPS",
    description: "Perfect for small projects and personal websites.",
    priceMonthly: 5.00,
    features: ["1 IPv4 Address", "DDoS Protection", "24/7 Support", "99.9% Uptime"],
    specs: { vCpu: 1, ramGb: 1, storageGb: 25, bandwidthTb: 1 },
  },
  {
    id: "plan_vps_pro",
    name: "Pro VPS",
    description: "More power for growing applications and businesses.",
    priceMonthly: 15.00,
    features: ["1 IPv4 Address", "DDoS Protection", "Priority Support", "Automated Backups"],
    specs: { vCpu: 2, ramGb: 4, storageGb: 80, bandwidthTb: 3 },
    isPopular: true,
  },
  {
    id: "plan_dedicated",
    name: "Dedicated Cloud",
    description: "Bare-metal performance with cloud flexibility.",
    priceMonthly: 60.00,
    features: ["Dedicated IP", "Advanced DDoS Protection", "White-glove Support", "Custom OS Images"],
    specs: { vCpu: 8, ramGb: 32, storageGb: 500, bandwidthTb: 10 },
  }
];

const MOCK_INSTANCES: Instance[] = [
  {
    id: "inst_prod_01",
    userId: "usr_mock_123",
    planId: "plan_vps_pro",
    name: "web-production-01",
    ipAddress: "192.168.1.105",
    status: "running",
    region: "us-east-1",
    os: "Ubuntu 22.04 LTS",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "inst_db_01",
    userId: "usr_mock_123",
    planId: "plan_dedicated",
    name: "database-cluster-primary",
    ipAddress: "192.168.1.106",
    status: "running",
    region: "us-east-1",
    os: "Debian 12",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "inst_test_01",
    userId: "usr_mock_123",
    planId: "plan_vps_basic",
    name: "staging-environment",
    ipAddress: "10.0.0.42",
    status: "stopped",
    region: "eu-central-1",
    os: "Alpine Linux",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const MOCK_BILLING: BillingRecord[] = [
  {
    id: "inv_001",
    userId: "usr_mock_123",
    amount: 80.00,
    status: "paid",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Monthly Hosting Services (October)",
  },
  {
    id: "inv_002",
    userId: "usr_mock_123",
    amount: 80.00,
    status: "paid",
    date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Monthly Hosting Services (September)",
  }
];

// ============================================================================
// MOCK API WRAPPERS
// These functions simulate database calls. Once a database is connected,
// these can be replaced with actual fetch() calls to the MongoDB Data API.
// ============================================================================

export async function getUser(userId: string): Promise<ApiResponse<User>> {
  await delay(600);
  if (!IS_DB_CONNECTED) {
    return { data: MOCK_USER, status: 200 };
  }
  return { error: "Database not connected", status: 503 };
}

export async function getHostingPlans(): Promise<ApiResponse<HostingPlan[]>> {
  await delay(400);
  if (!IS_DB_CONNECTED) {
    return { data: MOCK_PLANS, status: 200 };
  }
  return { error: "Database not connected", status: 503 };
}

export async function getInstances(userId: string): Promise<ApiResponse<Instance[]>> {
  await delay(800);
  if (!IS_DB_CONNECTED) {
    // Return mock instances for the demo user
    return { data: MOCK_INSTANCES, status: 200 };
  }
  return { error: "Database not connected", status: 503 };
}

export async function getInstanceById(instanceId: string): Promise<ApiResponse<Instance>> {
  await delay(500);
  if (!IS_DB_CONNECTED) {
    const instance = MOCK_INSTANCES.find(i => i.id === instanceId);
    if (instance) {
      return { data: instance, status: 200 };
    }
    return { error: "Instance not found", status: 404 };
  }
  return { error: "Database not connected", status: 503 };
}

export async function getBillingRecords(userId: string): Promise<ApiResponse<BillingRecord[]>> {
  await delay(700);
  if (!IS_DB_CONNECTED) {
    return { data: MOCK_BILLING, status: 200 };
  }
  return { error: "Database not connected", status: 503 };
}

/**
 * Simulates an instance state change (e.g., start, stop, restart)
 */
export async function updateInstanceStatus(instanceId: string, newStatus: Instance['status']): Promise<ApiResponse<Instance>> {
  await delay(1200);
  if (!IS_DB_CONNECTED) {
    const instance = MOCK_INSTANCES.find(i => i.id === instanceId);
    if (instance) {
      const updatedInstance = { ...instance, status: newStatus, updatedAt: new Date().toISOString() };
      return { data: updatedInstance, status: 200 };
    }
    return { error: "Instance not found", status: 404 };
  }
  return { error: "Database not connected", status: 503 };
}