import type { HostingPlan, ServerInstance, Domain, SupportTicket } from './types';
import { delay } from './utils';

/**
 * DATABASE CONNECTION FLAG
 * 
 * Since no database integration is currently connected, this flag is set to false.
 * UI components should import this flag and render a shadcn/ui banner or dialog
 * prompting the user to connect a database from the Integrations tab.
 */
export const IS_DB_CONNECTED = false;

// ============================================================================
// STATIC PLACEHOLDER DATA
// ============================================================================
// The following mock data is used to keep the UI functional and demonstrate
// the layout until a real database integration is connected.

export const MOCK_HOSTING_PLANS: HostingPlan[] = [
  {
    id: "plan_shared_01",
    name: "Starter Web",
    description: "Perfect for personal blogs and small portfolio sites.",
    monthlyPrice: 4.99,
    annualPrice: 49.90,
    features: [
      "1 Website",
      "10 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "Daily Backups"
    ],
    ctaText: "Start Building",
  },
  {
    id: "plan_vps_01",
    name: "Pro VPS",
    description: "Dedicated resources for growing businesses and applications.",
    monthlyPrice: 19.99,
    annualPrice: 199.90,
    features: [
      "Unlimited Websites",
      "50 GB NVMe Storage",
      "2 vCPU Cores",
      "4 GB RAM",
      "Root Access"
    ],
    highlighted: true,
    badge: "Most Popular",
    ctaText: "Deploy VPS",
  },
  {
    id: "plan_dedi_01",
    name: "Enterprise Bare Metal",
    description: "Maximum performance and control for mission-critical workloads.",
    monthlyPrice: 99.99,
    annualPrice: 999.90,
    features: [
      "Intel Xeon E-2274G",
      "32 GB DDR4 ECC RAM",
      "2x 500 GB NVMe (RAID 1)",
      "10 Gbps Network Port",
      "24/7 Priority Support"
    ],
    ctaText: "Contact Sales",
  }
];

export const MOCK_SERVER_INSTANCES: ServerInstance[] = [
  {
    id: "srv_9f8a7b6c",
    name: "prod-web-cluster-01",
    status: "running",
    ipAddress: "192.168.1.105",
    region: "us-east-1",
    planId: "plan_vps_01",
    uptime: 99.99,
    cpuUsage: 42.5,
    ramUsage: 68.2,
    diskUsage: 34.1,
    createdAt: "2023-10-15T08:30:00Z"
  },
  {
    id: "srv_3d2e1f0a",
    name: "dev-db-replica",
    status: "stopped",
    ipAddress: "10.0.0.42",
    region: "eu-central-1",
    planId: "plan_shared_01",
    uptime: 0,
    cpuUsage: 0,
    ramUsage: 0,
    diskUsage: 85.0,
    createdAt: "2023-11-02T14:15:00Z"
  },
  {
    id: "srv_5a4b3c2d",
    name: "analytics-worker",
    status: "starting",
    ipAddress: "172.16.0.10",
    region: "ap-southeast-1",
    planId: "plan_vps_01",
    uptime: 100,
    cpuUsage: 95.5,
    ramUsage: 45.0,
    diskUsage: 12.5,
    createdAt: "2024-01-20T09:00:00Z"
  }
];

export const MOCK_DOMAINS: Domain[] = [
  {
    id: "dom_1a2b3c",
    name: "acmecorp-hosting.com",
    status: "active",
    autoRenew: true,
    expiresAt: "2025-10-15T00:00:00Z"
  },
  {
    id: "dom_4d5e6f",
    name: "my-awesome-startup.io",
    status: "pending",
    autoRenew: false,
    expiresAt: "2024-12-01T00:00:00Z"
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "tkt_889900",
    subject: "SSL Certificate Renewal Failing",
    status: "investigating",
    priority: "high",
    createdAt: "2024-04-18T10:23:00Z",
    updatedAt: "2024-04-19T08:15:00Z"
  },
  {
    id: "tkt_112233",
    subject: "Question about VPS upgrade path",
    status: "closed",
    priority: "low",
    createdAt: "2024-03-10T14:00:00Z",
    updatedAt: "2024-03-11T09:30:00Z"
  }
];

// ============================================================================
// DATA ACCESS WRAPPERS (Stubs)
// ============================================================================
// These functions simulate database queries. Once a real database is connected,
// replace the internals of these functions with actual fetch() calls to your API.

export async function getHostingPlans(): Promise<HostingPlan[]> {
  await delay(400); // Simulate network latency
  return MOCK_HOSTING_PLANS;
}

export async function getServerInstances(): Promise<ServerInstance[]> {
  await delay(600);
  return MOCK_SERVER_INSTANCES;
}

export async function getDomains(): Promise<Domain[]> {
  await delay(500);
  return MOCK_DOMAINS;
}

export async function getSupportTickets(): Promise<SupportTicket[]> {
  await delay(700);
  return MOCK_TICKETS;
}

export async function getServerInstanceById(id: string): Promise<ServerInstance | null> {
  await delay(300);
  return MOCK_SERVER_INSTANCES.find(srv => srv.id === id) || null;
}