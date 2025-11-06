import { LINE_COLORS } from "./types";

/**
 * Get the line color in HEX (#....)
 * @param lineCode the name of the line
 * @returns the line color ins HEX (#....)
 */
export default (lineCode: string) => {
  let upperLineCode = lineCode.toUpperCase();
  let style         = LINE_COLORS[upperLineCode] || LINE_COLORS['default'];
  let isCircle      = ['M1', 'M2', 'B1'].includes(upperLineCode);
  
  return { ...style, isCircle };
};