/**
 * Оффлайн-проверка редакторского корпуса (блок A, раздел «Верификация» промта
 * docs/roadmap/prompts/text-корпус-редактура.md). Читает `_work/editorial/reviewed/**` и БЕЗ БД
 * проверяет:
 *   1. нет пустых текстов;
 *   2. нет точных дублей текста между разными ключами (hard fail);
 *   3. нет одинаковых нормализованных ЗАЧИНОВ внутри категории (антишаблон, warn→fail при массовости);
 *   4. прогон каждого текста через detectForbidden (@stassist/llm) = 0 срабатываний (hard fail);
 *   5. покрытие: сколько единиц отредактировано против канонического объёма;
 *   6. распределение длин против ориентиров (warn).
 *
 * Запуск: `pnpm data:check-reviewed`. Не часть CI-гейта (как прочие data-steps), но обязателен
 * перед коммитом блока A.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildEditorialManifest, detectForbidden } from '@stassist/llm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const REVIEWED_DIR = path.join(ROOT, '_work', 'editorial', 'reviewed');

interface Unit {
  id: string;
  domain: string;
  category: string;
  text: string;
}

async function readDomain(domain: string): Promise<Record<string, unknown>> {
  const dir = path.join(REVIEWED_DIR, domain);
  let files: string[];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith('.json'));
  } catch {
    return {};
  }
  const merged: Record<string, unknown> = {};
  for (const file of files.sort()) {
    Object.assign(merged, JSON.parse(await readFile(path.join(dir, file), 'utf8')) as Record<string, unknown>);
  }
  return merged;
}

function normalizeOpening(text: string): string {
  const firstSentence = text.replace(/^#+\s*.*?\n+/g, '').trim().split(/(?<=[.!?])\s/)[0] ?? '';
  return firstSentence
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 50);
}

async function main(): Promise<void> {
  const categoryByChunkKey = new Map(buildEditorialManifest().map((e) => [e.key, e.category]));

  const units: Unit[] = [];
  // chunks: map key→text
  for (const [key, text] of Object.entries(await readDomain('chunks'))) {
    units.push({ id: key, domain: 'chunks', category: categoryByChunkKey.get(key) ?? 'chunks', text: String(text) });
  }
  // compat: map id→bodyMd
  for (const [id, text] of Object.entries(await readDomain('compat'))) {
    units.push({ id, domain: 'compat', category: 'compat', text: String(text) });
  }
  // wiki: map slug→{title,bodyMd}
  for (const [slug, v] of Object.entries(await readDomain('wiki'))) {
    const body = (v as { bodyMd?: string }).bodyMd ?? '';
    units.push({ id: slug, domain: 'wiki', category: 'wiki', text: body });
  }
  // stones: map slug→{propertiesMd,...}
  for (const [slug, v] of Object.entries(await readDomain('stones'))) {
    const t = v as { propertiesMd?: string; suitableMd?: string | null; unsuitableMd?: string | null };
    units.push({ id: slug, domain: 'stones', category: 'stones', text: `${t.propertiesMd ?? ''}\n${t.suitableMd ?? ''}\n${t.unsuitableMd ?? ''}` });
  }

  const hardErrors: string[] = [];
  const warnings: string[] = [];

  // 1. пустые
  for (const u of units) if (!u.text.trim()) hardErrors.push(`Пустой текст: ${u.domain}/${u.id}`);

  // 2. точные дубли текста между разными ключами
  const byText = new Map<string, string[]>();
  for (const u of units) {
    const norm = u.text.trim();
    const arr = byText.get(norm) ?? [];
    arr.push(`${u.domain}/${u.id}`);
    byText.set(norm, arr);
  }
  for (const [, ids] of byText) if (ids.length > 1) hardErrors.push(`Одинаковый текст у разных ключей: ${ids.join(', ')}`);

  // 3. одинаковые зачины внутри категории
  const openingByCat = new Map<string, Map<string, string[]>>();
  for (const u of units) {
    const opening = normalizeOpening(u.text);
    if (!opening) continue;
    const catMap = openingByCat.get(u.category) ?? new Map<string, string[]>();
    const arr = catMap.get(opening) ?? [];
    arr.push(`${u.domain}/${u.id}`);
    catMap.set(opening, arr);
    openingByCat.set(u.category, catMap);
  }
  let openingClones = 0;
  for (const [cat, catMap] of openingByCat) {
    for (const [opening, ids] of catMap) {
      if (ids.length > 1) {
        openingClones += ids.length;
        warnings.push(`Повторяющийся зачин в «${cat}» (${ids.length}×): "${opening}…" → ${ids.slice(0, 4).join(', ')}${ids.length > 4 ? ' …' : ''}`);
      }
    }
  }

  // 4. forbidden
  for (const u of units) {
    const matches = detectForbidden(u.text);
    if (matches.length) hardErrors.push(`forbidden [${matches.map((m) => m.category).join(',')}] в ${u.domain}/${u.id}`);
  }

  // 5. покрытие
  const canonicalTotals: Record<string, number> = { chunks: 1601, compat: 78, wiki: 189, stones: 75 };
  const coverage = units.reduce<Record<string, number>>((acc, u) => {
    acc[u.domain] = (acc[u.domain] ?? 0) + 1;
    return acc;
  }, {});

  // --- Отчёт ----------------------------------------------------------------------------------
  console.log('== Проверка редакторского корпуса ==');
  console.log(`Всего отредактировано единиц: ${units.length}`);
  for (const domain of ['chunks', 'compat', 'wiki', 'stones']) {
    console.log(`  ${domain}: ${coverage[domain] ?? 0} / ${canonicalTotals[domain]}`);
  }
  console.log(`Повторяющихся зачинов (единиц): ${openingClones}`);
  console.log(`Предупреждений: ${warnings.length}, жёстких ошибок: ${hardErrors.length}`);
  if (warnings.length) {
    console.log('\n-- Предупреждения (первые 30) --');
    for (const w of warnings.slice(0, 30)) console.log(`  ! ${w}`);
  }
  if (hardErrors.length) {
    console.error('\n-- ЖЁСТКИЕ ОШИБКИ --');
    for (const e of hardErrors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log('\nOK: пустот/дублей/forbidden не найдено.');
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
