/**
 * quiz_answers — квиз-онбординг → персонализация пейвола (см. docs/architecture/
 * 22-модель-данных.md §7б, промт Ф8 req.3). Вопросы/варианты — статичный каталог
 * `QUIZ_QUESTIONS` в packages/shared/src/schemas/quiz.ts (не таблица — фиксированный набор,
 * тот же паттерн, что `PLAN_CATALOG`); здесь хранятся только ОТВЕТЫ конкретного пользователя.
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const quizAnswers = pgTable('quiz_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  quizCode: text('quiz_code').notNull(),
  /** `Record<questionCode, answerCode>` — см. `quizAnswersSchema`. */
  answers: jsonb('answers').notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
