import type { MatrixOctagramTheme } from './types.js';

export interface MatrixOctagramPalette {
  background: string;
  squareA: string;
  squareB: string;
  spoke: string;
  relationshipLine: string;
  moneyLine: string;
  nodeFill: string;
  centerFill: string;
  nodeStroke: string;
  nodeText: string;
  textSecondary: string;
}

const LIGHT: MatrixOctagramPalette = {
  background: '#ffffff',
  squareA: '#4a3f6b',
  squareB: '#b5622a',
  spoke: '#c9c2d8',
  relationshipLine: '#c0392b',
  moneyLine: '#1f8a4c',
  nodeFill: '#f3f0fb',
  centerFill: '#e8dff5',
  nodeStroke: '#4a3f6b',
  nodeText: '#2a2440',
  textSecondary: '#6b6280',
};

const DARK: MatrixOctagramPalette = {
  background: '#1a1730',
  squareA: '#d8d0f5',
  squareB: '#f0a868',
  spoke: '#4a4368',
  relationshipLine: '#ff6b5b',
  moneyLine: '#5fd68f',
  nodeFill: '#2a2547',
  centerFill: '#352d5c',
  nodeStroke: '#d8d0f5',
  nodeText: '#ece8fa',
  textSecondary: '#b4abd1',
};

export function paletteFor(theme: MatrixOctagramTheme | undefined): MatrixOctagramPalette {
  return theme === 'dark' ? DARK : LIGHT;
}
