import type { AspectAngleName } from '@stassist/shared';

export const ASPECT_ANGLE_DEG: Record<AspectAngleName, number> = {
  conjunction: 0,
  semisextile: 30,
  semisquare: 45,
  sextile: 60,
  quintile: 72,
  square: 90,
  trine: 120,
  sesquiquadrate: 135,
  biquintile: 144,
  quincunx: 150,
  opposition: 180,
};

export const MAJOR_ASPECTS: readonly AspectAngleName[] = [
  'conjunction',
  'sextile',
  'square',
  'trine',
  'opposition',
];

export const MINOR_ASPECTS: readonly AspectAngleName[] = [
  'semisextile',
  'semisquare',
  'quintile',
  'sesquiquadrate',
  'biquintile',
  'quincunx',
];

/** Орбисы по умолчанию (градусы) — типовой западный пресет средней школы. */
export const DEFAULT_ORB_BY_ASPECT: Record<AspectAngleName, number> = {
  conjunction: 8,
  opposition: 8,
  trine: 8,
  square: 7,
  sextile: 6,
  semisextile: 2,
  semisquare: 2,
  sesquiquadrate: 2,
  quincunx: 3,
  quintile: 2,
  biquintile: 2,
};

/** Более узкие орбисы для второстепенных точек (узлы, Лилит, Селена, Хирон, арабские части). */
export const DEFAULT_ORB_BY_BODY: Record<string, number> = {
  meanNode: 3,
  trueNode: 3,
  meanLilith: 2,
  selena: 2,
  chiron: 3,
  fortuna: 1,
};
