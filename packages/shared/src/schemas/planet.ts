/**
 * Планеты (10 классических тел) — RU-слаги/названия для программатического кластера Ф7
 * `/planety/{planeta}-v-{znak|dom}` (см. docs/architecture/23-seo-стратегия.md §2, «240 URL»)
 * и для хаба `/planety`. EN-слаги СОВПАДАЮТ с `CLASSICAL_PLANET_SLUGS` в
 * `packages/llm/src/facts/keys.ts` (строковые литералы, не типовой импорт — `@stassist/shared`
 * не зависит от `@stassist/llm`, см. аналогичное решение `packages/db/src/schema/stones.ts`
 * про `STONE_CHAKRAS`).
 *
 * `ruSlugPrepositional` — предложный падеж («в ком? в чём?») для URL вида «марс-в-льве»
 * (Марс в Льве), правильные грамматические формы заданы явно (не алгоритмическое склонение —
 * русское словоизменение нерегулярно, автоматическое склонение было бы ненадёжным источником
 * фактов, см. корневой CLAUDE.md «против галлюцинаций»).
 */
import { z } from 'zod';

export const CLASSICAL_PLANET_EN_SLUGS = [
  'sun', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
] as const;
export type ClassicalPlanetEnSlug = (typeof CLASSICAL_PLANET_EN_SLUGS)[number];
export const classicalPlanetEnSlugSchema = z.enum(CLASSICAL_PLANET_EN_SLUGS);

export interface PlanetInfo {
  enSlug: ClassicalPlanetEnSlug;
  /** RU-слаг для префикса URL, напр. `mars-v-lve` (транслит, без падежных окончаний). */
  ruSlug: string;
  nameRu: string;
  nameRuGenitive: string;
}

export const CLASSICAL_PLANETS: readonly PlanetInfo[] = [
  { enSlug: 'sun', ruSlug: 'solnce', nameRu: 'Солнце', nameRuGenitive: 'Солнца' },
  { enSlug: 'moon', ruSlug: 'luna', nameRu: 'Луна', nameRuGenitive: 'Луны' },
  { enSlug: 'mercury', ruSlug: 'merkurij', nameRu: 'Меркурий', nameRuGenitive: 'Меркурия' },
  { enSlug: 'venus', ruSlug: 'venera', nameRu: 'Венера', nameRuGenitive: 'Венеры' },
  { enSlug: 'mars', ruSlug: 'mars', nameRu: 'Марс', nameRuGenitive: 'Марса' },
  { enSlug: 'jupiter', ruSlug: 'yupiter', nameRu: 'Юпитер', nameRuGenitive: 'Юпитера' },
  { enSlug: 'saturn', ruSlug: 'saturn', nameRu: 'Сатурн', nameRuGenitive: 'Сатурна' },
  { enSlug: 'uranus', ruSlug: 'uran', nameRu: 'Уран', nameRuGenitive: 'Урана' },
  { enSlug: 'neptune', ruSlug: 'neptun', nameRu: 'Нептун', nameRuGenitive: 'Нептуна' },
  { enSlug: 'pluto', ruSlug: 'pluton', nameRu: 'Плутон', nameRuGenitive: 'Плутона' },
];

const PLANET_BY_RU_SLUG = new Map<string, PlanetInfo>(CLASSICAL_PLANETS.map((p) => [p.ruSlug, p]));
const PLANET_BY_EN_SLUG = new Map<string, PlanetInfo>(CLASSICAL_PLANETS.map((p) => [p.enSlug, p]));

export function planetByRuSlug(slug: string): PlanetInfo | undefined {
  return PLANET_BY_RU_SLUG.get(slug);
}
export function planetByEnSlug(slug: string): PlanetInfo | undefined {
  return PLANET_BY_EN_SLUG.get(slug);
}

/** 4 кармические точки, у которых есть собственные `planet:*:overview`/point_in_sign/point_in_house
 *  чанки (см. packages/llm/src/facts/keys.ts `PLANET_OVERVIEW_SLUGS`/`KARMIC_POINT_SLUGS`) — здесь
 *  дублируются только имя/RU-слаг для вики-статей раздела planets (не для 240-страничного
 *  кластера — он только по 10 классическим, см. doc 23 §2 «10×24=240»). */
export interface KarmicPointInfo {
  enSlug: 'chiron' | 'north_node' | 'lilith' | 'selena';
  ruSlug: string;
  nameRu: string;
}
export const KARMIC_POINTS: readonly KarmicPointInfo[] = [
  { enSlug: 'chiron', ruSlug: 'hiron', nameRu: 'Хирон' },
  { enSlug: 'north_node', ruSlug: 'severnyj-uzel', nameRu: 'Северный узел' },
  { enSlug: 'lilith', ruSlug: 'lilit', nameRu: 'Лилит' },
  { enSlug: 'selena', ruSlug: 'selena', nameRu: 'Селена' },
];
