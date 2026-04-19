/**
 * Shared TypeScript interfaces and types for the Nivle Hosting platform.
 */

// ==========================================
// Site Configuration Types
// ==========================================

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
}

// ==========================================
// Domain Models (Database Entities)
// ==========================================

export type PlanType = 'shared' | 'vps' | 'dedicated' | 'cloud';

export interface HostingPlan {
  _id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  type: PlanType;
  isPopular?: boolean;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
}

export type ServerState = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface ServerStatus {
  _id: string;
  serviceName: string;
  region: string;
  status: ServerState;
  uptimePercentage: number;
  lastUpdated: string; // ISO Date string
  incidentMessage?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string; // ISO Date string
}

export type SubscriptionStatus = 'active' | 'pending' | 'suspended' | 'cancelled';

export interface Subscription {
  _id: string;
  userId: string;
  planId: string;
  domain: string;
  status: SubscriptionStatus;
  ipAddress?: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string; // ISO Date string
  createdAt: string; // ISO Date string
}

// ==========================================
// Component Prop Types
// ==========================================

export interface PlanCardProps {
  plan: HostingPlan;
  onSelect?: (plan: HostingPlan) => void;
  billingCycle?: 'monthly' | 'yearly';
}

export interface StatusTableProps {
  servers: ServerStatus[];
  isLoading?: boolean;
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}