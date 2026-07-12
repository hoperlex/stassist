/**
 * Контракты вики (Ф7, M7) — см. docs/architecture/22-модель-данных.md §6, docs/roadmap/prompts/
 * f7-вики-и-коммьюнити.md. `wiki_articles` — таблицу создаёт Ф4 ПУСТОЙ, Ф7 наполняет
 * (`tools/gen-wiki.ts`) и добавляет REST-контракт.
 */
import { z } from 'zod';

export const WIKI_SECTIONS = [
  'planets', 'signs', 'houses', 'aspects', 'schools',
  'nakshatras', 'arcana', 'lunar_days', 'stones', 'glossary',
] as const;
export const wikiArticleSectionSchema = z.enum(WIKI_SECTIONS);
export type WikiArticleSection = z.infer<typeof wikiArticleSectionSchema>;

export const WIKI_SECTION_NAME_RU: Record<WikiArticleSection, string> = {
  planets: 'Планеты',
  signs: 'Знаки зодиака',
  houses: 'Дома гороскопа',
  aspects: 'Аспекты',
  schools: 'Школы и традиции',
  nakshatras: 'Накшатры',
  arcana: 'Арканы Таро (Матрица судьбы)',
  lunar_days: 'Лунные дни',
  stones: 'Камни и минералы',
  glossary: 'Глоссарий',
};

/** `draft` — черновик (SSR ПОКАЗЫВАЕТ с бейджем «требует редактуры», см. §6 конвенций реализации
 *  «правило непустоты»), `reviewed` — прошла редактуру, `published` — опубликована редактором. Для
 *  правила непустоты Ф7 трактует и `draft`, и `reviewed`, и `published` как «показывать на SSR». */
export const wikiArticleStatusSchema = z.enum(['draft', 'reviewed', 'published']);
export type WikiArticleStatus = z.infer<typeof wikiArticleStatusSchema>;

export const wikiArticleSeoSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  /** Слаги статей раздела planets/signs и т.п. для внутренней перелинковки (req.3 промта —
   *  «перелинковка с калькуляторами и гороскопами»). */
  relatedArticleSlugs: z.array(z.string()).default([]),
  relatedCalculatorPaths: z.array(z.string()).default([]),
});
export type WikiArticleSeo = z.infer<typeof wikiArticleSeoSchema>;

export const wikiArticleResponseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  section: wikiArticleSectionSchema,
  title: z.string(),
  bodyMd: z.string().nullable(),
  status: wikiArticleStatusSchema,
  editorId: z.string().uuid().nullable(),
  version: z.number().int(),
  seo: wikiArticleSeoSchema.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type WikiArticleResponse = z.infer<typeof wikiArticleResponseSchema>;

export const wikiArticleListItemSchema = wikiArticleResponseSchema.omit({ bodyMd: true, seo: true });
export type WikiArticleListItem = z.infer<typeof wikiArticleListItemSchema>;

export const wikiArticleListQuerySchema = z.object({
  section: wikiArticleSectionSchema.optional(),
  /** pg_trgm поиск по title+body_md (req.4 промта) — пусто/не задан = обычный листинг раздела. */
  q: z.string().min(2).max(200).optional(),
  // max=1000 — не только для листинга разделов (≤189 статей на раздел с запасом), но и для
  // sitemap.xml (apps/web/server/index.ts запрашивает ВЕСЬ каталог статей одним вызовом, см.
  // doc-комментарий там же); найдено живым smoke-тестом Ф7 (сначала было max=100 → 400 на
  // limit=500 → sitemap молча терял вики-URL, см. _report/build/f7-отчёт.md).
  limit: z.coerce.number().int().min(1).max(1000).default(50),
});
export type WikiArticleListQuery = z.infer<typeof wikiArticleListQuerySchema>;

export const wikiArticleListResponseSchema = z.object({ items: z.array(wikiArticleListItemSchema), total: z.number().int() });
export type WikiArticleListResponse = z.infer<typeof wikiArticleListResponseSchema>;

export const wikiArticleUpdateRequestSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  bodyMd: z.string().min(1).optional(),
  status: wikiArticleStatusSchema.optional(),
});
export type WikiArticleUpdateRequest = z.infer<typeof wikiArticleUpdateRequestSchema>;

export const wikiArticleRevisionSchema = z.object({
  id: z.string().uuid(),
  articleId: z.string().uuid(),
  version: z.number().int(),
  title: z.string(),
  bodyMd: z.string().nullable(),
  editorId: z.string().uuid().nullable(),
  createdAt: z.string(),
});
export type WikiArticleRevision = z.infer<typeof wikiArticleRevisionSchema>;

export const wikiArticleRevisionListResponseSchema = z.object({ items: z.array(wikiArticleRevisionSchema) });
export type WikiArticleRevisionListResponse = z.infer<typeof wikiArticleRevisionListResponseSchema>;

/**
 * Правило привязки `interpretation_chunks.key` → статья-источник (закрывает МАЖОР-находку
 * [missing-step] f7.md «правило привязки не определено»). ЧИСТАЯ функция — единственный источник
 * правды, используется и `tools/gen-wiki.ts` (бэкфилл `source_article_id`), и (при желании)
 * рантаймом. Возвращает СЛАГ статьи-источника (или null, если для ключа статья не назначена —
 * напр. `numerology:*` не привязывается к конкретной статье раздела arcana/schools однозначно).
 *
 * Правило:
 *  - `sign:{sign}:overview`               → `signs/{sign}`
 *  - `planet:{planet}:overview`           → `planets/{planet}`
 *  - `house:{n}:overview`                 → `houses/house-{n}`
 *  - `aspect:{angle}:overview`            → `aspects/{angle}` (если в стартовом наборе, иначе null)
 *  - `planet_in_sign:{planet}:{sign}`     → `planets/{planet}` (статья планеты — она описывает
 *    ВСЕ проявления планеты, включая позиции по знакам; см. req.2 промта «планета в знаке
 *    привязывается к статье планеты и/или знака» — выбрана планета как основной «дом» чанка)
 *  - `planet_in_house:{planet}:{n}`       → `planets/{planet}`
 *  - `point_in_sign:{point}:{sign}`       → `planets/{point}` (кармические точки — тот же раздел)
 *  - `point_in_house:{point}:{n}`         → `planets/{point}`
 *  - `asc_in_sign:{sign}`                 → `signs/{sign}`
 *  - `aspect:{a}:{angle}:{b}`             → `aspects/{angle}` (если в стартовом наборе)
 *  - `arcanum:{n}:*`                      → `arcana/arkan-{n}`
 *  - остальное (`numerology:*`)           → null (не привязывается к конкретной статье раздела —
 *    нумерологический корпус привязан концептуально к разделу `schools` целиком, не к одной статье)
 */
export function articleSlugForChunkKey(key: string): { section: WikiArticleSection; slug: string } | null {
  const parts = key.split(':');
  const [kind, a, b] = parts;
  switch (kind) {
    case 'sign':
      return a ? { section: 'signs', slug: a } : null;
    case 'planet':
      return a ? { section: 'planets', slug: a } : null;
    case 'house':
      return a ? { section: 'houses', slug: `house-${a}` } : null;
    case 'point_in_sign':
    case 'point_in_house':
    case 'planet_in_sign':
    case 'planet_in_house':
      return a ? { section: 'planets', slug: a } : null;
    case 'asc_in_sign':
      return a ? { section: 'signs', slug: a } : null;
    case 'aspect': {
      // 'aspect:{angle}:overview' (2 части после kind) ИЛИ 'aspect:{a}:{angle}:{b}' (3 части).
      const angle = parts.length === 3 ? a : b;
      return angle ? { section: 'aspects', slug: angle } : null;
    }
    case 'arcanum':
      return a ? { section: 'arcana', slug: `arkan-${a}` } : null;
    default:
      return null;
  }
}
