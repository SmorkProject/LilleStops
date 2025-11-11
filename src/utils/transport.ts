import { LINE_COLORS } from '../constants';

/**
 * Get the style configuration for a specific transit line
 * @param line The line code (e.g., "M1", "L2", "C8")
 * @returns Object containing background color and text color
 */
export const getLineStyle = (line: string): { bg: string; text: string } => {
  return LINE_COLORS[line] || LINE_COLORS['default'];
};

/**
 * Find an item by ID in a list
 * @param list Array of objects with an id property
 * @param targetId The ID to search for
 * @returns The found item or undefined
 */
export const getById = <T extends { id: string }>(
  list: T[],
  targetId: string
): T | undefined => {
  return list.find((item) => item.id === targetId);
};
