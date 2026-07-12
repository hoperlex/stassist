/**
 * report_feedback — кнопка «хорошо/плохо» под ИИ-отчётом (см. docs/architecture/
 * 22-модель-данных.md §3, f4-llm-конвейер.md req.8 «панель качества»).
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { reportFeedbackRatingEnum } from './enums.js';
import { users } from './users.js';
import { aiReports } from './ai-reports.js';

export const reportFeedback = pgTable('report_feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => aiReports.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  rating: reportFeedbackRatingEnum('rating').notNull(),
  comment: text('comment'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
