/**
 * Единственный источник правды по формату ключей `interpretation_chunks.key` (см.
 * docs/roadmap/31-конвенции-реализации.md §6 «карта владения seed-контентом» и
 * docs/architecture/22-модель-данных.md §6). И генератор корпуса (`src/corpus/*`), и сериализатор
 * фактов (`src/facts/serializer.ts`)/ретривер (`src/rag/retriever.ts`) строят ключи ТОЛЬКО через
 * эти функции — если формат когда-нибудь изменится, меняется в одном месте, и запись/чтение не
 * могут разойтись.
 *
 * Разрешение нескольких неоднозначностей источников (задокументировано явно, т.к. ни один из
 * документов пакета не даёт исчерпывающего списка — см. _work/build/findings/f4.md, находки
 * [наполнение-контентом-кросс-фаза]/[наполнение-контентом-покрытие-корпуса]):
 *  - «планеты(14)» архетипики = 10 классических тел + chiron + north_node + lilith + selena.
 *    south_node НЕ получает отдельный `planet:*:overview` (его архетип излагается внутри текста
 *    north_node — узлы традиционно описываются как одна ось), но ПОЛУЧАЕТ собственные
 *    `point_in_sign`/`point_in_house`/аспект-фоллбэк записи (разные темы по знаку/дому важны).
 *  - «аспекты(7)» архетипики — исходники (доки 22/31) не согласованы с кодом astro-core (5
 *    мажорных + 6 минорных = 11, см. packages/astro-core/src/aspects/presets.ts). Чтобы
 *    гарантировать «нет пустых ключей» для ЛЮБОГО аспекта, который реально может вернуть
 *    aspects-движок (aspectSet='major_minor'), сеем overview для ВСЕХ 11 типов — это
 *    надмножество «7», а не подмножество, и поэтому безопаснее для ретрива.
 *  - Аспекты «между объектами» (`aspect:sun:square:moon`) сеем для всех пар среди 10 классических
 *    планет (45 пар × 5 мажорных = 225) и для 4 кармических точек (chiron/north_node/lilith/
 *    selena, без south_node — см. выше) × 10 планет × 5 мажорных = 200. Если движок вернёт
 *    аспект вне этого покрытия (напр. south_node×chiron), ретривер (см. src/rag/retriever.ts)
 *    откатывается на `aspect:<angle>:overview` — НЕ на пустоту и НЕ на выдумку.
 */
import { ZODIAC_SIGN_EN_SLUGS, type ZodiacSignEnSlug, zodiacEnSlugByIndex } from '@stassist/shared';

export { zodiacEnSlugByIndex, ZODIAC_SIGN_EN_SLUGS };
export type { ZodiacSignEnSlug };

// ---------------------------------------------------------------------------------------------
// Объекты карты
// ---------------------------------------------------------------------------------------------

/** 10 классических планет/светил — источник: packages/shared chart.ts `celestialBodyKeySchema`
 *  минус `chiron` (Хирон здесь трактуется как кармическая точка, см. заголовок файла). */
export const CLASSICAL_PLANET_SLUGS = [
  'sun', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
] as const;
export type ClassicalPlanetSlug = (typeof CLASSICAL_PLANET_SLUGS)[number];

/** Архетипика «планеты» (14) — см. заголовок файла. */
export const PLANET_OVERVIEW_SLUGS = [
  ...CLASSICAL_PLANET_SLUGS,
  'chiron', 'north_node', 'lilith', 'selena',
] as const;
export type PlanetOverviewSlug = (typeof PLANET_OVERVIEW_SLUGS)[number];

/** Кармические точки, для которых сеем point_in_sign/point_in_house (5, включая south_node). */
export const KARMIC_POINT_SLUGS = ['chiron', 'north_node', 'south_node', 'lilith', 'selena'] as const;
export type KarmicPointSlug = (typeof KARMIC_POINT_SLUGS)[number];

/** Кармические точки, для которых сеем аспекты к классическим планетам (4, без south_node). */
export const KARMIC_ASPECT_POINT_SLUGS = ['chiron', 'north_node', 'lilith', 'selena'] as const;
export type KarmicAspectPointSlug = (typeof KARMIC_ASPECT_POINT_SLUGS)[number];

/** Стихии (4) и кресты (3) — общепринятые названия, не варьируются между школами. */
export const ELEMENT_SLUGS = ['fire', 'earth', 'air', 'water'] as const;
export type ElementSlug = (typeof ELEMENT_SLUGS)[number];
export const CROSS_SLUGS = ['cardinal', 'fixed', 'mutable'] as const;
export type CrossSlug = (typeof CROSS_SLUGS)[number];

/** Все 11 типов аспектов из astro-core (`aspectAngleNameSchema`, major+minor) — источник правды
 *  дублирован явными строками, а не импортом из @stassist/astro-core, т.к. packages/llm
 *  намеренно не зависит от astro-core (сериализатор работает над уже вычисленным ChartData). */
export const ASPECT_ANGLE_SLUGS = [
  'conjunction', 'opposition', 'trine', 'square', 'sextile',
  'quincunx', 'semisextile', 'semisquare', 'sesquiquadrate', 'quintile', 'biquintile',
] as const;
export type AspectAngleSlug = (typeof ASPECT_ANGLE_SLUGS)[number];

