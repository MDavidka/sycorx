/**
 * Shared TypeScript interfaces and types for the Nivle Hosting platform.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
}

export type PlanType = 'shared' | 'vps' | 'dedicated';
export type BillingCycle = 'monthly' | 'yearly';

export interface HostingPlan {
  _id?: string;
  name: string;
  type: PlanType;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
  description: string;
  isPopular?: boolean;
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
}

export type UserRole = 'admin' | 'customer';

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export type ServiceStatus = 'active' | 'suspended' | 'pending' | 'cancelled';

export interface ActiveService {
  _id?: string;
  userId: string;
  planId: string;
  planName: string; // Denormalized for easier display
  domain?: string;
  ipAddress?: string;
  status: ServiceStatus;
  startDate: string;
  renewalDate: string;
}

export type TicketStatus = 'open' | 'in-progress' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Ticket {
  _id?: string;
  userId: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}

export interface TicketReply {
  _id?: string;
  ticketId: string;
  userId: string;
  message: string;
  isAdminReply: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}