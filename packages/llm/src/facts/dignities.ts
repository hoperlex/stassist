/**
 * Классические эссенциальные достоинства (обитель/экзальтация/изгнание/падение) — стандартная
 * общественная эллинистическо-птолемеевская таблица (не защищённый копирайтом факт метода,
 * используется повсеместно в астрологии). `astro-core` их не считает (см. находку в отчёте
 * исследования astro-core-агента: `ChartData` не содержит поля `dignities`) — считает сериализатор
 * (`src/facts/serializer.ts`) поверх `bodies[*].signIndex`. Действует только для 7 классических
 * планет (Солнце..Сатурн) — у внешних планет (Уран/Нептун/Плутон) традиционная таблица
 * достоинств не определена (современные атрибуции спорны между школами), поэтому для них
 * `dignityOf` возвращает `null` — не выдумываем.
 */
import type { ClassicalPlanetSlug } from './keys.js';
import type { ZodiacSignEnSlug } from '@stassist/shared';

export type DignityKind = 'rulership' | 'exaltation' | 'detriment' | 'fall';

interface DignityRow {
  rulership: ZodiacSignEnSlug[];
  exaltation: ZodiacSignEnSlug | null;
  detriment: ZodiacSignEnSlug[];
  fall: ZodiacSignEnSlug | null;
}

const DIGNITY_TABLE: Partial<Record<ClassicalPlanetSlug, DignityRow>> = {
  sun: { rulership: ['leo'], exaltation: 'aries', detriment: ['aquarius'], fall: 'libra' },
  moon: { rulership: ['cancer'], exaltation: 'taurus', detriment: ['capricorn'], fall: 'scorpio' },
  mercury: {
    rulership: ['gemini', 'virgo'],
    exaltation: 'virgo',
    detriment: ['sagittarius', 'pisces'],
    fall: 'pisces',
  },
  venus: {
    rulership: ['taurus', 'libra'],
    exaltation: 'pisces',
    detriment: ['aries', 'scorpio'],
    fall: 'virgo',
  },
  mars: {
    rulership: ['aries', 'scorpio'],
    exaltation: 'capricorn',
    detriment: ['taurus', 'libra'],
    fall: 'cancer',
  },
  jupiter: {
    rulership: ['sagittarius', 'pisces'],
    exaltation: 'cancer',
    detriment: ['gemini', 'virgo'],
    fall: 'capricorn',
  },
  saturn: {
    rulership: ['capricorn', 'aquarius'],
    exaltation: 'libra',
    detriment: ['cancer', 'leo'],
    fall: 'aries',
  },
};

export const DIGNITY_LABEL_RU: Record<DignityKind, string> = {
  rulership: 'в своей обители',
  exaltation: 'в экзальтации',
  detriment: 'в изгнании',
  fall: 'в падении',
};

export function dignityOf(planet: ClassicalPlanetSlug, sign: ZodiacSignEnSlug): DignityKind | null {
  const row = DIGNITY_TABLE[planet];
  if (!row) return null;
  if (row.rulership.includes(sign)) return 'rulership';
  if (row.exaltation === sign) return 'exaltation';
  if (row.detriment.includes(sign)) return 'detriment';
  if (row.fall === sign) return 'fall';
  return null;
}
