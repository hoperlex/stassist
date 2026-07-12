/**
 * Каталог камней (Ф6, см. docs/architecture/22-модель-данных.md §6, docs/roadmap/prompts/
 * f6-нумерология-и-камни.md req.4). Единый источник правды для словарей фильтров (знак/планета/
 * назначение) — используется `apps/api` (роут `/stones`), `apps/web` (SSR-страницы `/kamni/*`,
 * фильтры) и `tools/gen-stones.ts` (data-step, генерация датасета).
 *
 * `STONE_PURPOSES` — фиксированный словарь «назначений» (находка [data-model] в
 * _work/build/findings/f6.md: «Фильтр камней по назначению требуется, но в схеме stones поля нет»).
 * Список — общепринятые в нише категории (см. docs/research/06-нумерология-и-минералы.md §3:
 * «Фильтры: по знаку, цвету, назначению («на деньги», «на любовь»)»).
 */
import { z } from 'zod';
import { zodiacSignEnSlugSchema } from './zodiac.js';

export const STONE_PURPOSES = [
  'money',
  'love',
  'protection',
  'health',
  'career',
  'luck',
  'wisdom',
  'harmony',
] as const;
export type StonePurpose = (typeof STONE_PURPOSES)[number];
export const stonePurposeSchema = z.enum(STONE_PURPOSES);

export const STONE_PURPOSE_NAME_RU: Record<StonePurpose, string> = {
  money: 'на деньги и достаток',
  love: 'на любовь и отношения',
  protection: 'защита от негатива',
  health: 'для здоровья',
  career: 'для карьеры и успеха',
  luck: 'на удачу',
  wisdom: 'для мудрости и интуиции',
  harmony: 'для гармонии и спокойствия',
};

/**
 * Планеты (для соответствий камень↔планета, «наваратна»/классические western-соответствия, см.
 * doc 06 §3) — намеренно НЕЗАВИСИМЫЙ от `@stassist/ui` `BODY_GLYPHS` список (packages/shared не
 * должен зависеть от packages/ui, см. §2 конвенций реализации — направление зависимостей: ui →
 * shared, не наоборот), но те же 10 slug'ов классических тел для согласованности с ChartWheel.
 */
export const STONE_PLANETS = [
  'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
] as const;
export type StonePlanetSlug = (typeof STONE_PLANETS)[number];
export const stonePlanetSchema = z.enum(STONE_PLANETS);

export const STONE_PLANET_NAME_RU: Record<StonePlanetSlug, string> = {
  sun: 'Солнце',
  moon: 'Луна',
  mercury: 'Меркурий',
  venus: 'Венера',
  mars: 'Марс',
  jupiter: 'Юпитер',
  saturn: 'Сатурн',
  uranus: 'Уран',
  neptune: 'Нептун',
  pluto: 'Плутон',
};

/** Слаги 7 чакр — СОВПАДАЮТ с `MATRIX_HEALTH_CHAKRAS[].slug` в `@stassist/llm` (см. doc-комментарий
 *  `packages/db/src/schema/stones.ts`); дублируется здесь как строковый литерал (не типовая
 *  зависимость shared→llm), т.к. `@stassist/llm` зависит от `@stassist/shared`, а не наоборот. */
export const STONE_CHAKRAS = [
  'health_root',
  'health_sacral',
  'health_solar_plexus',
  'health_heart',
  'health_throat',
  'health_third_eye',
  'health_crown',
] as const;
export type StoneChakraSlug = (typeof STONE_CHAKRAS)[number];
export const stoneChakraSchema = z.enum(STONE_CHAKRAS);

export const STONE_CHAKRA_NAME_RU: Record<StoneChakraSlug, string> = {
  health_root: 'корневая чакра',
  health_sacral: 'сакральная чакра',
  health_solar_plexus: 'чакра солнечного сплетения',
  health_heart: 'сердечная чакра',
  health_throat: 'горловая чакра',
  health_third_eye: 'чакра третьего глаза',
  health_crown: 'коронная чакра',
};

export const stoneDecadeSchema = z.object({
  sign: zodiacSignEnSlugSchema,
  decadeIndex: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});
export type StoneDecade = z.infer<typeof stoneDecadeSchema>;

export const stoneStatusSchema = z.enum(['draft', 'reviewed']);
export type StoneStatus = z.infer<typeof stoneStatusSchema>;

export const stoneResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  propertiesMd: z.string(),
  colors: z.array(z.string()),
  zodiacSigns: z.array(zodiacSignEnSlugSchema),
  planets: z.array(stonePlanetSchema),
  decades: z.array(stoneDecadeSchema),
  arcana: z.array(z.number().int().min(1).max(22)),
  chakras: z.array(z.string()),
  purposes: z.array(stonePurposeSchema),
  suitableMd: z.string().nullable(),
  unsuitableMd: z.string().nullable(),
  status: stoneStatusSchema,
});
export type StoneResponse = z.infer<typeof stoneResponseSchema>;

export const stoneListResponseSchema = z.object({ items: z.array(stoneResponseSchema) });
export type StoneListResponse = z.infer<typeof stoneListResponseSchema>;

/** Query-параметры `/api/v1/stones` (см. apps/api/src/routes/stones.ts) — все опциональны,
 *  комбинируются через AND (знак И назначение И…). */
export const stoneListQuerySchema = z.object({
  sign: zodiacSignEnSlugSchema.optional(),
  planet: stonePlanetSchema.optional(),
  purpose: stonePurposeSchema.optional(),
  color: z.string().optional(),
  arcanum: z.coerce.number().int().min(1).max(22).optional(),
});
export type StoneListQuery = z.infer<typeof stoneListQuerySchema>;
