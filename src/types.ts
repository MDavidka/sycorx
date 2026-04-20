export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
}

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface HostingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  features: string[];
  specs: {
    vCpu: number;
    ramGb: number;
    storageGb: number;
    bandwidthTb: number;
  };
  isPopular?: boolean;
}

export type InstanceStatus = 'running' | 'stopped' | 'starting' | 'error' | 'pending';

export interface Instance {
  id: string;
  userId: string;
  planId: string;
  name: string;
  ipAddress: string;
  status: InstanceStatus;
  region: string;
  os: string;
  createdAt: string;
  updatedAt: string;
}

export type BillingStatus = 'paid' | 'pending' | 'failed';

export interface BillingRecord {
  id: string;
  userId: string;
  amount: number;
  status: BillingStatus;
  date: string;
  description: string;
  invoiceUrl?: string;
}

export interface InstanceMetric {
  timestamp: string;
  cpuUsagePercent: number;
  ramUsagePercent: number;
  diskUsagePercent: number;
  networkInMbps: number;
  networkOutMbps: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}