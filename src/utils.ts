import { ServerState } from './types';

/**
 * Formats a numeric amount into a localized currency string.
 * @param amount The amount to format.
 * @param currency The currency code (default: 'USD').
 * @returns Formatted currency string (e.g., "$10.00").
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string into a readable format.
 * @param dateString The ISO date string.
 * @returns Formatted date string (e.g., "Jan 1, 2024").
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Check for invalid dates
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Formats an ISO date string into a detailed readable format including time.
 * @param dateString The ISO date string.
 * @returns Formatted date and time string (e.g., "Jan 1, 2024, 12:00 PM").
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Maps a ServerState to a HeroUI color variant for Chips/Badges.
 * @param status The server state.
 * @returns A valid HeroUI color string.
 */
export function getStatusColor(status: ServerState): "success" | "warning" | "danger" | "default" {
  switch (status) {
    case 'operational':
      return 'success';
    case 'degraded':
      return 'warning';
    case 'outage':
      return 'danger';
    case 'maintenance':
      return 'default';
    default:
      return 'default';
  }
}

/**
 * Formats an uptime percentage to a standard string.
 * @param percentage The uptime percentage (e.g., 99.99).
 * @returns Formatted string (e.g., "99.99%").
 */
export function formatUptime(percentage: number): string {
  // Ensure we don't show more than 2 decimal places, but drop trailing zeros if exact
  return `${Number(percentage.toFixed(2))}%`;
}

/**
 * Delays execution for a given number of milliseconds (useful for simulating network latency).
 * @param ms Milliseconds to wait.
 * @returns A promise that resolves after the specified delay.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}