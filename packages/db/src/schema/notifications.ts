/**
 * notifications — служебные уведомления пользователя (см. docs/architecture/22-модель-данных.md
 * §7б). Таблица заведена **Ф6** первой фазой-потребителем (`kind='order_ready'` — письмо+
 * уведомление о готовности PDF-заказа, см. docs/roadmap/prompts/f6-нумерология-и-камни.md,
 * находку [verification-gap] в _work/build/findings/f6.md); остальные значения enum'а
 * (`comment_reply`/`friend_request`/`moderation`) — задел коммьюнити Ф7+, самой таблице это не
 * мешает (тот же паттерн cross-FK skeleton, что `wiki_articles`/`celebrities`, см. §5 конвенций
 * реализации) — enum общий, а не создаётся заново каждой фазой.
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { notificationKindEnum } from './enums.js';
import { users } from './users.js';

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  kind: notificationKindEnum('kind').notNull(),
  /** Полезная нагрузка (см. packages/shared/src/schemas/notification.ts `orderReadyPayloadSchema`
   *  для `kind='order_ready'`: orderId, reportId, pdfUrl-подобные поля — сама подписанная ссылка
   *  НЕ хранится тут постоянно, см. doc-комментарий там же). */
  payload: jsonb('payload').notNull(),
  /** Текст уведомления (готовое русское предложение для колокольчика/списка в кабинете) —
   *  хранится денормализованно, чтобы список уведомлений не требовал join'ов на источник. */
  text: text('text').notNull(),
  readAt: timestamp('read_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
