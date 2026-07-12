/**
 * Оффлайн data-step: собирает НАДСТРОЕЧНЫЕ сиды с редакторским (reviewed) текстом из
 * `_work/editorial/reviewed/**` (результат многоагентной редактуры, блок A промта
 * docs/roadmap/prompts/text-корпус-редактура.md). По требованию заказчика НЕ переписывает старые
 * сиды 0003/0004/0007/0008 — пишет новые файлы `0012`–`0015`, которые раннер `tools/db-seed.ts`
 * применяет ПОСЛЕ старых (readdir+sort) и которые перезаписывают старый draft.
 *
 * КЛЮЧЕВОЕ отличие от старых сидов: upsert БЕЗ draft-guard (перезаписывает безусловно по
 * уникальному ключу) и ставит quality/status='reviewed'. Это одновременно:
 *   (а) идемпотентно — повторный прогон пишет те же значения;
 *   (б) самозащитно — старый 0003 (WHERE quality='draft') после этого строку не тронет;
 *   (в) FK/линковку 0009 не ломает — key/slug/id не меняются, source_article_id не трогается.
 *
 * Метаданные (tradition чанка, section вики, пара знаков) берутся из КАНОНИЧЕСКИХ билдеров
 * (buildEditorialManifest/buildCorpus/buildWikiArticleDrafts + stones.json), а НЕ из reviewed-JSON —
 * редактор поставляет только текст и не может испортить структуру. Ключи, которых нет в reviewed,
 * пропускаются (остаются draft из 0003) → сборка инкрементальна и переигрываема.
 *
 * Запуск: `pnpm data:corpus-reviewed`.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCorpus, buildEditorialManifest, buildWikiArticleDrafts } from '@stassist/llm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SEED_DIR = path.join(ROOT, 'drizzle', 'seed');
const REVIEWED_DIR = path.join(ROOT, '_work', 'editorial', 'reviewed');

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlNullable(value: string | null | undefined): string {
  return value == null || value === '' ? 'NULL' : sqlString(value);
}

const errors: string[] = [];

/** Читает и мержит все JSON-карты из папки домена (тихо пропускает отсутствующую папку). */
async function readReviewedDomain<T>(domain: string): Promise<Record<string, T>> {
  const dir = path.join(REVIEWED_DIR, domain);
  let files: string[];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith('.json'));
  } catch {
    return {};
  }
  const merged: Record<string, T> = {};
  for (const file of files.sort()) {
    const parsed = JSON.parse(await readFile(path.join(dir, file), 'utf8')) as Record<string, T>;
    for (const [k, v] of Object.entries(parsed)) {
      if (k in merged) errors.push(`Дубль ключа «${k}» в reviewed/${domain} (файл ${file})`);
      merged[k] = v;
    }
  }
  return merged;
}

function header(lines: string[]): string {
  return [...lines, ''].join('\n');
}

