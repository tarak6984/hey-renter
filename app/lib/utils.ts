import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names with conflict resolution.
 * Uses clsx for conditional classes and tailwind-merge to avoid duplicates.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as AED currency string.
 */
export function formatAED(amount: number): string {
  return `AED ${amount.toLocaleString()}`;
}

/**
 * Formats a date to a human-readable string.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Generates a random booking ID string.
 */
export function generateBookingId(): string {
  return `#${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
}

/**
 * Truncates text to a given character limit with ellipsis.
 */
export function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + '…';
}

/**
 * Returns an array of calendar days for a given month/year,
 * padded with nulls to align to Sunday-start week grid.
 */
export function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

/**
 * Month names array.
 */
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
