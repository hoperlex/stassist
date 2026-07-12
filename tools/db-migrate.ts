/**
 * Применение миграций drizzle/migrations к реальной БД. Отдельный шаг от `drizzle-kit generate`
 * (который работает оффлайн из TS-схемы) — см. §5 конвенций реализации. Требует DATABASE_URL;
 * без него — падает с понятной ошибкой (это НЕ часть build/CI-гейта, запускается вручную/в
 * деплое). Требует Postgres с установленным расширением pgvector (см. drizzle/migrations/
 * 0000_extensions.sql и docker-compose.yml — образ pgvector/pgvector:pg15).
 *
 * SSL: `resolvePgPoolConfig` — та же логика, что и `@stassist/db/pg-ssl` (см. doc-комментарий
 * там), но продублирована ЛОКАЛЬНО (а не импортирована из `@stassist/db`) — этот файл
 * запускается через `tsx` (см. package.json `db:migrate`), а `tsx` резолвит `@stassist/db` через
 * tsconfig `paths` в СЫРОЙ TS-исходник (`packages/db/src/index.ts`), который транзитивно тянет
 * `@stassist/astro-core` (через `seed/system-calc-presets.ts`) — под `tsx` (esbuild) это ломает
 * ESM/CJS-интероп `astronomy-engine` (`AE.Body` оказывается `undefined`), хотя под обычным `node`
 * (см. `tools/data-horoscopes-backfill.ts`, `--experimental-strip-types`, резолвит собранный
 * `dist/index.js`) и под `vitest` всё работает штатно. Локальная копия — 10 строк без единой
 * транзитивной зависимости, обходит проблему полностью. Робастно работает и против локального
 * docker-compose Postgres (без SSL), и против Supabase (dev/стейдж-альтернатива по ADR-8, SSL
 * обязателен). Для Supabase используйте DSN прямого/session-порта (5432), НЕ transaction-pooler
 * (6543) — миграции держат advisory lock на время прогона, pgBouncer в transaction-режиме его не
 * поддерживает (см. README).
 */
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool, type PoolConfig } from 'pg';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

function resolvePgPoolConfig(connectionString: string): PoolConfig {
  let needsSsl = false;
  try {
    const url = new URL(connectionString);
    needsSsl = !url.searchParams.has('sslmode') && !url.searchParams.has('ssl') && !LOCAL_HOSTS.has(url.hostname);
  } catch {
    needsSsl = false;
  }
  return { connectionString, ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}) };
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      'DATABASE_URL не задан. Применение миграций требует живого Postgres ' +
        '(с расширением pgvector, см. drizzle/migrations/0000_extensions.sql).',
    );
    process.exit(1);
  }

  const pool = new Pool(resolvePgPoolConfig(connectionString));
  const db = drizzle(pool);

  console.log('Применяю миграции из drizzle/migrations …');
  await migrate(db, { migrationsFolder: './drizzle/migrations' });
  console.log('Готово.');

  await pool.end();
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
