/**
 * Пул соединений с PostgreSQL — ленивый: создаётся только если задан DATABASE_URL. Без него
 * readyz всегда отвечает 503 (это корректное поведение, см. §3 конвенций реализации).
 */
import { Pool } from 'pg';
import type { Config } from '@stassist/shared';

let pool: Pool | undefined;

export function getPool(config: Config): Pool | undefined {
  if (!config.db.url) return undefined;
  pool ??= new Pool({ connectionString: config.db.url, max: 10 });
  return pool;
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
  }
}
