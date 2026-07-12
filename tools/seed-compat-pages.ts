/**
 * Оффлайн data-step (см. §4 конвенций реализации): генерирует committed SQL-сид SKELETON-строк
 * `compat_pages` — 78 канонических пар знаков с `body_md = NULL` (см. packages/db/src/schema/
 * compat-pages.ts). Источник правды пар — `allCanonicalCompatPairs()` из
 * packages/shared/src/schemas/zodiac.ts. Тексты (`body_md`) заливает **Ф4** отдельным сидом
 * (UPDATE по `sign_a`/`sign_b`) — этот скрипт создаёт только строки-скелеты, ОН НЕ ФАБРИКУЕТ
 * тексты пар (см. корневой CLAUDE.md, «против галлюцинаций»).
 *
 * НЕ часть build/test:unit/CI-гейта — отдельная команда `pnpm data:seed-compat-pages`.
 * Применение к живой БД — `pnpm db:seed` (tools/db-seed.ts, отдельно от миграций).
 *
 * Как и `tools/seed-calc-presets.ts`, запускается через `node --experimental-strip-types` (НЕ
 * `tsx` — см. подробное объяснение в комментарии того файла про резолюцию `@stassist/*` пакетов),
 * поэтому `@stassist/shared` должен быть собран (`pnpm --filter @stassist/shared build`) заранее
 * (см. root package.json, скрипт `data:seed-compat-pages`).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allCanonicalCompatPairs } from '@stassist/shared';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '..', 'drizzle', 'seed', '0002_compat_pages_skeleton.sql');

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function buildSql(): string {
  const pairs = allCanonicalCompatPairs();
  const lines: string[] = [
    '-- compat_pages: 78 канонических пар знаков — SKELETON-строки (body_md = NULL), Ф3.',
    '-- СГЕНЕРИРОВАНО: tools/seed-compat-pages.ts из packages/shared/src/schemas/zodiac.ts',
    '-- (allCanonicalCompatPairs). НЕ редактировать руками — перегенерировать',
    '-- `pnpm data:seed-compat-pages`. Идемпотентно: ON CONFLICT DO NOTHING — повторный прогон',
    '-- НЕ затирает body_md, залитый Ф4 (см. docs/roadmap/31-конвенции-реализации.md §5/§6).',
    '',
  ];
  for (const pair of pairs) {
    lines.push(
      `INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")`,
      `VALUES (${sqlString(pair.signA)}, ${sqlString(pair.signB)}, NULL)`,
      `ON CONFLICT ("sign_a", "sign_b") DO NOTHING;`,
      '',
    );
  }
  return lines.join('\n');
}

async function main(): Promise<void> {
  const sql = buildSql();
  await mkdir(path.dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, sql, 'utf8');
  console.log(`Записано ${allCanonicalCompatPairs().length} skeleton-строк compat_pages → ${OUT_PATH}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
