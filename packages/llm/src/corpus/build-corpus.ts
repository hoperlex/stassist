/**
 * Оффлайн-генератор seed-корпуса (см. `pnpm data:corpus`, tools/gen-corpus.ts). Комбинаторно
 * строит ПОЛНОЕ покрытие ключей-потребителей Ф3/Ф5/Ф6/Ф7 (см. §6 конвенций реализации «карта
 * владения контентом») — детерминированно, без сети/LLM-ключей (StubLlmProvider по духу: тексты
 * строит corpus/templates.ts, а не буквальный вызов LlmProvider.generate() — см. doc-комментарий
 * в templates.ts почему: текст-заглушка StubLlmProvider из @stassist/shared не является
 * доменным астрологическим контентом, а этот генератор обязан дать ОСМЫСЛЕННЫЙ черновой корпус).
 * Все чанки — quality='draft', version=1; редактор помечает reviewed вручную (см. §6).
 */
import {
  allCanonicalCompatPairs,
  signBySlug,
  zodiacEnSlugByIndex,
  ZODIAC_SIGN_EN_SLUGS,
  type InterpretationTradition,
} from '@stassist/shared';
import {
  ASPECT_ANGLE_SLUGS,
  CLASSICAL_PLANET_SLUGS,
  CROSS_SLUGS,
  ELEMENT_SLUGS,
  KARMIC_ASPECT_POINT_SLUGS,
  KARMIC_POINT_SLUGS,
  MAJOR_ASPECT_SLUGS,
  PLANET_OVERVIEW_SLUGS,
  arcanumKey,
  ascInSignKey,
  aspectBetweenKey,
  aspectOverviewKey,
  canonicalAspectPair,
  crossOverviewKey,
  elementOverviewKey,
  houseOverviewKey,
  planetInHouseKey,
  planetInSignKey,
  planetOverviewKey,
  pointInHouseKey,
  pointInSignKey,
  signOverviewKey,
} from '../facts/keys.js';
import { ALL_MATRIX_POSITIONS } from '../facts/matrix-positions.js';
import {
  NUMEROLOGY_CORE_NUMBER_CATEGORIES,
  NUMEROLOGY_CORE_NUMBER_VALUES,
  NUMEROLOGY_CYCLE_CATEGORIES,
  NUMEROLOGY_CYCLE_VALUES,
  PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT,
  PSYCHOMATRIX_LINE_SLUGS,
  numerologyCoreNumberKey,
  numerologyCycleKey,
  numerologyMatrixCellKey,
  numerologyMatrixLineKey,
  type NumerologyCoreNumberCategory,
  type NumerologyCycleCategory,
} from '../facts/numerology-positions.js';
import { objectNameRu } from '../facts/ru-names.js';
import type { ChunkDraft, CompatPairDraft, CorpusResult } from './types.js';
import {
  arcanumPositionText,
  ascInSignText,
  aspectBetweenObjectsText,
  aspectOverviewText,
  compatPairText,
  crossOverviewText,
  elementOverviewText,
  houseOverviewText,
  numerologyCoreNumberText,
  numerologyCycleText,
  numerologyMatrixCellText,
  numerologyMatrixLineText,
  planetInHouseText,
  planetInSignText,
  planetOverviewText,
  pointInHouseText,
  pointInSignText,
  signOverviewText,
} from './templates.js';

const HOUSES = Array.from({ length: 12 }, (_, i) => i + 1);

const NUMEROLOGY_CORE_LABEL_RU: Record<NumerologyCoreNumberCategory, string> = {
  life_path: 'Число жизненного пути',
  expression: 'Число выражения',
  soul: 'Число души',
  personality: 'Число личности',
};

const NUMEROLOGY_CYCLE_LABEL_RU: Record<NumerologyCycleCategory, string> = {
  personal_year: 'Персональный год',
  personal_month: 'Персональный месяц',
  personal_day: 'Персональный день',
};

function chunk(key: string, tradition: InterpretationTradition, text: string): ChunkDraft {
  return { key, tradition, text, quality: 'draft', version: 1 };
}

function aspectChunk(bodyA: string, bodyB: string, angle: string, tradition: InterpretationTradition): ChunkDraft {
  const [lo, hi] = canonicalAspectPair(bodyA, bodyB);
  return chunk(aspectBetweenKey(bodyA, bodyB, angle), tradition, aspectBetweenObjectsText(objectNameRu(lo), angle, objectNameRu(hi)));
}

