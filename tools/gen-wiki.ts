/**
 * Оффлайн data-step (см. §4 конвенций реализации): генерирует committed SQL-сиды Ф7 —
 * `drizzle/seed/0008_wiki_articles.sql` (наполнение `wiki_articles`, до этого пустой со времён
 * Ф4 — см. `packages/db/src/schema/wiki-articles.ts`) и `drizzle/seed/0009_link_chunks_to_articles.sql`
 * (бэкфилл `interpretation_chunks.source_article_id`, закрывает МАЖОР-находку [missing-step]
 * f7.md — правило см. `packages/shared/src/schemas/wiki.ts` `articleSlugForChunkKey`, SQL ниже
 * реализует ТОЧНО ТУ ЖЕ логику через `split_part`/regex, задокументировано построчно).
 *
 * НЕ часть build/test:unit/CI-гейта — отдельная команда `pnpm data:wiki`. Применение к живой БД —
 * `pnpm db:seed` (tools/db-seed.ts), отдельно от миграций.
 *
 * Идемпотентность: `wiki_articles` — ON CONFLICT ("slug") DO UPDATE ТОЛЬКО пока `status='draft'`
 * (тот же паттерн, что `tools/gen-corpus.ts` для чанков) — не затирает ручную редактуру. Линковка
 * чанков — детерминированный UPDATE, безопасно перезапускать (структурная связь, не контент).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildWikiArticleDrafts } from '@stassist/llm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DIR = path.join(__dirname, '..', 'drizzle', 'seed');
const ARTICLES_OUT_PATH = path.join(SEED_DIR, '0008_wiki_articles.sql');
const LINK_OUT_PATH = path.join(SEED_DIR, '0009_link_chunks_to_articles.sql');

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function buildArticlesSql(drafts: ReturnType<typeof buildWikiArticleDrafts>): string {
  const lines: string[] = [
    `-- wiki_articles — стартовый набор Ф7 (${drafts.length} статей).`,
    '-- СГЕНЕРИРОВАНО: tools/gen-wiki.ts из packages/llm/src/corpus/wiki-content.ts.',
    '-- НЕ редактировать руками — перегенерировать `pnpm data:wiki`.',
    "-- Идемпотентно: ON CONFLICT (\"slug\") DO UPDATE ТОЛЬКО пока status='draft' (не затирает",
    '-- ручную редактуру редактора, см. §6 конвенций реализации).',
    '',
  ];
  for (const d of drafts) {
    lines.push(
      `INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")`,
      `VALUES (${sqlString(d.slug)}, ${sqlString(d.section)}, ${sqlString(d.title)}, ${sqlString(d.bodyMd)}, 'draft', 1)`,
      `ON CONFLICT ("slug") DO UPDATE SET`,
      `  "section" = EXCLUDED."section",`,
      `  "title" = EXCLUDED."title",`,
      `  "body_md" = EXCLUDED."body_md",`,
      `  "updated_at" = now()`,
      `WHERE "wiki_articles"."status" = 'draft';`,
      '',
    );
  }
  return lines.join('\n');
}

/**
 * Правило привязки — см. `packages/shared/src/schemas/wiki.ts` `articleSlugForChunkKey` (doc-
 * комментарий там — единственный источник правды по СЕМАНТИКЕ правила); здесь — его SQL-
 * реализация (bulk UPDATE...FROM вместо построчного JS-цикла по ~1600+ чанкам). Не находит
 * соответствующую статью → просто не обновляет строку (JOIN не матчится) — НЕ ошибка, чанк вне
 * стартового набора статей остаётся с `source_article_id = NULL` (честно, не выдумка).
 */
function buildLinkSql(): string {
  return [
    '-- interpretation_chunks.source_article_id — бэкфилл связи чанк → статья-источник Ф7.',
    '-- СГЕНЕРИРОВАНО: tools/gen-wiki.ts. Правило — см. packages/shared/src/schemas/wiki.ts',
    '-- articleSlugForChunkKey() (doc-комментарий там — источник правды по семантике).',
    '-- Структурная связь (не редакционный контент) — безопасно перезапускать многократно.',
    '',
    "-- sign:{sign}:overview → signs/{sign}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'signs' AND w.slug = split_part(c.key, ':', 2)",
    "  AND c.key ~ '^sign:[a-z]+:overview$';",
    '',
    "-- planet:{planet}:overview → planets/{planet}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'planets' AND w.slug = split_part(c.key, ':', 2)",
    "  AND c.key ~ '^planet:[a-z_]+:overview$';",
    '',
    "-- house:{n}:overview → houses/house-{n}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'houses' AND w.slug = 'house-' || split_part(c.key, ':', 2)",
    "  AND c.key ~ '^house:[0-9]+:overview$';",
    '',
    "-- planet_in_sign / planet_in_house / point_in_sign / point_in_house → planets/{planet|point}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'planets' AND w.slug = split_part(c.key, ':', 2)",
    "  AND (c.key ~ '^planet_in_sign:' OR c.key ~ '^planet_in_house:' OR c.key ~ '^point_in_sign:' OR c.key ~ '^point_in_house:');",
    '',
    "-- asc_in_sign:{sign} → signs/{sign}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'signs' AND w.slug = split_part(c.key, ':', 2)",
    "  AND c.key ~ '^asc_in_sign:';",
    '',
    "-- aspect:{angle}:overview (ровно 3 сегмента) → aspects/{angle}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'aspects' AND w.slug = split_part(c.key, ':', 2)",
    "  AND c.key ~ '^aspect:[a-z]+:overview$';",
    '',
    "-- aspect:{lo}:{angle}:{hi} (между объектами, ровно 4 сегмента) → aspects/{angle}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'aspects' AND w.slug = split_part(c.key, ':', 3)",
    "  AND c.key ~ '^aspect:[a-z_]+:[a-z]+:[a-z_]+$';",
    '',
    "-- arcanum:{n}:{position} → arcana/arkan-{n}",
    'UPDATE "interpretation_chunks" c SET "source_article_id" = w.id',
    'FROM "wiki_articles" w',
    "WHERE w.section = 'arcana' AND w.slug = 'arkan-' || split_part(c.key, ':', 2)",
    "  AND c.key ~ '^arcanum:[0-9]+:';",
    '',
  ].join('\n');
}

async function main(): Promise<void> {
  const drafts = buildWikiArticleDrafts();

  await mkdir(SEED_DIR, { recursive: true });
  await writeFile(ARTICLES_OUT_PATH, buildArticlesSql(drafts), 'utf8');
  await writeFile(LINK_OUT_PATH, buildLinkSql(), 'utf8');

  console.log(`Записано ${drafts.length} вики-статей → ${ARTICLES_OUT_PATH}`);
  console.log(`Записан скрипт линковки чанков → ${LINK_OUT_PATH}`);

  const bySection = new Map<string, number>();
  for (const d of drafts) bySection.set(d.section, (bySection.get(d.section) ?? 0) + 1);
  for (const [section, count] of [...bySection.entries()].sort()) console.log(`  ${section}: ${count}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
