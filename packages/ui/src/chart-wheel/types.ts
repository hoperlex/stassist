import type { Angles, Aspect, Bodies, HouseCusp, Points } from '@stassist/shared';

/** Ровно то подмножество `ChartData`, которое нужно для отрисовки колеса — не требует `input`/
 *  `meta` целиком, поэтому годится и для сохранённых карт кабинета, и для обезличенных
 *  `chart_shares.positions` (см. packages/shared/src/schemas/calc.ts `SharePositions`). */
export interface ChartWheelPositions {
  bodies: Bodies;
  points: Points;
  angles: Angles;
  houses: HouseCusp[];
  aspects: Aspect[];
  /** true при `meta.noHouses` (время рождения неизвестно) — дома/угловые линии не рисуются. */
  noHouses?: boolean;
}

export type ChartWheelTheme = 'light' | 'dark';

export interface ChartWheelInput {
  /** Сторона квадратного SVG в px (viewBox тоже строится от него). По умолчанию 480. */
  size?: number;
  theme?: ChartWheelTheme;
  /** Основная карта (натал/карта A синастрии). */
  primary: ChartWheelPositions;
  /** Карта B для биколеса синастрии — планеты рисуются во внешнем кольце теми же домами A. */
  secondary?: ChartWheelPositions;
  /** Межкартовые аспекты (см. astro-core detectSynastryAspects) — рисуются вместе с primary.aspects. */
  crossAspects?: Aspect[];
  /** Заголовок для `<title>`/aria-label (a11y — см. промт Ф3, требование 1). */
  title?: string;
}
