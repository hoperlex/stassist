/**
 * sky_days — «Небо дня» (Ф9 «Созвездие», см. docs/strategy/11-соцраздел-созвездие.md §3, §7).
 * Одна строка = одно синхронное астрособытие дня для всей базы (паттерн Wordle: событие одно,
 * проекция у каждого своя). Заполняется worker'ом (cron 00:40 МСК — ПОСЛЕ astro-calendar 00:10
 * и гороскопов 00:20, читает их свежие данные; см. apps/worker/src/sky) идемпотентным upsert'ом
 * на «сегодня и завтра» — публичная страница `/nebo-dnya` никогда не пуста после первого прогона.
 *
 * `transitPositions` — обезличенный снапшот позиций транзитных планет на референсный час дня
 * (SharePositions-совместимый срез, см. packages/shared/src/schemas/calc.ts): из него считается
 * персональная проекция (apps/api/src/sky/projection.ts) и рисуется вторая карта share-карточки
 * `kind='transit_day'`. ПД здесь нет по построению — только положения планет на дату.
 *
 * `threadPostId` — системный пост-тред дня (`posts.kind='sky_day'`, автор — Астра,
 * `author_kind='ai'`): тред переиспользует ВЕСЬ существующий UGC-контур (комментарии 2 уровня,
 * реакции, жалобы, модерация, уведомления) вместо собственной инфраструктуры обсуждений.
 */
import { date, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts.js';

export const skyDays = pgTable('sky_days', {
  id: uuid('id').primaryKey().defaultRandom(),
  /** 'YYYY-MM-DD' по МСК — тот же принцип опорной зоны, что dateKey гороскопов (day/tomorrow). */
  dayKey: date('day_key', { mode: 'string' }).notNull().unique(),
  /** Заголовок события («Марс входит в Весы», «Полнолуние в Козероге»). */
  title: text('title').notNull(),
  /** Редакционный текст дня (LLM-конвейер + postprocess; на stub — детерминированный текст). */
  summaryMd: text('summary_md').notNull(),
  /** `SkyDayPayload` (см. packages/shared/src/schemas/sky.ts): выбранное событие + факты дня. */
  payload: jsonb('payload').notNull(),
  /** Снапшот позиций транзитных планет на референсный час (см. заголовок файла). */
  transitPositions: jsonb('transit_positions').notNull(),
  threadPostId: uuid('thread_post_id').references(() => posts.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
