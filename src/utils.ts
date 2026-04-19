import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ServerStatus, DomainStatus, TicketStatus, TicketPriority } from "./types";

/**
 * Combines multiple class names into a single string, merging Tailwind classes intelligently.
 * This is the standard utility used by shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as a currency string (e.g., $19.99).
 */
export function formatCurrency(amount: number, currency: string = "USD", locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string into a human-readable date (e.g., Oct 24, 2023).
 */
export function formatDate(dateString: string, includeTime: boolean = false): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime && {
      hour: "numeric",
      minute: "2-digit",
    }),
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Formats a number as a percentage string (e.g., 99.9%).
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Returns appropriate Tailwind utility classes for a given ServerStatus.
 */
export function getServerStatusColor(status: ServerStatus): string {
  switch (status) {
    case "running":
      return "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20";
    case "stopped":
      return "bg-muted text-muted-foreground border-border";
    case "starting":
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "error":
      return "bg-destructive/15 text-destructive border-destructive/20";
    case "maintenance":
      return "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

/**
 * Returns appropriate Tailwind utility classes for a given DomainStatus.
 */
export function getDomainStatusColor(status: DomainStatus): string {
  switch (status) {
    case "active":
      return "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20";
    case "expired":
      return "bg-destructive/15 text-destructive border-destructive/20";
    case "pending":
      return "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    case "transferring":
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

/**
 * Returns appropriate Tailwind utility classes for a given TicketStatus.
 */
export function getTicketStatusColor(status: TicketStatus): string {
  switch (status) {
    case "open":
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "closed":
      return "bg-muted text-muted-foreground border-border";
    case "pending_user":
      return "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    case "investigating":
      return "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

/**
 * Returns appropriate Tailwind utility classes for a given TicketPriority.
 */
export function getTicketPriorityColor(priority: TicketPriority): string {
  switch (priority) {
    case "low":
      return "text-muted-foreground";
    case "medium":
      return "text-blue-500";
    case "high":
      return "text-orange-500";
    case "critical":
      return "text-destructive font-semibold";
    default:
      return "text-muted-foreground";
  }
}

/**
 * Generates a random alphanumeric ID (useful for mock data generation).
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Simulates a network delay (useful for mock async operations).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}