/** 5 мажорных — подмножество для генерации chunks «аспект между парой объектов» (комбинаторно
 *  ограничиваем объём корпуса минорными не покрываем попарно, см. заголовок файла). */
export const MAJOR_ASPECT_SLUGS = ['conjunction', 'sextile', 'square', 'trine', 'opposition'] as const;
export type MajorAspectSlug = (typeof MAJOR_ASPECT_SLUGS)[number];

/** Порядок приоритета объектов для канонизации пары в aspectBetweenKey — ДОЛЖЕН включать все
 *  слаги, которые могут встретиться как bodyA/bodyB в ChartData.aspects[] (после нормализации
 *  через normalizePointSlug ниже). */
const OBJECT_PRIORITY = [
  'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
  'chiron', 'north_node', 'south_node', 'lilith', 'selena',
] as const;

function priorityOf(slug: string): number {
  const idx = OBJECT_PRIORITY.indexOf(slug as (typeof OBJECT_PRIORITY)[number]);
  return idx === -1 ? OBJECT_PRIORITY.length : idx;
}

/**
 * ChartData хранит точки под ключами `meanNode`/`trueNode`/`meanLilith`/`trueLilith`/`selena`
 * (camelCase, см. packages/shared/src/schemas/chart.ts `pointKeySchema`) — корпус не различает
 * среднюю/истинную версию (редакционное упрощение, см. заголовок файла). `southNode` НЕ приходит
 * из astro-core вообще (не поле ChartData) — его считает сериализатор (northNode + 180°) и
 * передаёт сюда уже под слагом `south_node` (тогда normalizePointSlug — passthrough).
 */
export function normalizePointSlug(chartDataKey: string): string {
  switch (chartDataKey) {
    case 'meanNode':
    case 'trueNode':
      return 'north_node';
    case 'meanLilith':
    case 'trueLilith':
      return 'lilith';
    case 'selena':
      return 'selena';
    case 'chiron':
      return 'chiron';
    default:
      return chartDataKey;
  }
}

// ---------------------------------------------------------------------------------------------
// Архетипика
// ---------------------------------------------------------------------------------------------

export function signOverviewKey(sign: ZodiacSignEnSlug): string {
  return `sign:${sign}:overview`;
}
export function planetOverviewKey(planet: PlanetOverviewSlug): string {
  return `planet:${planet}:overview`;
}
export function houseOverviewKey(house: number): string {
  return `house:${house}:overview`;
}
export function aspectOverviewKey(angle: AspectAngleSlug | string): string {
  return `aspect:${angle}:overview`;
}
export function elementOverviewKey(element: ElementSlug): string {
  return `element:${element}:overview`;
}
export function crossOverviewKey(cross: CrossSlug): string {
  return `cross:${cross}:overview`;
}

// ---------------------------------------------------------------------------------------------
// Планета/точка × знак/дом
// ---------------------------------------------------------------------------------------------

export function planetInSignKey(planet: ClassicalPlanetSlug | string, sign: ZodiacSignEnSlug): string {
  return `planet_in_sign:${planet}:${sign}`;
}
export function planetInHouseKey(planet: ClassicalPlanetSlug | string, house: number): string {
  return `planet_in_house:${planet}:${house}`;
}
export function ascInSignKey(sign: ZodiacSignEnSlug): string {
  return `asc_in_sign:${sign}`;
}
export function pointInSignKey(point: KarmicPointSlug | string, sign: ZodiacSignEnSlug): string {
  return `point_in_sign:${point}:${sign}`;
}
export function pointInHouseKey(point: KarmicPointSlug | string, house: number): string {
  return `point_in_house:${point}:${house}`;
}

// ---------------------------------------------------------------------------------------------
// Аспекты между объектами
// ---------------------------------------------------------------------------------------------

/** Канонизирует порядок пары (по OBJECT_PRIORITY) — используется и `aspectBetweenKey` (ключ),
 *  и генератором корпуса (текст), чтобы порядок объектов в ключе и в тексте ВСЕГДА совпадал. */
export function canonicalAspectPair(bodyA: string, bodyB: string): [string, string] {
  const a = normalizePointSlug(bodyA);
  const b = normalizePointSlug(bodyB);
  return priorityOf(a) <= priorityOf(b) ? [a, b] : [b, a];
}

/** Канонизирует порядок пары (по OBJECT_PRIORITY), чтобы запись (генератор корпуса) и чтение
 *  (сериализатор, который видит bodyA/bodyB в произвольном порядке из astro-core) всегда строили
 *  один и тот же ключ независимо от порядка аргументов. */
export function aspectBetweenKey(bodyA: string, bodyB: string, angle: AspectAngleSlug | string): string {
  const [lo, hi] = canonicalAspectPair(bodyA, bodyB);
  return `aspect:${lo}:${angle}:${hi}`;
}

// ---------------------------------------------------------------------------------------------
// Нумерология
// ---------------------------------------------------------------------------------------------

export function numerologyKey(category: string, value: string | number): string {
  return `numerology:${category}:${value}`;
}

// ---------------------------------------------------------------------------------------------
// Арканы матрицы судьбы
// ---------------------------------------------------------------------------------------------

export function arcanumKey(arcanum: number, position: string): string {
  return `arcanum:${arcanum}:${position}`;
}
