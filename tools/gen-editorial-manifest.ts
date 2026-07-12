/**
 * Оффлайн data-step (см. §4 конвенций реализации): раскладывает весь текстовый корпус на
 * editor-батчи для многоагентной редактуры (docs/roadmap/prompts/text-корпус-редактура.md, блок A).
 * Пишет ТОЛЬКО в `_work/editorial/_manifest/**` (служебная папка, §«Соглашения по артефактам»),
 * committed-сиды не трогает.
 *
 * Источник перечня — канонические билдеры (`buildEditorialManifest`, `buildCorpus().compatPairs`,
 * `buildWikiArticleDrafts`, `tools/data/stones.json`), поэтому набор ключей манифеста ВСЕГДА
 * совпадает с тем, что реально сеется. Черновой текст идёт как семантический бриф редактору.
 *
 * Выход:
 *   _work/editorial/_manifest/index.json          — список всех батчей (batchId, пути, счётчики)
 *   _work/editorial/_manifest/<domain>/<safe>.json — содержимое батча (entries с брифами)
 * Редакторы (агенты) читают батч-манифест и пишут `_work/editorial/reviewed/<domain>/<safe>.json`.
 * Сборщик `tools/gen-corpus-reviewed.ts` собирает из reviewed-файлов сиды 0012–0015.
 *
 * Запуск: `pnpm data:editorial-manifest` (node --experimental-strip-types, как прочие data-steps —
 * см. tools/gen-corpus.ts про резолюцию @stassist/* пакетов; зависимые пакеты собираются заранее).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCorpus, buildEditorialManifest, buildWikiArticleDrafts, type WikiSectionSlug } from '@stassist/llm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MANIFEST_DIR = path.join(ROOT, '_work', 'editorial', '_manifest');
const STONES_JSON = path.join(ROOT, 'tools', 'data', 'stones.json');

const MAX_BATCH = 40;

type Domain = 'chunks' | 'compat' | 'wiki' | 'stones';

interface BatchManifest {
  batchId: string;
  domain: Domain;
  category: string;
  lengthBand: [number, number];
  /** Путь (относительно корня репо), куда редактор пишет результат. */
  reviewedPath: string;
  /** Формат reviewed-файла — подсказка редактору. */
  outputShape: string;
  entries: Record<string, unknown>[];
}

interface IndexEntry {
  batchId: string;
  domain: Domain;
  category: string;
  count: number;
  lengthBand: [number, number];
  manifestPath: string;
  reviewedPath: string;
}

