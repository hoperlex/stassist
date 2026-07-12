/**
 * Общие Postgres-enum'ы схемы (см. docs/architecture/22-модель-данных.md). Вынесены в отдельный
 * файл, т.к. используются несколькими таблицами — drizzle-kit генерирует `CREATE TYPE` один раз.
 */
import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'user',
  'editor',
  'moderator',
  'admin',
  'expert',
]);

export const userStatusEnum = pgEnum('user_status', ['active', 'blocked', 'deleted']);

export const consentKindEnum = pgEnum('consent_kind', ['pd_processing', 'marketing']);

export const birthProfileKindEnum = pgEnum('birth_profile_kind', ['self', 'other', 'celebrity']);

/** См. `zodiacTypeSchema` в packages/shared/src/schemas/chart.ts — те же значения. */
export const zodiacTypeEnum = pgEnum('zodiac_type', ['tropical', 'sidereal']);

/** См. `ayanamshaSchema` в packages/shared/src/schemas/chart.ts. */
export const ayanamshaEnum = pgEnum('ayanamsha', [
  'lahiri',
  'raman',
  'kp',
  'fagan_bradley',
  'yukteswar',
]);

/** См. `houseSystemSchema` в packages/shared/src/schemas/chart.ts. */
export const houseSystemEnum = pgEnum('house_system', [
  'placidus',
  'koch',
  'regiomontanus',
  'porphyry',
  'equal',
  'whole_sign',
]);

/** См. `aspectSetSchema` в packages/shared/src/schemas/chart.ts. */
export const aspectSetEnum = pgEnum('aspect_set', ['major', 'major_minor']);

/** См. `chartKindSchema` в packages/shared/src/schemas/chart.ts. */
export const chartKindEnum = pgEnum('chart_kind', [
  'natal',
  'transit',
  'progression',
  'symbolic_direction',
  'solar_return',
  'lunar_return',
  'synastry',
  'composite',
  'davison',
  'horary',
]);

/** См. `shareKindSchema` в packages/shared/src/schemas/calc.ts (Ф3, `chart_shares`). */
export const shareKindEnum = pgEnum('share_kind', ['natal', 'synastry']);
