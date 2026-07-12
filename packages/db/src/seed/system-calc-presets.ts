/**
 * Системные расчётные пресеты (`calc_presets.user_id = null`) — оффлайн seed-data-step
 * (см. §4 конвенций реализации, docs/roadmap/31-конвенции-реализации.md). Единственный источник
 * правды для значений bodies/orbs — тот же, что использует сам astro-core по умолчанию
 * (`DEFAULT_ORB_BY_ASPECT`/`DEFAULT_ORB_BY_BODY` из `@stassist/astro-core`), чтобы «пресет по
 * умолчанию» в БД и «пресет по умолчанию» ядра (`calcPresetSchema` в `@stassist/shared`, когда
 * `orbs`/`bodies` не заданы явно) буквально совпадали — явные значения здесь просто материализуют
 * то, что иначе действовало бы неявно (см. `packages/astro-core/src/aspects/index.ts:resolveOrb`).
 *
 * Границы MVP (docs/architecture/20-архитектура-услуг.md §«Границы MVP», M0, M5) требуют минимум
 * двух системных пресетов: «Современная западная» (по умолчанию) и «Классическая». «Джйотиш» и
 * «Школа Глобы» — версии 1.x/2+, не сеются в Ф2.
 *
 * `tools/seed-calc-presets.ts` читает эти константы и (а) генерирует committed SQL-сид
 * `drizzle/seed/0001_system_calc_presets.sql`, (б) может применить их к живой БД (data-step,
 * НЕ часть build/CI-гейта, см. §1/§4 конвенций).
 */
import {
  ASPECT_ANGLE_DEG,
  DEFAULT_ORB_BY_ASPECT,
  DEFAULT_ORB_BY_BODY,
} from '@stassist/astro-core';
import type { Ayanamsha, BodySet, HouseSystem, OrbsConfig, ZodiacType, AspectSet } from '@stassist/shared';

export interface SystemCalcPresetSeed {
  /** Стабильный человекочитаемый код — используется как идемпотентный ключ ON CONFLICT сида. */
  code: string;
  name: string;
  zodiac: ZodiacType;
  ayanamsha: Ayanamsha | null;
  houseSystem: HouseSystem;
  bodies: BodySet;
  orbs: OrbsConfig;
  aspectSet: AspectSet;
}

/** Только мажорные аспекты — используются классическим пресетом (aspectSet='major'). */
const MAJOR_ASPECT_NAMES = ['conjunction', 'opposition', 'trine', 'square', 'sextile'] as const;

/**
 * Классические (традиционные) орбисы для 5 птолемеевских аспектов — источник: широко цитируемая
 * астрологическая традиция (напр. У. Лилли, «Christian Astrology»), НЕ сверено нами первично
 * (§8 конвенций: агент не фабрикует внешние факты сверх разумного дефолта) — помечено как
 * «требует сверки» перед продакшен-показом (см. отчёт фазы).
 */
const CLASSICAL_ORB_BY_ASPECT: Partial<Record<(typeof MAJOR_ASPECT_NAMES)[number], number>> = {
  conjunction: 10,
  opposition: 10,
  trine: 8,
  square: 8,
  sextile: 6,
};

// Самопроверка на этапе загрузки модуля: пресет 'classical' обязан задавать орбис ровно для
// всех 5 птолемеевских аспектов (aspectSet='major') — ни одного не забыть, ничего лишнего.
if (MAJOR_ASPECT_NAMES.some((name) => CLASSICAL_ORB_BY_ASPECT[name] === undefined)) {
  throw new Error('CLASSICAL_ORB_BY_ASPECT: не хватает орбиса для одного из мажорных аспектов');
}

function fullDefaultOrbByAspect(): Record<string, number> {
  // Материализуем ВСЕ известные ключи ASPECT_ANGLE_DEG в тот же объект — явный дамп дефолта
  // ядра, а не его частичное дублирование.
  const result: Record<string, number> = {};
  for (const key of Object.keys(ASPECT_ANGLE_DEG)) {
    result[key] = DEFAULT_ORB_BY_ASPECT[key as keyof typeof DEFAULT_ORB_BY_ASPECT];
  }
  return result;
}

export const SYSTEM_CALC_PRESETS: readonly SystemCalcPresetSeed[] = [
  {
    code: 'modern_western',
    name: 'Современная западная',
    zodiac: 'tropical',
    ayanamsha: null,
    houseSystem: 'placidus',
    bodies: { trueNode: false, trueLilith: false, selena: true, chiron: true },
    orbs: {
      byAspect: fullDefaultOrbByAspect(),
      byBody: { ...DEFAULT_ORB_BY_BODY },
    },
    aspectSet: 'major_minor',
  },
  {
    code: 'classical',
    name: 'Классическая',
    zodiac: 'tropical',
    ayanamsha: null,
    houseSystem: 'whole_sign',
    bodies: { trueNode: false, trueLilith: false, selena: false, chiron: false },
    orbs: {
      byAspect: { ...CLASSICAL_ORB_BY_ASPECT },
      byBody: {},
    },
    aspectSet: 'major',
  },
];
