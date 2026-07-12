/**
 * Контракты анонимных расчётных эндпоинтов `/api/v1/calc/*` (см. docs/roadmap/prompts/
 * f3-калькуляторы-и-карта.md, требование 4): натал уже есть (`chartInputSchema`/`chartDataSchema`
 * из ./chart.js) — здесь добавляются синастрия (совместимость), лунный календарь, страницы пар
 * совместимости и анонимный шеринг карты (OG-карточки).
 *
 * ВАЖНО про приватность (см. §6 конвенций реализации, requirement 4 промта): эти схемы
 * сознательно НЕ включают ничего, что попадало бы в БД/логи как ПД — anon-расчёт идёт «на лету»,
 * персистится (в `chart_shares`) только `positions` — обезличенный срез результата без даты/
 * времени/места рождения (аналог `posts.chart_id`, см. docs/architecture/22-модель-данных.md §7).
 */
import { z } from 'zod';
import { aspectSchema, chartDataSchema, chartInputSchema } from './chart.js';
import { zodiacSignSlugSchema } from './zodiac.js';

// ---------------------------------------------------------------------------------------------
// Синастрия (совместимость по натальным картам двух людей)
// ---------------------------------------------------------------------------------------------

export const synastryCalcRequestSchema = z.object({
  a: chartInputSchema,
  b: chartInputSchema,
});
export type SynastryCalcRequest = z.infer<typeof synastryCalcRequestSchema>;

/** Межкартовый аспект: bodyA/bodyB — ключи с префиксом `a:`/`b:` (см. astro-core aspects/synastry.ts). */
export const synastryCalcResponseSchema = z.object({
  a: chartDataSchema,
  b: chartDataSchema,
  crossAspects: z.array(aspectSchema),
});
export type SynastryCalcResponse = z.infer<typeof synastryCalcResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Лунный календарь (astro_calendar) — публичный, опорная локация фиксирована (см. README worker)
// ---------------------------------------------------------------------------------------------

export const referenceLocationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  tzId: z.string(),
});
export type ReferenceLocation = z.infer<typeof referenceLocationSchema>;

/** Имена фаз — те же, что в `@stassist/astro-core` `MoonPhaseName` (без перевода/дублирования). */
export const moonPhaseNameSchema = z.enum([
  'new', 'waxing_crescent', 'first_quarter', 'waxing_gibbous',
  'full', 'waning_gibbous', 'last_quarter', 'waning_crescent',
]);
export type MoonPhaseNameDto = z.infer<typeof moonPhaseNameSchema>;

export const lunarCalendarDaySchema = z.object({
  date: z.string(), // YYYY-MM-DD
  lunarDay: z.number().int().min(1).max(30),
  moonSignIndex: z.number().int().min(0).max(11),
  phaseName: moonPhaseNameSchema,
  phaseAngleDeg: z.number(),
  isVoidOfCourse: z.boolean(),
  voidFromIso: z.string().nullable(),
  voidToIso: z.string().nullable(),
  retrogradeBodies: z.array(z.string()),
  /** Тела, сменившие знак относительно предыдущего предрасчитанного дня (см. worker README —
   *  упрощение MVP: сравнение «снимков» полудня, а не точный момент ингресса). */
  signIngresses: z.array(z.object({ body: z.string(), signIndex: z.number().int().min(0).max(11) })),
});
export type LunarCalendarDay = z.infer<typeof lunarCalendarDaySchema>;

export const lunarCalendarMonthResponseSchema = z.object({
  yyyyMm: z.string().regex(/^\d{4}-\d{2}$/),
  referenceLocation: referenceLocationSchema,
  days: z.array(lunarCalendarDaySchema),
  /** true, если worker ещё не насчитал окно на этот месяц (честный empty-state, а не 500/фейк). */
  computed: z.boolean(),
});
export type LunarCalendarMonthResponse = z.infer<typeof lunarCalendarMonthResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Страницы пар совместимости (compat_pages) — таблицу создаёт Ф3, `bodyMd` заливает Ф4
// ---------------------------------------------------------------------------------------------

export const compatPageResponseSchema = z.object({
  signA: zodiacSignSlugSchema,
  signB: zodiacSignSlugSchema,
  /** null = текст пары ещё не залит Ф4 — страница обязана показать честный empty-state. */
  bodyMd: z.string().nullable(),
});
export type CompatPageResponse = z.infer<typeof compatPageResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Анонимный шеринг карты (OG-карточки) — см. docs/architecture/21 §6, findings f3.md
// [internal-completeness] «OG-шеринг без постоянного URL».
// ---------------------------------------------------------------------------------------------

