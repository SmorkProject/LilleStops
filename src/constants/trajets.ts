import { TrajetInfo } from '../types';

export const TRAJET_PRESETS: Omit<TrajetInfo, 'id' | 'name'>[] = [
  { emoji: "🔴", color: "#e2001a" },
  { emoji: "🔵", color: "#3b82f6" },
  { emoji: "🟢", color: "#22c55e" },
  { emoji: "🟡", color: "#eab308" },
  { emoji: "🟣", color: "#a855f7" },
  { emoji: "🟠", color: "#f97316" },
];

export const COLOR_NAMES: { [key: string]: string } = {
  "#e2001a": "red",
  "#3b82f6": "blue",
  "#22c55e": "green",
  "#eab308": "yellow",
  "#a855f7": "purple",
  "#f97316": "orange",
};
