/**
 * Конфигурация drizzle-kit. Используем ТОЛЬКО `drizzle-kit generate` (SQL-first, оффлайн,
 * из TS-схемы, БЕЗ подключения к живой БД) — см. §5 конвенций реализации. `drizzle-kit pull`/
 * introspection к живому Postgres в этом проекте не используются и не должны использоваться
 * в CI/build.
 */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './drizzle/schema/index.ts',
  out: './drizzle/migrations',
  // dbCredentials намеренно не заданы: `generate` в offline-режиме их не требует.
  // Для `migrate` (применение) — отдельный скрипт tools/db-migrate.ts, читает DATABASE_URL сам.
});
