/**
 * Робастный SSL для `pg`/`pg-boss` против ДВУХ реалий разом: локальный docker-compose Postgres
 * (без SSL) и Supabase/managed Postgres — dev/стейдж-альтернатива по ADR-8 (см.
 * docs/architecture/21-техническая-архитектура.md §10) — где TLS ОБЯЗАТЕЛЕН.
 *
 * Без этого модуля голый `new Pool({ connectionString })` против Supabase либо падает
 * (`self signed certificate in certificate chain` — Supabase выдаёт сертификаты не из системного
 * доверенного набора клиента) либо (если DATABASE_URL_SUPABASE_STAGE вообще без `sslmode`)
 * сервер отклоняет незашифрованное соединение.
 *
 * Правила (в порядке приоритета):
 *  1. Строка подключения УЖЕ содержит `sslmode=...` (или устаревший `ssl=...`) — ничего не
 *     трогаем: `pg` разбирает `sslmode` сам через `pg-connection-string` (включая
 *     `sslmode=no-verify` → `{ rejectUnauthorized: false }`), а `pg-boss` в конструкторе с
 *     `connectionString` идёт тем же путём.
 *  2. Хост — localhost/127.0.0.1/::1 (обычный локальный Postgres, docker-compose) — SSL не нужен.
 *  3. Иначе (удалённый хост без явного `sslmode`, типичный случай для
 *     DATABASE_URL_SUPABASE_STAGE, если заказчик скопировал DSN без query-параметров) —
 *     форсируем `ssl: { rejectUnauthorized: false }` (тот же компромисс, что и `sslmode=no-verify`
 *     — шифрование канала есть, полная проверка цепочки сертификата — нет; для dev/staging с
 *     синтетикой этого достаточно, см. 152-ФЗ §7 в CLAUDE.md/ADR-8).
 *
 * Не решает отдельно нюанс «пул-порт 6543 vs прямой/session-порт 5432» Supabase — pgBouncer в
 * transaction-режиме (6543) не держит session-стейт, нужный `drizzle-orm/node-postgres/migrator`
 * (advisory lock) и `pg-boss` (LISTEN/NOTIFY, подготовленные операторы). Для миграций/pg-boss
 * используйте прямой (5432) или session-pooling порт Supabase — см. README.
 */
import type { PoolConfig } from 'pg';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

/** true — нужно явно форсировать `ssl` поверх connectionString (см. правила в doc-комментарии
 *  файла). Никогда не бросает: при нераспознаваемой строке возвращает `false` (оставляем `pg`
 *  разбираться/падать самому — не наше дело валидировать формат DSN здесь). */
export function needsExplicitSsl(connectionString: string): boolean {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    return false;
  }
  if (url.searchParams.has('sslmode') || url.searchParams.has('ssl')) return false;
  return !LOCAL_HOSTS.has(url.hostname);
}

/** `ssl`-часть `pg.PoolConfig`/`pg-boss` `ConstructorOptions` — форсированная или `undefined`
 *  (пусть `pg`/`pg-boss` сами разберут `sslmode` из строки/оставят локальное соединение как есть). */
export function resolvePgSsl(connectionString: string): { rejectUnauthorized: false } | undefined {
  return needsExplicitSsl(connectionString) ? { rejectUnauthorized: false } : undefined;
}

/** Готовый `PoolConfig` для `new Pool(...)` — connectionString + досчитанный `ssl`. Остальные
 *  опции (`max`, ...) вызывающий код домешивает поверх (`{ ...resolvePgPoolConfig(url), max: 10 }`). */
export function resolvePgPoolConfig(connectionString: string): PoolConfig {
  const ssl = resolvePgSsl(connectionString);
  return { connectionString, ...(ssl ? { ssl } : {}) };
}
