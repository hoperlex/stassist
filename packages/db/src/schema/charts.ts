/**
 * charts — кэш расчётов (см. docs/architecture/22-модель-данных.md §2). `data` — ШИФРТЕКСТ
 * (`encryptPd(JSON.stringify(ChartData | SharePositions), keyring)`, см. `apps/api/src/
 * repositories/charts-repository.ts`), НЕ сырой jsonb-объект: `ChartData.input` содержит точные
 * дату/время/координаты рождения — те же значения, что `birth_profiles` шифрует AES-256-GCM;
 * хранить их открытым текстом рядом с шифртекстом обнуляло бы защиту 152-ФЗ (находка
 * [pd-leak-charts-data]). Колонка остаётся `jsonb` (не `text`) без миграции — jsonb прекрасно
 * хранит и строковый JSON-литерал; расшифровка/дешифровка — строго на границе репозитория,
 * пересчитывается при смене `coreVersion` (см. packages/astro-core ASTRO_CORE_VERSION).
 *
 * `birthProfileId` намеренно nullable (см. _work/build/findings/cross.md, пункт
 * «схема-vs-функциональность» про Ф7 posts.chart_id → анонимные копии карт без профиля) —
 * в Ф2 всегда заполняется, nullable зарезервировано для будущей анонимной копии (Ф7), схема не
 * потребует миграции повторно.
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { birthProfiles } from './birth-profiles.js';
import { calcPresets } from './calc-presets.js';
import { chartKindEnum } from './enums.js';

export const charts = pgTable('charts', {
  id: uuid('id').primaryKey().defaultRandom(),
  birthProfileId: uuid('birth_profile_id').references(() => birthProfiles.id, {
    onDelete: 'cascade',
  }),
  presetId: uuid('preset_id')
    .notNull()
    .references(() => calcPresets.id, { onDelete: 'restrict' }),
  kind: chartKindEnum('kind').notNull().default('natal'),
  /** Вторая карта для синастрии/композита. */
  refChartId: uuid('ref_chart_id'),
  /** Момент для транзитов/соляров/лунаров — null для натала. */
  moment: timestamp('moment', { withTimezone: true }),
  /** `ChartData`/`SharePositions` целиком, ЗАШИФРОВАНО (см. doc-комментарий выше и
   *  packages/shared/src/schemas/chart.ts). */
  data: jsonb('data').notNull(),
  coreVersion: text('core_version').notNull(),
  /** sha256 от `data` — для быстрой проверки «не протухло ли» без парсинга jsonb. */
  checksum: text('checksum').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
