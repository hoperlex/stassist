/**
 * sky_checkins — чек-ин «Неба дня» (Ф9, центральный соцобъект «отклик», см. docs/strategy/
 * 11-соцраздел-созвездие.md §3): один тап «в точку / частично / мимо» + опциональная заметка.
 *
 * Заметка НЕ хранит собственного модерационного статуса: при чек-ине она публикуется обычным
 * комментарием в треде дня (`noteCommentId`) и проходит штатный контур UGC (классификатор,
 * премодерация новичка, жалобы) — см. apps/api/src/routes/sky.ts. Здесь заметка дублируется
 * текстом только как часть отклика (для «моего чек-ина» и агрегатов), источник правды по
 * видимости — comments.
 *
 * unique(userId, dayKey) — один отклик на день; повторный POST того же дня = upsert (смена
 * вердикта), стрик при этом НЕ инкрементится повторно (см. advanceStreak в shared/sky.ts).
 */
import { date, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { skyCheckinVerdictEnum } from './enums.js';
import { comments } from './comments.js';
import { skyDays } from './sky-days.js';
import { users } from './users.js';

export const skyCheckins = pgTable(
  'sky_checkins',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    dayKey: date('day_key', { mode: 'string' })
      .notNull()
      .references(() => skyDays.dayKey, { onDelete: 'cascade' }),
    verdict: skyCheckinVerdictEnum('verdict').notNull(),
    /** Заметка ≤140 (гейт в zod, см. skyCheckinCreateRequestSchema) — см. заголовок файла. */
    note: text('note'),
    noteCommentId: uuid('note_comment_id').references(() => comments.id, { onDelete: 'set null' }),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique('sky_checkins_user_day_uniq').on(table.userId, table.dayKey)],
);
