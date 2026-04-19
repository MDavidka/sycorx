import { TicketStatus, TicketPriority, ActiveService } from './types';

/**
 * Formats a numeric amount into a localized currency string.
 * @param amount - The number to format
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string (e.g., "$10.00")
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a date string or Date object into a readable date string.
 * @param dateInput - ISO date string or Date object
 * @returns Formatted date string (e.g., "Oct 24, 2023")
 */
export function formatDate(dateInput: string | Date): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Formats a date string or Date object into a readable date and time string.
 * @param dateInput - ISO date string or Date object
 * @returns Formatted date and time string (e.g., "Oct 24, 2023, 14:30")
 */
export function formatDateTime(dateInput: string | Date): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Calculates the number of days remaining until a target date.
 * Useful for displaying "Next Billing Date" countdowns.
 * @param targetDate - ISO date string or Date object
 * @returns Number of days (can be negative if in the past)
 */
export function calculateDaysUntil(targetDate: string | Date): number {
  if (!targetDate) return 0;
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Valid color props for HeroUI Chip/Badge components.
 */
export type HeroUIStatusColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

/**
 * Maps various domain statuses (Service, Ticket, Priority) to HeroUI color variants.
 * @param status - The status string to evaluate
 * @returns A valid HeroUI color string
 */
export function getStatusColor(status: ActiveService['status'] | TicketStatus | TicketPriority | string): HeroUIStatusColor {
  const normalized = status.toLowerCase();
  
  switch (normalized) {
    // Success states
    case 'active':
    case 'resolved':
      return 'success';
      
    // Warning states
    case 'pending':
    case 'in progress':
    case 'medium':
      return 'warning';
      
    // Danger/Critical states
    case 'suspended':
    case 'cancelled':
    case 'critical':
      return 'danger';
      
    // Primary/Actionable states
    case 'open':
    case 'high':
      return 'primary';
      
    // Default/Neutral states
    case 'closed':
    case 'low':
    default:
      return 'default';
  }
}

/**
 * Simple utility for conditionally joining class names, 
 * acting as a lightweight alternative to clsx/tailwind-merge.
 * @param classes - Array of class strings or falsy values
 * @returns Joined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generates a simple random ID for optimistic UI updates.
 * Note: Not for secure cryptographic use.
 * @returns A random alphanumeric string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}