import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { InstanceStatus } from "./types";

/**
 * Merges Tailwind CSS classes safely.
 * Used extensively by shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as a USD currency string.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string into a human-readable format.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/**
 * Formats bytes into a human-readable string (KB, MB, GB, TB).
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Formats a decimal or whole number as a percentage.
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Returns appropriate Tailwind color classes based on an instance's status.
 */
export function getStatusColor(status: InstanceStatus): string {
  switch (status) {
    case "running":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "stopped":
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    case "starting":
    case "pending":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "error":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
}

/**
 * Generates a simple unique ID for optimistic UI updates.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * A simple delay function for simulating network latency or polling.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}