export function buildCorpus(): CorpusResult {
  const chunks: ChunkDraft[] = [];

  // --- Архетипика: знаки(12), планеты(14), дома(12), аспекты(11⊇7), стихии(4)+кресты(3) -------
  for (const sign of ZODIAC_SIGN_EN_SLUGS) chunks.push(chunk(signOverviewKey(sign), 'western', signOverviewText(sign)));
  for (const planet of PLANET_OVERVIEW_SLUGS) {
    const tradition: InterpretationTradition = CLASSICAL_PLANET_SLUGS.includes(planet as (typeof CLASSICAL_PLANET_SLUGS)[number])
      ? 'western'
      : 'karmic';
    chunks.push(chunk(planetOverviewKey(planet), tradition, planetOverviewText(planet)));
  }
  for (const house of HOUSES) chunks.push(chunk(houseOverviewKey(house), 'western', houseOverviewText(house)));
  for (const angle of ASPECT_ANGLE_SLUGS) chunks.push(chunk(aspectOverviewKey(angle), 'western', aspectOverviewText(angle)));
  for (const element of ELEMENT_SLUGS) chunks.push(chunk(elementOverviewKey(element), 'western', elementOverviewText(element)));
  for (const cross of CROSS_SLUGS) chunks.push(chunk(crossOverviewKey(cross), 'western', crossOverviewText(cross)));

  // --- Планета×знак (10×12), планета×дом (10×12), Asc×знак (12) ------------------------------
  for (const planet of CLASSICAL_PLANET_SLUGS) {
    for (const sign of ZODIAC_SIGN_EN_SLUGS) {
      chunks.push(chunk(planetInSignKey(planet, sign), 'western', planetInSignText(planet, sign)));
    }
    for (const house of HOUSES) {
      chunks.push(chunk(planetInHouseKey(planet, house), 'western', planetInHouseText(planet, house)));
    }
  }
  for (const sign of ZODIAC_SIGN_EN_SLUGS) chunks.push(chunk(ascInSignKey(sign), 'western', ascInSignText(sign)));

  // --- Кармические точки (узлы/Лилит/Селена/Хирон) × знак/дом + их аспекты к планетам ---------
  for (const point of KARMIC_POINT_SLUGS) {
    for (const sign of ZODIAC_SIGN_EN_SLUGS) {
      chunks.push(chunk(pointInSignKey(point, sign), 'karmic', pointInSignText(point, sign)));
    }
    for (const house of HOUSES) {
      chunks.push(chunk(pointInHouseKey(point, house), 'karmic', pointInHouseText(point, house)));
    }
  }
  for (const point of KARMIC_ASPECT_POINT_SLUGS) {
    for (const planet of CLASSICAL_PLANET_SLUGS) {
      for (const angle of MAJOR_ASPECT_SLUGS) chunks.push(aspectChunk(point, planet, angle, 'karmic'));
    }
  }

  // --- Аспекты между классическими планетами (45 пар × 5 мажорных) ---------------------------
  for (let i = 0; i < CLASSICAL_PLANET_SLUGS.length; i++) {
    for (let j = i + 1; j < CLASSICAL_PLANET_SLUGS.length; j++) {
      for (const angle of MAJOR_ASPECT_SLUGS) {
        chunks.push(aspectChunk(CLASSICAL_PLANET_SLUGS[i]!, CLASSICAL_PLANET_SLUGS[j]!, angle, 'western'));
      }
    }
  }

  // --- Арканы 1-22 × ВСЕ позиции матрицы (30 позиций, см. facts/matrix-positions.ts) ----------
  for (let arcanum = 1; arcanum <= 22; arcanum++) {
    for (const position of ALL_MATRIX_POSITIONS) {
      chunks.push(chunk(arcanumKey(arcanum, position.slug), 'numerology', arcanumPositionText(arcanum, position.labelRu)));
    }
  }

  // --- Нумерология: ЧЖП/выражение/душа/личность (1-9,11,22) -----------------------------------
  for (const category of NUMEROLOGY_CORE_NUMBER_CATEGORIES) {
    for (const value of NUMEROLOGY_CORE_NUMBER_VALUES) {
      chunks.push(
        chunk(numerologyCoreNumberKey(category, value), 'numerology', numerologyCoreNumberText(NUMEROLOGY_CORE_LABEL_RU[category], value)),
      );
    }
  }
  // --- Персональные год/месяц/день (1-9) -------------------------------------------------------
  for (const category of NUMEROLOGY_CYCLE_CATEGORIES) {
    for (const value of NUMEROLOGY_CYCLE_VALUES) {
      chunks.push(chunk(numerologyCycleKey(category, value), 'numerology', numerologyCycleText(NUMEROLOGY_CYCLE_LABEL_RU[category], value)));
    }
  }
  // --- 9 ячеек психоматрицы + строки/столбцы/диагонали -----------------------------------------
  for (const slug of Object.values(PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT)) {
    chunks.push(chunk(numerologyMatrixCellKey(slug), 'numerology', numerologyMatrixCellText(slug)));
  }
  for (const slug of PSYCHOMATRIX_LINE_SLUGS) {
    chunks.push(chunk(numerologyMatrixLineKey(slug), 'numerology', numerologyMatrixLineText(slug)));
  }

  // --- 78 текстов пар совместимости (compat_pages.body_md, RU-слаги) ---------------------------
  const compatPairs: CompatPairDraft[] = allCanonicalCompatPairs().map((pair) => {
    const infoA = signBySlug(pair.signA);
    const infoB = signBySlug(pair.signB);
    if (!infoA || !infoB) throw new Error(`buildCorpus: неизвестная пара знаков ${pair.signA}/${pair.signB}`);
    const enA = zodiacEnSlugByIndex(infoA.signIndex);
    const enB = zodiacEnSlugByIndex(infoB.signIndex);
    return { signA: pair.signA, signB: pair.signB, bodyMd: compatPairText(enA, enB) };
  });

  return { chunks, compatPairs };
}
