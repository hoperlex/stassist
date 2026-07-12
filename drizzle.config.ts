/**
 * Конфигурация drizzle-kit. Используем ТОЛЬКО `drizzle-kit generate` (SQL-first, оффлайн,
 * из TS-схемы, БЕЗ подключения к живой БД) — см. §5 конвенций реализации. `drizzle-kit pull`/
 * introspection к живому Postgres в этом проекте не используются и не должны использоваться
 * в CI/build.
 */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  // Схема живёт в packages/db/src/schema (см. Ф2: apps/api импортирует её как обычную
  // workspace-зависимость `@stassist/db`, а не относительным путём — иначе `tsc -p
  // tsconfig.build.json` падает с TS6059 при выходе за rootDir "src", см. _report/build/
  // f0-отчёт.md §4.6). `drizzle/` остаётся домом для SQL-миграций/сидов (`out` ниже) — единый
  // каталог по §5 конвенций реализации.
  schema: './packages/db/src/schema/index.ts',
  out: './drizzle/migrations',
  // dbCredentials намеренно не заданы: `generate` в offline-режиме их не требует.
  // Для `migrate` (применение) — отдельный скрипт tools/db-migrate.ts, читает DATABASE_URL сам.
});
