import { ApiResponse } from './types';

/**
 * Formats a number as a currency string.
 * @param amount The number to format.
 * @param currency The currency code (default: USD).
 * @returns Formatted currency string.
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formats an ISO date string into a human-readable format.
 * @param dateString The ISO date string to format.
 * @returns Formatted date string (e.g., "Oct 24, 2023").
 */
export const formatDate = (dateString: string): string => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  } catch (e) {
    return dateString;
  }
};

/**
 * Simple utility for conditionally joining CSS class names.
 * Useful for combining Tailwind classes dynamically.
 * @param classes Array of class names or falsy values.
 * @returns A single space-separated string of valid class names.
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Generates standard headers for API requests.
 * @param token Optional authentication token.
 * @returns HeadersInit object ready for fetch().
 */
export const getStandardHeaders = (token?: string): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Utility to simulate network delay for mock data loading.
 * @param ms Milliseconds to delay.
 * @returns Promise that resolves after the specified delay.
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Wraps mock data in a standard API response format.
 * @param data The data payload.
 * @param success Whether the mock request was successful.
 * @param error Optional error message.
 * @returns Standardized ApiResponse object.
 */
export const createMockResponse = <T>(data: T, success: boolean = true, error?: string): ApiResponse<T> => {
  return {
    success,
    data: success ? data : undefined,
    error: !success ? error : undefined,
  };
};

/**
 * Generates a simple unique ID for mock entities.
 * @returns A random alphanumeric string.
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};