import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges tailwind classes safely, resolving conflicts.
 * This is a core utility required by shadcn/ui components.
 * 
 * @param inputs - An array of class values (strings, objects, arrays)
 * @returns A merged string of tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string or Date object into a human-readable format.
 * 
 * @param dateString - The date to format
 * @param includeTime - Whether to include the time in the output
 * @returns Formatted date string (e.g., "January 1, 2024")
 */
export function formatDate(dateString: string | Date, includeTime: boolean = false): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Generates a random alphanumeric ID.
 * Useful for generating unique keys for React lists or mock data IDs.
 * 
 * @param length - The length of the generated ID (default: 8)
 * @returns A random string
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Simulates a network delay. 
 * Useful for mock async operations like form submissions.
 * 
 * @param ms - Milliseconds to delay
 * @returns A promise that resolves after the specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validates an email address format using a standard regex.
 * 
 * @param email - The email string to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}