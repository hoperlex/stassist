/**
 * Типобезопасная обёртка drizzle-orm поверх пула `pg` (создаётся lazily в apps/api/src/db.ts —
 * этот модуль сам не открывает соединений). `createDb` НЕ подключается к сети при вызове,
 * поэтому её можно вызывать даже в unit-тестах с фиктивным пулом.
 */
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Pool } from 'pg';
import * as schema from './schema/index.js';

export type Schema = typeof schema;
export type Db = NodePgDatabase<Schema>;

export function createDb(pool: Pool): Db {
  return drizzle(pool, { schema });
}
