/**
 * Применяет committed SQL-сиды (`drizzle/seed/*.sql`, см. tools/seed-calc-presets.ts) к живой БД
 * — ОТДЕЛЬНО от миграций (`pnpm db:migrate`), как и предписано §4 конвенций реализации
 * («их выходы коммитятся, сборка/тесты их только читают»; применение к БД — отдельный ручной
 * шаг). Требует DATABASE_URL; без него — понятная ошибка, НЕ часть build/CI-гейта.
 * Сиды написаны идемпотентно (`ON CONFLICT ... DO UPDATE`) — безопасно запускать повторно.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DIR = path.join(__dirname, '..', 'drizzle', 'seed');

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL не задан. Применение сидов требует живого Postgres (после db:migrate).');
    process.exit(1);
  }

  const files = (await readdir(SEED_DIR)).filter((f) => f.endsWith('.sql')).sort();
  if (files.length === 0) {
    console.log('Нет сид-файлов в drizzle/seed — нечего применять.');
    return;
  }

  const pool = new Pool({ connectionString });
  try {
    for (const file of files) {
      const sql = await readFile(path.join(SEED_DIR, file), 'utf8');
      console.log(`Применяю сид ${file} …`);
      await pool.query(sql);
    }
    console.log('Готово.');
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