async function main(): Promise<void> {
  const traditionByKey = new Map(buildEditorialManifest().map((e) => [e.key, e.tradition]));
  const compatById = new Map(buildCorpus().compatPairs.map((p) => [`${p.signA}__${p.signB}`, p]));
  const wikiDrafts = buildWikiArticleDrafts();
  const wikiSectionBySlug = new Map(wikiDrafts.map((d) => [d.slug, d.section]));
  const wikiTitleDraftBySlug = new Map(wikiDrafts.map((d) => [d.slug, d.title]));
  const stoneSlugs = new Set((JSON.parse(await readFile(path.join(ROOT, 'tools', 'data', 'stones.json'), 'utf8')) as { slug: string }[]).map((s) => s.slug));

  // --- 0012 interpretation_chunks --------------------------------------------------------------
  const chunks = await readReviewedDomain<string>('chunks');
  const chunkLines = header([
    '-- interpretation_chunks — РЕДАКТОРСКИЙ (reviewed) надстроечный сид (блок A редактуры корпуса).',
    '-- СГЕНЕРИРОВАНО: tools/gen-corpus-reviewed.ts из _work/editorial/reviewed/chunks/*.json.',
    '-- Применяется ПОСЛЕ 0003 (readdir+sort) и перезаписывает draft: ON CONFLICT DO UPDATE БЕЗ',
    "-- draft-guard, ставит quality='reviewed' (после этого старый 0003 строку не трогает).",
  ]);
  const chunkStatements: string[] = [];
  for (const key of Object.keys(chunks).sort()) {
    const text = chunks[key]!;
    const tradition = traditionByKey.get(key);
    if (!tradition) {
      errors.push(`Чанк «${key}» отсутствует в каноническом манифесте (buildEditorialManifest)`);
      continue;
    }
    if (!text || !text.trim()) {
      errors.push(`Пустой текст чанка «${key}»`);
      continue;
    }
    chunkStatements.push(
      [
        `INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")`,
        `VALUES (${sqlString(key)}, ${sqlString(tradition)}, ${sqlString(text)}, 'reviewed', 2)`,
        `ON CONFLICT ("key") DO UPDATE SET`,
        `  "text" = EXCLUDED."text",`,
        `  "quality" = 'reviewed',`,
        `  "version" = EXCLUDED."version",`,
        `  "updated_at" = now();`,
        '',
      ].join('\n'),
    );
  }

  // --- 0013 compat_pages -----------------------------------------------------------------------
  const compat = await readReviewedDomain<string>('compat');
  const compatLines = header([
    '-- compat_pages.body_md — РЕДАКТОРСКИЙ надстроечный сид (блок A). Перезаписывает 0004 безусловно',
    '-- (без «AND body_md IS NULL»). СГЕНЕРИРОВАНО: tools/gen-corpus-reviewed.ts.',
  ]);
  const compatStatements: string[] = [];
  for (const id of Object.keys(compat).sort()) {
    const bodyMd = compat[id]!;
    const pair = compatById.get(id);
    if (!pair) {
      errors.push(`Пара совместимости «${id}» отсутствует в каноническом наборе (buildCorpus)`);
      continue;
    }
    if (!bodyMd || !bodyMd.trim()) {
      errors.push(`Пустой bodyMd пары «${id}»`);
      continue;
    }
    compatStatements.push(
      [
        `UPDATE "compat_pages" SET "body_md" = ${sqlString(bodyMd)}, "updated_at" = now()`,
        `WHERE "sign_a" = ${sqlString(pair.signA)} AND "sign_b" = ${sqlString(pair.signB)};`,
        '',
      ].join('\n'),
    );
  }

  // --- 0014 wiki_articles ----------------------------------------------------------------------
  const wiki = await readReviewedDomain<{ title?: string; bodyMd: string }>('wiki');
  const wikiLines = header([
    '-- wiki_articles — РЕДАКТОРСКИЙ надстроечный сид (блок A). Перезаписывает 0008 безусловно,',
    "-- ставит status='reviewed'. СГЕНЕРИРОВАНО: tools/gen-corpus-reviewed.ts. id строки стабилен",
    '-- (ON CONFLICT slug DO UPDATE) → FK interpretation_chunks.source_article_id остаётся валиден.',
  ]);
  const wikiStatements: string[] = [];
  for (const slug of Object.keys(wiki).sort()) {
    const article = wiki[slug]!;
    const section = wikiSectionBySlug.get(slug);
    if (!section) {
      errors.push(`Вики-статья «${slug}» отсутствует в каноническом наборе (buildWikiArticleDrafts)`);
      continue;
    }
    if (!article.bodyMd || !article.bodyMd.trim()) {
      errors.push(`Пустой bodyMd вики-статьи «${slug}»`);
      continue;
    }
    const title = article.title?.trim() || wikiTitleDraftBySlug.get(slug)!;
    wikiStatements.push(
      [
        `INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")`,
        `VALUES (${sqlString(slug)}, ${sqlString(section)}, ${sqlString(title)}, ${sqlString(article.bodyMd)}, 'reviewed', 2)`,
        `ON CONFLICT ("slug") DO UPDATE SET`,
        `  "title" = EXCLUDED."title",`,
        `  "body_md" = EXCLUDED."body_md",`,
        `  "status" = 'reviewed',`,
        `  "version" = EXCLUDED."version",`,
        `  "updated_at" = now();`,
        '',
      ].join('\n'),
    );
  }

  // --- 0015 stones (только текстовые поля) -----------------------------------------------------
  const stones = await readReviewedDomain<{ propertiesMd: string; suitableMd?: string | null; unsuitableMd?: string | null }>('stones');
  const stonesLines = header([
    '-- stones — РЕДАКТОРСКИЙ надстроечный сид (блок A). Обновляет ТОЛЬКО текстовые поля',
    '-- (properties/suitable/unsuitable), вычисленные массивы colors/decades/arcana/chakras НЕ трогает.',
    "-- Ставит status='reviewed'. СГЕНЕРИРОВАНО: tools/gen-corpus-reviewed.ts.",
  ]);
  const stoneStatements: string[] = [];
  for (const slug of Object.keys(stones).sort()) {
    const s = stones[slug]!;
    if (!stoneSlugs.has(slug)) {
      errors.push(`Камень «${slug}» отсутствует в tools/data/stones.json`);
      continue;
    }
    if (!s.propertiesMd || !s.propertiesMd.trim()) {
      errors.push(`Пустой propertiesMd камня «${slug}»`);
      continue;
    }
    stoneStatements.push(
      [
        `UPDATE "stones" SET "properties_md" = ${sqlString(s.propertiesMd)},`,
        `  "suitable_md" = ${sqlNullable(s.suitableMd)}, "unsuitable_md" = ${sqlNullable(s.unsuitableMd)},`,
        `  "status" = 'reviewed', "updated_at" = now()`,
        `WHERE "slug" = ${sqlString(slug)};`,
        '',
      ].join('\n'),
    );
  }

  if (errors.length) {
    console.error(`ОШИБКИ сборки reviewed-сидов (${errors.length}):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  await mkdir(SEED_DIR, { recursive: true });
  await writeFile(path.join(SEED_DIR, '0012_interpretation_chunks_reviewed.sql'), chunkLines + chunkStatements.join('\n'), 'utf8');
  await writeFile(path.join(SEED_DIR, '0013_compat_pages_reviewed.sql'), compatLines + compatStatements.join('\n'), 'utf8');
  await writeFile(path.join(SEED_DIR, '0014_wiki_articles_reviewed.sql'), wikiLines + wikiStatements.join('\n'), 'utf8');
  await writeFile(path.join(SEED_DIR, '0015_stones_reviewed.sql'), stonesLines + stoneStatements.join('\n'), 'utf8');

  console.log('Собраны reviewed-сиды:');
  console.log(`  0012 interpretation_chunks: ${chunkStatements.length} / 1601`);
  console.log(`  0013 compat_pages:          ${compatStatements.length} / 78`);
  console.log(`  0014 wiki_articles:         ${wikiStatements.length} / 189`);
  console.log(`  0015 stones:                ${stoneStatements.length} / 75`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
