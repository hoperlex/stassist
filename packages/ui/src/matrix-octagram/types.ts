import type { MatrixOfDestinyCorePoints } from '@stassist/numerology-core';

export type MatrixOctagramTheme = 'light' | 'dark';

export interface MatrixOctagramInput {
  size?: number;
  theme?: MatrixOctagramTheme;
  corePoints: MatrixOfDestinyCorePoints;
  title?: string;
}
