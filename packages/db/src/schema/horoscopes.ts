/**
 * horoscopes — гороскопная программатика (Ф5, см. docs/architecture/22-модель-данных.md §5,
 * docs/roadmap/prompts/f5-гороскопы-и-программатика.md). Наполняется worker'ом (cron 00:20 МСК,
 * см. apps/worker/src/horoscope/jobs.ts — 10 минут ПОСЛЕ astro-calendar-precompute, чтобы
 * гороскопы читали свежий `astro_calendar`, см. doc-комментарий apps/worker/src/worker.ts) и
 * лениво при заходе (apps/api/src/horoscope/lazy-generate.ts), если строки на дату ещё нет —
 * см. docs/roadmap/31-конвенции-реализации.md §6 «правило непустоты».
 *
 * `sign` — текстовый слаг БЕЗ FK (разный домен по `scope`, см. заголовок doc 22 §5):
 *  - scope='zodiac'|'profession'(антигороскоп) → EN-слаг знака (`@stassist/shared`
 *    ZODIAC_SIGN_EN_SLUGS, тот же алфавит, что и `interpretation_chunks.key`);
 *  - scope='eastern' → EN-слаг животного (EASTERN_ANIMAL_SLUGS);
 *  - scope='profession' (шуточный контур) → слаг профессии (HOROSCOPE_PROFESSION_SLUGS);
 *  - scope='lunar_day' → номер дня '1'..'30' как текст.
 *
 * `dateKey` — формат зависит от `period` (см. doc 22 §5 комментарий): 'YYYY-MM-DD' (day/tomorrow),
 * 'YYYY-Www' (week, ISO-неделя), 'YYYY-MM' (month), 'YYYY' (year/eastern). Для scope='lunar_day'
 * контент EVERGREEN (не привязан к дате) — `dateKey` хранит дату РЕАЛЬНОЙ генерации (аудит), но
 * идемпотентность/поиск для этого scope сознательно ИГНОРИРУЕТ dateKey (см. doc-комментарий
 * apps/worker/src/horoscope/jobs.ts `runLunarDayHoroscopeJob` и apps/api lazy-generate) — иначе
 * один и тот же evergreen-текст пришлось бы писать заново каждый день без надобности.
 */
import { boolean, jsonb, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { horoscopePeriodEnum, horoscopeScopeEnum, horoscopeStatusEnum, horoscopeTopicEnum } from './enums.js';

export const horoscopes = pgTable(
  'horoscopes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    scope: horoscopeScopeEnum('scope').notNull(),
    sign: text('sign').notNull(),
    period: horoscopePeriodEnum('period').notNull(),
    topic: horoscopeTopicEnum('topic').notNull().default('general'),
    dateKey: text('date_key').notNull(),
    bodyMd: text('body_md').notNull(),
    humor: boolean('humor').notNull().default(false),
    /** Астрособытия-основания текста (см. `@stassist/llm` src/horoscope/astro-events.ts
     *  `HoroscopeAstroEvents`) — антигаллюцинационный аудит («упомянутые события есть в
     *  astro_events», см. раздел «Верификация» промта Ф5). */
    astroEvents: jsonb('astro_events').notNull(),
    status: horoscopeStatusEnum('status').notNull().default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    unique('horoscopes_uniq_key').on(
      table.scope,
      table.sign,
      table.period,
      table.topic,
      table.dateKey,
      table.humor,
    ),
  ],
);
