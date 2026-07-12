/**
 * Пул соединений с PostgreSQL — ленивый: создаётся только если задан DATABASE_URL. Без него
 * readyz всегда отвечает 503 (это корректное поведение, см. §3 конвенций реализации).
 *
 * `getDb` (Ф2) — типобезопасная drizzle-обёртка (`@stassist/db`) поверх того же пула, для
 * репозиториев auth/birth-profiles/consents/etc. Возвращает `undefined` в degraded-режиме —
 * вызывающий код (см. app.ts) обязан явно решить, что делать без БД (обычно 503).
 *
 * `resolvePgPoolConfig` (см. @stassist/db/pg-ssl) досчитывает `ssl` — локальный docker-compose
 * Postgres работает без SSL, Supabase (dev/стейдж-альтернатива, ADR-8) требует его обязательно.
 */
import { Pool } from 'pg';
import { createDb, resolvePgPoolConfig, type Db } from '@stassist/db';
import type { Config } from '@stassist/shared';

let pool: Pool | undefined;
let db: Db | undefined;

export function getPool(config: Config): Pool | undefined {
  if (!config.db.url) return undefined;
  pool ??= new Pool({ ...resolvePgPoolConfig(config.db.url), max: 10 });
  return pool;
}

export function getDb(config: Config): Db | undefined {
  const p = getPool(config);
  if (!p) return undefined;
  db ??= createDb(p);
  return db;
}

/** true, если БД сконфигурирована и отвечает на ping. Никогда не бросает. */
export async function pingDb(config: Config): Promise<boolean> {
  const p = getPool(config);
  if (!p) return false;
  try {
    await p.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

export async function closeDb(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
    db = undefined;
  }
}
