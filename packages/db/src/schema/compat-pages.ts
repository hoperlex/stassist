/**
 * compat_pages — 78 канонических пар совместимости знаков (см. docs/architecture/
 * 22-модель-данных.md §5). Таблицу создаёт **Ф3** (skeleton, seed 78 строк с `bodyMd=NULL`, см.
 * `tools/seed-compat-pages.ts` и `drizzle/seed/0002_compat_pages_skeleton.sql`), тексты
 * (`bodyMd`) заливает **Ф4** — см. docs/roadmap/31-конвенции-реализации.md §5/§6. Пока `bodyMd`
 * пуст, страница `/sovmestimost/{a}-i-{b}` обязана показывать честный empty-state «текст пары
 * готовится» (§6, «правило непустоты»), а НЕ выдуманный текст.
 *
 * `signA`/`signB` — слаги из `packages/shared/src/schemas/zodiac.ts` (`ZodiacSignSlug`), ВСЕГДА
 * в каноническом порядке (`signA.signIndex <= signB.signIndex`, см. `canonicalCompatPairSlug`);
 * обратный порядок в URL резолвится 301-редиректом на уровне apps/web, а не отдельной строкой.
 */
import { pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

export const compatPages = pgTable(
  'compat_pages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    signA: text('sign_a').notNull(),
    signB: text('sign_b').notNull(),
    /** null = текст ещё не залит Ф4 (см. заголовок файла). */
    bodyMd: text('body_md'),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique('compat_pages_sign_a_sign_b_unique').on(table.signA, table.signB)],
);
