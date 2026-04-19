export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    twitter?: string;
    github?: string;
    support?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  requiresAuth?: boolean;
}

export type PlanType = 'Shared' | 'VPS' | 'Dedicated';

export interface HostingPlan {
  _id?: string;
  id: string;
  name: string;
  type: PlanType;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  isPopular?: boolean;
}

export interface ActiveService {
  id: string;
  planId: string;
  planName: string;
  status: 'Active' | 'Suspended' | 'Pending' | 'Cancelled';
  ipAddress?: string;
  domain?: string;
  billingCycle: 'Monthly' | 'Yearly';
  nextBillingDate: string;
  createdAt: string;
}

export interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'Customer' | 'Admin';
  joinedAt: string;
  activeServices: ActiveService[];
}

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  isAdmin: boolean;
  content: string;
  createdAt: string;
}

export interface Ticket {
  _id?: string;
  id: string;
  userId: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  relatedServiceId?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface DatabaseResponse<T> {
  documents?: T[];
  document?: T;
  insertedId?: string;
  matchedCount?: number;
  modifiedCount?: number;
  deletedCount?: number;
  error?: string;
}