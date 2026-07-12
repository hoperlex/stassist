import type { ChartWheelTheme } from './types.js';

export interface ChartWheelPalette {
  background: string;
  ringStroke: string;
  textPrimary: string;
  textSecondary: string;
  signBand: Record<'fire' | 'earth' | 'air' | 'water', string>;
  angleLine: string;
  houseLine: string;
  planetPrimary: string;
  planetSecondary: string;
  aspectHard: string;
  aspectSoft: string;
  aspectNeutral: string;
  aspectMinor: string;
}

const LIGHT: ChartWheelPalette = {
  background: '#ffffff',
  ringStroke: '#c9c2d8',
  textPrimary: '#2a2440',
  textSecondary: '#6b6280',
  signBand: { fire: '#fde3d8', earth: '#e3ecd8', air: '#e3eaf8', water: '#dbeafb' },
  angleLine: '#4a3f6b',
  houseLine: '#c9c2d8',
  planetPrimary: '#3a2f5c',
  planetSecondary: '#b5622a',
  aspectHard: '#c0392b',
  aspectSoft: '#2565c7',
  aspectNeutral: '#7a7290',
  aspectMinor: '#9b8fb5',
};

const DARK: ChartWheelPalette = {
  background: '#1a1730',
  ringStroke: '#4a4368',
  textPrimary: '#ece8fa',
  textSecondary: '#b4abd1',
  signBand: { fire: '#3d2a2c', earth: '#2a3324', water: '#1f3040', air: '#242b40' },
  angleLine: '#d8d0f5',
  houseLine: '#4a4368',
  planetPrimary: '#e8e2ff',
  planetSecondary: '#f0a868',
  aspectHard: '#ff6b5b',
  aspectSoft: '#6fa8ff',
  aspectNeutral: '#a89dcf',
  aspectMinor: '#8579a8',
};

export function paletteFor(theme: ChartWheelTheme | undefined): ChartWheelPalette {
  return theme === 'dark' ? DARK : LIGHT;
}
