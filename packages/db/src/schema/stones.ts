/**
 * stones — витрина камней (см. docs/architecture/22-модель-данных.md §6, doc-комментарий там же
 * «соответствия: знаки, планеты, декады, арканы, чакры»). Таблица создаётся и наполняется **Ф6**
 * (см. docs/roadmap/prompts/f6-нумерология-и-камни.md req.4) — единственная фаза-владелец.
 *
 * `purposes` — ДОБАВЛЕНО сверх doc 22 §6 по находке [data-model] в _work/build/findings/f6.md:
 * «Фильтр камней по назначению требуется и проверяется, но в схеме stones поля назначения нет».
 * Фиксированный словарь значений — `STONE_PURPOSES` в `packages/shared/src/schemas/stone.ts`
 * (единственный источник правды для фильтра UI и генератора данных `tools/gen-stones.ts`).
 *
 * `chakras` — слаги СОВПАДАЮТ с `MATRIX_HEALTH_CHAKRAS[].slug` из
 * `packages/llm/src/facts/matrix-positions.ts` (health_root…health_crown) — намеренно, чтобы
 * кросс-блок «ваши камни» на PDF/странице матрицы судьбы мог сопоставить чакру аркана с камнем
 * без отдельной таблицы перевода.
 *
 * `decades` — jsonb-массив `{ sign: ZodiacSignEnSlug, decadeIndex: 1|2|3 }` — декады, которым
 * традиционно соответствует камень (см. `tools/gen-stones.ts`, классические деканы/субправители).
 *
 * `status` — draft/reviewed (см. `stoneStatusEnum`): весь стартовый датасет `pnpm data:stones`
 * сеется как `draft` — минералогические/эзотерические факты сгенерированы детерминированным
 * шаблоном по общеизвестным справочным данным (см. заголовок `tools/gen-stones.ts`), НЕ проверены
 * редакцией. Страница камня honest-но показывает бейдж «требует проверки заказчиком/редактором»,
 * пока `status='draft'` (§6 конвенций реализации, «правило непустоты»: draft ВСЕ РАВНО публикуется).
 */
import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { stoneStatusEnum } from './enums.js';

export const stones = pgTable('stones', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  propertiesMd: text('properties_md').notNull(),
  colors: text('colors').array().notNull().default([]),
  /** EN-слаги знаков (`ZodiacSignEnSlug`) — тот же алфавит, что `interpretation_chunks.key`. */
  zodiacSigns: text('zodiac_signs').array().notNull().default([]),
  /** Слаги планет (`BODY_GLYPHS`/`BODY_NAMES_RU` из `@stassist/ui`: sun, moon, mercury…pluto). */
  planets: text('planets').array().notNull().default([]),
  /** `Array<{ sign: ZodiacSignEnSlug; decadeIndex: 1|2|3 }>` — см. заголовок файла. */
  decades: jsonb('decades').notNull().default([]),
  /** Номера арканов Таро 1–22 — см. заголовок файла (Golden Dawn-соответствие планета/знак→аркан,
   *  реализация: `tools/gen-stones.ts` `arcanaForStone()`). */
  arcana: integer('arcana').array().notNull().default([]),
  /** Слаги 7 чакр — см. `MATRIX_HEALTH_CHAKRAS` в `@stassist/llm` (заголовок файла). */
  chakras: text('chakras').array().notNull().default([]),
  /** Назначения (фильтр «на деньги/на любовь/…») — словарь `STONE_PURPOSES` в `@stassist/shared`. */
  purposes: text('purposes').array().notNull().default([]),
  suitableMd: text('suitable_md'),
  unsuitableMd: text('unsuitable_md'),
  photoKeys: text('photo_keys').array().notNull().default([]),
  /** Задел партнёрской витрины (этап 2, см. doc 22 §6) — не используется в Ф6. */
  affiliateUrl: text('affiliate_url'),
  status: stoneStatusEnum('status').notNull().default('draft'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