function safeName(batchId: string): string {
  return batchId.replace(/[/#]/g, '__');
}

/** Разбивает массив на под-батчи ≤ maxSize равными частями (детерминированно). */
function chunkEvenly<T>(arr: T[], maxSize: number): T[][] {
  if (arr.length <= maxSize) return arr.length ? [arr] : [];
  const parts = Math.ceil(arr.length / maxSize);
  const size = Math.ceil(arr.length / parts);
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const WIKI_LENGTH_BANDS: Record<WikiSectionSlug, [number, number]> = {
  signs: [1200, 2500],
  planets: [1200, 2500],
  houses: [1000, 2000],
  aspects: [600, 1200],
  arcana: [900, 1800],
  schools: [1500, 3000],
  lunar_days: [400, 900],
  nakshatras: [300, 700], // честный каркас: детальные трактовки джйотиш — v1.x, не выдумывать
  stones: [800, 1600],
  glossary: [300, 900],
};

interface StoneRecord {
  slug: string;
  name: string;
  propertiesMd: string;
  colors: string[];
  zodiacSigns: string[];
  planets: string[];
  purposes: string[];
  suitableMd: string | null;
  unsuitableMd: string | null;
}

async function main(): Promise<void> {
  const index: IndexEntry[] = [];
  const batches: BatchManifest[] = [];

  // --- 1. Чанки (1601) ------------------------------------------------------------------------
  const chunkManifest = buildEditorialManifest();
  const chunkByBatch = new Map<string, typeof chunkManifest>();
  for (const e of chunkManifest) {
    const b = chunkByBatch.get(e.batchId) ?? [];
    b.push(e);
    chunkByBatch.set(e.batchId, b);
  }
  for (const [batchId, entries] of chunkByBatch) {
    batches.push({
      batchId,
      domain: 'chunks',
      category: entries[0]!.category,
      lengthBand: entries[0]!.lengthBand,
      reviewedPath: `_work/editorial/reviewed/chunks/${safeName(batchId)}.json`,
      outputShape: 'map: { "<key>": "<новый редакторский текст>" }',
      entries: entries.map((e) => ({ key: e.key, brief: e.brief })),
    });
  }

  // --- 2. Совместимость (78 пар) — группировка по первому знаку --------------------------------
  const { compatPairs } = buildCorpus();
  const compatByA = new Map<string, typeof compatPairs>();
  for (const p of compatPairs) {
    const b = compatByA.get(p.signA) ?? [];
    b.push(p);
    compatByA.set(p.signA, b);
  }
  for (const [signA, pairs] of compatByA) {
    const batchId = `compat/${signA}`;
    batches.push({
      batchId,
      domain: 'compat',
      category: 'compat',
      lengthBand: [700, 1500],
      reviewedPath: `_work/editorial/reviewed/compat/${safeName(batchId)}.json`,
      outputShape: 'map: { "<signA>__<signB>": "<новый bodyMd текста пары>" }',
      entries: pairs.map((p) => ({ id: `${p.signA}__${p.signB}`, signA: p.signA, signB: p.signB, brief: p.bodyMd })),
    });
  }

  // --- 3. Вики (189) — по секции, большие секции пре-чанкуются ---------------------------------
  const wikiDrafts = buildWikiArticleDrafts();
  const wikiBySection = new Map<WikiSectionSlug, typeof wikiDrafts>();
  for (const d of wikiDrafts) {
    const b = wikiBySection.get(d.section) ?? [];
    b.push(d);
    wikiBySection.set(d.section, b);
  }
  for (const [section, drafts] of wikiBySection) {
    const parts = chunkEvenly(drafts, MAX_BATCH);
    parts.forEach((part, i) => {
      const batchId = parts.length > 1 ? `wiki/${section}#${i + 1}` : `wiki/${section}`;
      batches.push({
        batchId,
        domain: 'wiki',
        category: `wiki_${section}`,
        lengthBand: WIKI_LENGTH_BANDS[section],
        reviewedPath: `_work/editorial/reviewed/wiki/${safeName(batchId)}.json`,
        outputShape: 'map: { "<slug>": { "title": "<заголовок>", "bodyMd": "<markdown статьи>" } }',
        entries: part.map((d) => ({ slug: d.slug, section: d.section, titleDraft: d.title, brief: d.bodyMd })),
      });
    });
  }

  // --- 4. Камни (75) — по ~19, только текстовые поля ------------------------------------------
  const stones = JSON.parse(await readFile(STONES_JSON, 'utf8')) as StoneRecord[];
  const stoneBatches = chunkEvenly(stones, 19);
  stoneBatches.forEach((part, i) => {
    const batchId = `stones/${i + 1}`;
    batches.push({
      batchId,
      domain: 'stones',
      category: 'stones',
      lengthBand: [400, 1000],
      reviewedPath: `_work/editorial/reviewed/stones/${safeName(batchId)}.json`,
      outputShape: 'map: { "<slug>": { "propertiesMd": "...", "suitableMd": "..."|null, "unsuitableMd": "..."|null } }',
      entries: part.map((s) => ({
        slug: s.slug,
        name: s.name,
        facts: { colors: s.colors, zodiacSigns: s.zodiacSigns, planets: s.planets, purposes: s.purposes },
        brief: s.propertiesMd,
        suitableDraft: s.suitableMd,
        unsuitableDraft: s.unsuitableMd,
      })),
    });
  });

  // --- Запись файлов --------------------------------------------------------------------------
  const DOMAINS: Domain[] = ['chunks', 'compat', 'wiki', 'stones'];
  for (const domain of DOMAINS) {
    await mkdir(path.join(MANIFEST_DIR, domain), { recursive: true });
  }
  for (const batch of batches) {
    const manifestPath = `_work/editorial/_manifest/${batch.domain}/${safeName(batch.batchId)}.json`;
    await writeFile(path.join(ROOT, manifestPath), JSON.stringify(batch, null, 1), 'utf8');
    index.push({
      batchId: batch.batchId,
      domain: batch.domain,
      category: batch.category,
      count: batch.entries.length,
      lengthBand: batch.lengthBand,
      manifestPath,
      reviewedPath: batch.reviewedPath,
    });
  }
  await writeFile(path.join(MANIFEST_DIR, 'index.json'), JSON.stringify(index, null, 1), 'utf8');

  const byDomain = index.reduce<Record<string, { batches: number; units: number }>>((acc, e) => {
    acc[e.domain] ??= { batches: 0, units: 0 };
    acc[e.domain]!.batches += 1;
    acc[e.domain]!.units += e.count;
    return acc;
  }, {});
  console.log(`Манифест редактуры: ${index.length} батчей, ${index.reduce((s, e) => s + e.count, 0)} единиц.`);
  for (const [domain, stat] of Object.entries(byDomain)) {
    console.log(`  ${domain}: ${stat.batches} батчей, ${stat.units} единиц.`);
  }
  console.log(`Индекс → ${path.join(MANIFEST_DIR, 'index.json')}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