/** `transit_day` (Ф9 «Созвездие») — share-карточка отклика «Небо дня»: натал пользователя в
 *  `positions`, транзитный снапшот дня (`sky_days.transit_positions`) в `positionsB`,
 *  подпись отклика — в `caption`. См. docs/strategy/11-соцраздел-созвездие.md §3. */
export const shareKindSchema = z.enum(['natal', 'synastry', 'transit_day']);
export type ShareKind = z.infer<typeof shareKindSchema>;

/** Подпись плашки отклика (только kind='transit_day'): «В точку · Марс □ Солнце, орб 1.2°».
 *  Без ПД по построению; на бэке дополнительно прогоняется через classifyUgcText. */
export const shareCaptionSchema = z.string().trim().min(1).max(120);

/** Обезличенный срез ChartData — то, что реально попадает в `chart_shares` (без input/даты/места). */
export const sharePositionsSchema = z.object({
  bodies: chartDataSchema.shape.bodies,
  points: chartDataSchema.shape.points,
  angles: chartDataSchema.shape.angles,
  houses: chartDataSchema.shape.houses,
  aspects: chartDataSchema.shape.aspects,
  meta: z.object({
    houseSystem: chartDataSchema.shape.meta.shape.houseSystem,
    zodiac: chartDataSchema.shape.meta.shape.zodiac,
    noHouses: chartDataSchema.shape.meta.shape.noHouses,
  }),
});
export type SharePositions = z.infer<typeof sharePositionsSchema>;

/**
 * Ф7 (см. docs/roadmap/prompts/f7-вики-и-коммьюнити.md req.1 M8, docs/architecture/
 * 22-модель-данных.md §7 «posts.chart_id ссылается на копию карты без ПД»): анонимизация полной
 * `ChartData` для публикации поста в коммьюнити. Переиспользует ТОТ ЖЕ `sharePositionsSchema`,
 * что и `chart_shares` (Ф3, OG-шеринг) — обе фичи требуют идентичного среза (позиции/дома/
 * аспекты, БЕЗ input/даты/времени/места/имени). `.parse()` — активная защита (zod `z.object` по
 * умолчанию отбрасывает нераспознанные ключи, «strip»), а не просто TS-типизация: даже если в
 * будущем `ChartData` случайно обрастёт PD-полем, оно НЕ попадёт в результат, т.к. объект ниже
 * собирается через явный whitelist полей, а не через spread.
 *
 * ПРОВЕРЕНО unit-тестом без БД (см. calc.test.ts): результат не содержит birthDate/birthTime/
 * place/lat/lon/name/tzId — эти поля физически отсутствуют и в исходной `ChartData` (см. заголовок
 * chart.ts — вход/выход разделены, `ChartData` никогда не хранит `ChartInput`), поэтому здесь
 * достаточно доказать, что мы возвращаем СТРОГО whitelist полей.
 */
export function anonymizeChartData(data: z.infer<typeof chartDataSchema>): SharePositions {
  return sharePositionsSchema.parse({
    bodies: data.bodies,
    points: data.points,
    angles: data.angles,
    houses: data.houses,
    aspects: data.aspects,
    meta: {
      houseSystem: data.meta.houseSystem,
      zodiac: data.meta.zodiac,
      noHouses: data.meta.noHouses,
    },
  });
}

export const chartShareCreateRequestSchema = z.object({
  kind: shareKindSchema,
  positions: sharePositionsSchema,
  /** Для synastry — вторая карта; для transit_day — транзитный снапшот дня. */
  positionsB: sharePositionsSchema.optional(),
  /** Только для transit_day — см. shareCaptionSchema. */
  caption: shareCaptionSchema.optional(),
  theme: z.enum(['light', 'dark']).default('light'),
});
export type ChartShareCreateRequest = z.infer<typeof chartShareCreateRequestSchema>;

export const chartShareResponseSchema = z.object({
  slug: z.string(),
  shareUrl: z.string(),
  ogImageReady: z.boolean(),
});
export type ChartShareResponse = z.infer<typeof chartShareResponseSchema>;

/** Полные данные снапшота — для SSR-страницы `/podelitsya/{slug}` (рендер ChartWheel + og:image). */
export const chartShareDetailsResponseSchema = z.object({
  slug: z.string(),
  kind: shareKindSchema,
  positions: sharePositionsSchema,
  positionsB: sharePositionsSchema.nullable(),
  /** Только для transit_day (см. shareCaptionSchema), иначе null. */
  caption: z.string().nullable().default(null),
  theme: z.enum(['light', 'dark']),
  ogImageReady: z.boolean(),
});
export type ChartShareDetailsResponse = z.infer<typeof chartShareDetailsResponseSchema>;
