/**
 * Редакторский манифест корпуса — детерминированный перечень всех `interpretation_chunks` с
 * разбивкой по категориям и editor-батчам (для многоагентной редактуры, см.
 * docs/roadmap/prompts/text-корпус-редактура.md, блок A).
 *
 * ИСТОЧНИК ПРАВДЫ — тот же `buildCorpus()` (build-corpus.js): манифест НЕ дублирует перебор ключей,
 * а деривируется из его вывода, поэтому множество ключей манифеста ВСЕГДА совпадает с тем, что
 * реально сеется (см. manifest.test.ts). Черновой текст чанка (`ChunkDraft.text`) используется как
 * семантический бриф для редактора — он корректно описывает комбинацию (планета/знак/дом/аркан/
 * позиция), а редактор превращает его в уникальный редакторский текст.
 *
 * Категория задаёт ориентир длины и группу для дедуп-критика; `batchId` группирует «путающиеся»
 * ключи вместе (все 12 знаков одной планеты; все 30 позиций одного аркана; все пары одного угла) —
 * это первый рубеж антидубляжа: редактор видит соседей батча и не может перефразировать один шаблон.
 */
import type { InterpretationTradition } from '@stassist/shared';
import { KARMIC_ASPECT_POINT_SLUGS } from '../facts/keys.js';
import { buildCorpus } from './build-corpus.js';

export type EditorialCategory =
  | 'overview_sign'
  | 'overview_planet'
  | 'overview_house'
  | 'overview_aspect'
  | 'overview_element_cross'
  | 'planet_in_sign'
  | 'planet_in_house'
  | 'asc_in_sign'
  | 'point_in_sign'
  | 'point_in_house'
  | 'aspect_between'
  | 'arcanum'
  | 'numerology';

export interface EditorialChunkEntry {
  key: string;
  tradition: InterpretationTradition;
  category: EditorialCategory;
  /** Логическая группа для дедуп-критика и группировки батчей. */
  group: string;
  /** Итоговый идентификатор editor-батча (group + '#n' при пре-чанкинге больших групп). */
  batchId: string;
  /** Черновой текст = семантический бриф «о чём этот ключ». */
  brief: string;
  /** Ориентир длины редакторского текста (символы), не жёсткая догма. */
  lengthBand: [number, number];
}

/** Максимальный размер editor-батча (ключей). Большие группы пре-чанкуются на `#1`, `#2`, … */
export const MAX_EDITORIAL_BATCH = 40;

const LENGTH_BANDS: Record<EditorialCategory, [number, number]> = {
  overview_sign: [1500, 2500],
  overview_planet: [900, 1600],
  overview_house: [900, 1600],
  overview_aspect: [500, 1000],
  overview_element_cross: [500, 1000],
  planet_in_sign: [600, 1200],
  planet_in_house: [600, 1200],
  asc_in_sign: [600, 1200],
  point_in_sign: [500, 1000],
  point_in_house: [500, 1000],
  aspect_between: [500, 1000],
  arcanum: [300, 700],
  numerology: [400, 900],
};

const KARMIC_POINTS = KARMIC_ASPECT_POINT_SLUGS as readonly string[];

function categorize(key: string, tradition: InterpretationTradition): { category: EditorialCategory; group: string } {
  const parts = key.split(':');
  const prefix = parts[0];
  switch (prefix) {
    case 'sign':
      return { category: 'overview_sign', group: 'overview/signs' };
    case 'planet':
      return { category: 'overview_planet', group: 'overview/planets' };
    case 'house':
      return { category: 'overview_house', group: 'overview/houses' };
    case 'element':
    case 'cross':
      return { category: 'overview_element_cross', group: 'overview/elements_crosses' };
    case 'aspect': {
      // Обзор угла: `aspect:{angle}:overview` (3 сегмента). Аспект между объектами:
      // `aspect:{lo}:{angle}:{hi}` (4 сегмента).
      if (parts.length === 3 && parts[2] === 'overview') {
        return { category: 'overview_aspect', group: 'overview/aspects' };
      }
      const lo = parts[1]!;
      const angle = parts[2]!;
      const hi = parts[3]!;
      if (tradition === 'karmic') {
        const point = [lo, hi].find((p) => KARMIC_POINTS.includes(p)) ?? lo;
        return { category: 'aspect_between', group: `aspect_karmic/${point}` };
      }
      return { category: 'aspect_between', group: `aspect_western/${angle}` };
    }
    case 'planet_in_sign':
      return { category: 'planet_in_sign', group: `planet_in_sign/${parts[1]}` };
    case 'planet_in_house':
      return { category: 'planet_in_house', group: `planet_in_house/${parts[1]}` };
    case 'asc_in_sign':
      return { category: 'asc_in_sign', group: 'asc_in_sign' };
    case 'point_in_sign':
      return { category: 'point_in_sign', group: `point_in_sign/${parts[1]}` };
    case 'point_in_house':
      return { category: 'point_in_house', group: `point_in_house/${parts[1]}` };
    case 'arcanum':
      return { category: 'arcanum', group: `arcanum/${parts[1]}` };
    case 'numerology':
      return { category: 'numerology', group: `numerology/${parts[1]}` };
    default:
      throw new Error(`buildEditorialManifest: неизвестный префикс ключа «${key}»`);
  }
}

/**
 * Деривирует редакторский манифест из `buildCorpus().chunks`. Порядок детерминирован (группы в
 * порядке первого появления, внутри группы — в порядке buildCorpus). Группы больше
 * `MAX_EDITORIAL_BATCH` разбиваются на равные под-батчи с суффиксом `#n`.
 */
export function buildEditorialManifest(): EditorialChunkEntry[] {
  const { chunks } = buildCorpus();

  const byGroup = new Map<string, Array<Omit<EditorialChunkEntry, 'batchId'>>>();
  for (const c of chunks) {
    const { category, group } = categorize(c.key, c.tradition);
    const entry = {
      key: c.key,
      tradition: c.tradition,
      category,
      group,
      brief: c.text,
      lengthBand: LENGTH_BANDS[category],
    };
    const bucket = byGroup.get(group);
    if (bucket) bucket.push(entry);
    else byGroup.set(group, [entry]);
  }

  const result: EditorialChunkEntry[] = [];
  for (const [group, entries] of byGroup) {
    if (entries.length <= MAX_EDITORIAL_BATCH) {
      for (const e of entries) result.push({ ...e, batchId: group });
      continue;
    }
    const parts = Math.ceil(entries.length / MAX_EDITORIAL_BATCH);
    const size = Math.ceil(entries.length / parts);
    entries.forEach((e, i) => {
      result.push({ ...e, batchId: `${group}#${Math.floor(i / size) + 1}` });
    });
  }
  return result;
}
