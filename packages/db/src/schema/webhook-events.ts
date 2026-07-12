/**
 * webhook_events — идемпотентность вебхуков платёжного провайдера (см. docs/architecture/
 * 22-модель-данных.md §4, промт Ф8 req.1 «вебхуки — идемпотентны (webhook_events.event_id uniq)»,
 * и находку [billing-без-провайдера] f8.md: «логика идемпотентности через in-memory-репозиторий»
 * для unit-теста, здесь — реальная Drizzle-таблица с тем же уникальным ключом).
 *
 * Модель обработки (закрывает промт req.1 «retry-очередь в worker»): API на приём вебхука ВСЕГДА
 * пытается вставить строку (`INSERT ... ON CONFLICT (event_id) DO NOTHING` — см.
 * apps/api/src/repositories/webhook-events-repository.ts) — если конфликт, событие уже видели,
 * применять повторно не нужно (эффект уже применён при первой доставке) — отвечаем 200 сразу
 * (провайдер не должен ретраить бесконечно). Если вставка прошла (новое событие) — API пытается
 * применить эффект (обновить payments/subscriptions/orders) СИНХРОННО в том же запросе; при удаче
 * — `processedAt` проставляется сразу; при ошибке применения — строка остаётся с `processedAt IS
 * NULL`, ответ провайдеру всё равно 200 (не провоцируем шторм ретраев провайдера), а
 * `apps/worker` подбирает необработанные события по расписанию (poll-по-статусу, тот же паттерн,
 * что все остальные async-очереди в этом проекте, см. apps/worker/src/worker.ts).
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { paymentProviderEnum } from './enums.js';

export const webhookEvents = pgTable('webhook_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  provider: paymentProviderEnum('provider').notNull(),
  eventId: text('event_id').notNull().unique(),
  type: text('type').notNull(),
  payload: jsonb('payload').notNull(),
  processedAt: timestamp('processed_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
