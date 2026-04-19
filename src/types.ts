export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    discord: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface HostingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  badge?: string;
}

export type ServerStatus = 'running' | 'stopped' | 'starting' | 'error' | 'maintenance';

export interface ServerInstance {
  id: string;
  name: string;
  status: ServerStatus;
  ipAddress: string;
  region: string;
  planId: string;
  uptime: number; // Represented as a percentage (e.g., 99.99)
  cpuUsage: number; // Represented as a percentage (0-100)
  ramUsage: number; // Represented as a percentage (0-100)
  diskUsage: number; // Represented as a percentage (0-100)
  createdAt: string; // ISO 8601 date string
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
}

export type DomainStatus = 'active' | 'expired' | 'pending' | 'transferring';

export interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  autoRenew: boolean;
  expiresAt: string; // ISO 8601 date string
}

export type TicketStatus = 'open' | 'closed' | 'pending_user' | 'investigating';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface SupportTicket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}