import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string.
 *
 * This function merges class names using `clsx` and `twMerge` utilities.
 * It takes any number of class values as arguments and returns a single
 * string with all the class names combined.
 *
 * @param inputs - The class values to be combined.
 * @returns      The combined class names.
 */
export const combineClasses = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Checks if the given value is a non-empty string that is not just whitespace.
 *
 * @param value - The value to check.
 * @returns     True if the value is a non-empty string and not just whitespace, false otherwise.
 */
export const isNonEmptyStringAndNotWhitespace = (
  value: unknown
): value is string => typeof value === 'string' && value.trim().length > 0;

/**
 * Checks if a number falls within a specified range.
 *
 * @param value - The number to check
 * @param start - The start of the range (inclusive)
 * @param end   - The end of the range (exclusive)
 * @returns     Whether the value is within the range
 */
export const inRange = (value: number, start: number, end: number): boolean => {
  return value >= start && value < end;
};
