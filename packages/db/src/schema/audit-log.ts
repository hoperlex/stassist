/**
 * audit_log — журнал значимых действий (auth-события, платежи, изменения контента), см.
 * docs/architecture/22-модель-данных.md §1 и 21-техническая-архитектура.md §9.
 *
 * actor_id — nullable FK на users (действие может быть системным/анонимным). users создаётся
 * skeleton-таблицей в Ф0-миграции, поэтому FK валиден уже там.
 * updated_at сознательно отсутствует: журнал append-only, записи не редактируются.
 *
 * Перенесено из `drizzle/schema/` в `packages/db/src/schema/` в Ф2 (см. README ниже, файл
 * client.ts) — чтобы apps/api мог типобезопасно импортировать схему как обычную
 * workspace-зависимость `@stassist/db` (через собранный dist, без нарушения `rootDir` при
 * `tsc -p tsconfig.build.json`, см. находку `rootDir` в _report/build/f0-отчёт.md §4.6).
 * Путь `out` для SQL-миграций (`drizzle/migrations`) не менялся.
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  actorId: uuid('actor_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entity: text('entity').notNull(),
  entityId: uuid('entity_id'),
  payload: jsonb('payload'),
  requestId: text('request_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
