/**
 * Оффлайн data-step (см. §4 конвенций реализации): генерирует committed SQL-сиды seed-корпуса
 * Ф4 — `drizzle/seed/0003_interpretation_chunks.sql` (интерпретационные чанки, детерминированно,
 * через @stassist/llm buildCorpus() — StubLlmProvider по духу, см. doc-комментарий в
 * packages/llm/src/corpus/build-corpus.ts) и `drizzle/seed/0004_compat_pages_texts.sql` (78
 * текстов пар совместимости — заливает body_md в уже существующие skeleton-строки Ф3).
 *
 * НЕ часть build/test:unit/CI-гейта — отдельная команда `pnpm data:corpus`. Применение к живой
 * БД — `pnpm db:seed` (tools/db-seed.ts), отдельно от миграций.
 *
 * Идемпотентность (ВАЖНО, редакторский workflow — см. §6 конвенций реализации «редактор помечает
 * reviewed»): повторный прогон `interpretation_chunks` обновляет ТОЛЬКО строки, всё ещё
 * quality='draft' (WHERE-условие в ON CONFLICT DO UPDATE) — не затирает ручную редактуру
 * (quality='reviewed'). Аналогично `compat_pages.body_md` обновляется ТОЛЬКО если он ещё NULL —
 * не затирает отредактированный редактором текст пары.
 *
 * Как и tools/seed-calc-presets.ts, запускается через `node --experimental-strip-types` (НЕ
 * `tsx` — см. подробное объяснение в комментарии того файла про резолюцию `@stassist/*` пакетов),
 * поэтому зависимые пакеты (`@stassist/shared`, `@stassist/numerology-core`, `@stassist/llm`)
 * должны быть собраны заранее (см. root package.json, скрипт `data:corpus`).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCorpus, CORPUS_VERSION } from '@stassist/llm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DIR = path.join(__dirname, '..', 'drizzle', 'seed');
const CHUNKS_OUT_PATH = path.join(SEED_DIR, '0003_interpretation_chunks.sql');
const COMPAT_OUT_PATH = path.join(SEED_DIR, '0004_compat_pages_texts.sql');

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function buildChunksSql(chunks: ReturnType<typeof buildCorpus>['chunks']): string {
  const lines: string[] = [
    `-- interpretation_chunks — seed-корпус Ф4 (${chunks.length} чанков), версия ${CORPUS_VERSION}.`,
    '-- СГЕНЕРИРОВАНО: tools/gen-corpus.ts из packages/llm/src/corpus/build-corpus.ts.',
    '-- НЕ редактировать руками — перегенерировать `pnpm data:corpus`.',
    '-- Идемпотентно: ON CONFLICT ("key") DO UPDATE ТОЛЬКО пока quality=\'draft\' — не затирает',
    '-- ручную редактуру (quality=\'reviewed\', см. §6 конвенций реализации).',
    '',
  ];
  for (const c of chunks) {
    lines.push(
      `INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")`,
      `VALUES (${sqlString(c.key)}, ${sqlString(c.tradition)}, ${sqlString(c.text)}, ${sqlString(c.quality)}, ${c.version})`,
      `ON CONFLICT ("key") DO UPDATE SET`,
      `  "tradition" = EXCLUDED."tradition",`,
      `  "text" = EXCLUDED."text",`,
      `  "version" = EXCLUDED."version",`,
      `  "updated_at" = now()`,
      `WHERE "interpretation_chunks"."quality" = 'draft';`,
      '',
    );
  }
  return lines.join('\n');
}

function buildCompatSql(compatPairs: ReturnType<typeof buildCorpus>['compatPairs']): string {
  const lines: string[] = [
    `-- compat_pages.body_md — 78 текстов пар совместимости Ф4 (skeleton-строки создал Ф3, см.`,
    '-- drizzle/seed/0002_compat_pages_skeleton.sql).',
    '-- СГЕНЕРИРОВАНО: tools/gen-corpus.ts из packages/llm/src/corpus/build-corpus.ts.',
    '-- НЕ редактировать руками — перегенерировать `pnpm data:corpus`.',
    "-- Идемпотентно: обновляет body_md ТОЛЬКО пока он ещё NULL — не затирает текст, отредактированный",
    '-- вручную (см. §6 конвенций реализации).',
    '',
  ];
  for (const pair of compatPairs) {
    lines.push(
      `UPDATE "compat_pages" SET "body_md" = ${sqlString(pair.bodyMd)}, "updated_at" = now()`,
      `WHERE "sign_a" = ${sqlString(pair.signA)} AND "sign_b" = ${sqlString(pair.signB)} AND "body_md" IS NULL;`,
      '',
    );
  }
  return lines.join('\n');
}

async function main(): Promise<void> {
  const { chunks, compatPairs } = buildCorpus();

  await mkdir(SEED_DIR, { recursive: true });
  await writeFile(CHUNKS_OUT_PATH, buildChunksSql(chunks), 'utf8');
  await writeFile(COMPAT_OUT_PATH, buildCompatSql(compatPairs), 'utf8');

  console.log(`Записано ${chunks.length} чанков корпуса → ${CHUNKS_OUT_PATH}`);
  console.log(`Записано ${compatPairs.length} текстов пар совместимости → ${COMPAT_OUT_PATH}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
