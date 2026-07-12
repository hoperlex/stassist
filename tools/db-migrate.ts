/**
 * Применение миграций drizzle/migrations к реальной БД. Отдельный шаг от `drizzle-kit generate`
 * (который работает оффлайн из TS-схемы) — см. §5 конвенций реализации. Требует DATABASE_URL;
 * без него — падает с понятной ошибкой (это НЕ часть build/CI-гейта, запускается вручную/в
 * деплое). Требует Postgres с установленным расширением pgvector (см. drizzle/migrations/
 * 0000_extensions.sql и docker-compose.yml — образ pgvector/pgvector:pg15).
 */
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      'DATABASE_URL не задан. Применение миграций требует живого Postgres ' +
        '(с расширением pgvector, см. drizzle/migrations/0000_extensions.sql).',
    );
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
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
