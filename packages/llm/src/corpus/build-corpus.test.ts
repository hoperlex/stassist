import { describe, expect, it } from 'vitest';
import { ZODIAC_SIGN_EN_SLUGS } from '@stassist/shared';
import {
  ASPECT_ANGLE_SLUGS,
  CLASSICAL_PLANET_SLUGS,
  MAJOR_ASPECT_SLUGS,
  arcanumKey,
  ascInSignKey,
  aspectBetweenKey,
  aspectOverviewKey,
  planetInHouseKey,
  planetInSignKey,
  planetOverviewKey,
  pointInSignKey,
  signOverviewKey,
} from '../facts/keys.js';
import { ALL_MATRIX_POSITIONS } from '../facts/matrix-positions.js';
import { buildCorpus } from './build-corpus.js';

describe('buildCorpus — детерминизм и полнота (правило непустоты, §6 конвенций)', () => {
  const result = buildCorpus();

  it('детерминирован: повторный вызов даёт побайтово тот же результат', () => {
    const again = buildCorpus();
    expect(again).toEqual(result);
  });

  it('нет дублирующихся ключей', () => {
    const keys = result.chunks.map((c) => c.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('ни один текст чанка не пуст и не является заглушкой StubLlmProvider', () => {
    for (const c of result.chunks) {
      expect(c.text.length).toBeGreaterThan(20);
      expect(c.text.toLowerCase()).not.toContain('lorem');
      expect(c.text).not.toContain('LLM_PROVIDER=stub');
    }
  });

  it('все чанки помечены quality=draft, version=1 (редактор проставит reviewed вручную)', () => {
    for (const c of result.chunks) {
      expect(c.quality).toBe('draft');
      expect(c.version).toBe(1);
    }
  });

  it('покрывает все 12 архетипических знаков и 12 asc_in_sign', () => {
    for (const sign of ZODIAC_SIGN_EN_SLUGS) {
      expect(result.chunks.some((c) => c.key === signOverviewKey(sign))).toBe(true);
      expect(result.chunks.some((c) => c.key === ascInSignKey(sign))).toBe(true);
    }
  });

  it('покрывает планета×знак и планета×дом для всех 10 классических планет (Ф4 req.3: 10×12)', () => {
    for (const planet of CLASSICAL_PLANET_SLUGS) {
      for (const sign of ZODIAC_SIGN_EN_SLUGS) {
        expect(result.chunks.some((c) => c.key === planetInSignKey(planet, sign))).toBe(true);
      }
      for (let house = 1; house <= 12; house++) {
        expect(result.chunks.some((c) => c.key === planetInHouseKey(planet, house))).toBe(true);
      }
    }
  });

  it('покрывает 14 архетипических планет (10 классических + chiron/north_node/lilith/selena)', () => {
    const overviewKeys = new Set(result.chunks.filter((c) => c.key.startsWith('planet:')).map((c) => c.key));
    expect(overviewKeys.size).toBe(14);
    expect(overviewKeys.has(planetOverviewKey('chiron'))).toBe(true);
    expect(overviewKeys.has(planetOverviewKey('north_node'))).toBe(true);
    expect(overviewKeys.has(planetOverviewKey('lilith'))).toBe(true);
    expect(overviewKeys.has(planetOverviewKey('selena'))).toBe(true);
  });

  it('покрывает кармические точки (5, вкл. south_node) × знак — natal_full «задачи роста»', () => {
    for (const point of ['chiron', 'north_node', 'south_node', 'lilith', 'selena']) {
      for (const sign of ZODIAC_SIGN_EN_SLUGS) {
        expect(result.chunks.some((c) => c.key === pointInSignKey(point, sign))).toBe(true);
      }
    }
  });

  it('покрывает все 11 типов аспектов (архетип аспекта, надмножество «7»)', () => {
    for (const angle of ASPECT_ANGLE_SLUGS) {
      expect(result.chunks.some((c) => c.key === aspectOverviewKey(angle))).toBe(true);
    }
  });

  it('покрывает аспекты между всеми парами классических планет (45×5 мажорных)', () => {
    for (let i = 0; i < CLASSICAL_PLANET_SLUGS.length; i++) {
      for (let j = i + 1; j < CLASSICAL_PLANET_SLUGS.length; j++) {
        for (const angle of MAJOR_ASPECT_SLUGS) {
          expect(result.chunks.some((c) => c.key === aspectBetweenKey(CLASSICAL_PLANET_SLUGS[i]!, CLASSICAL_PLANET_SLUGS[j]!, angle))).toBe(
            true,
          );
        }
      }
    }
  });

  it('пример из документации: aspect:sun:square:moon присутствует буквально', () => {
    expect(result.chunks.some((c) => c.key === 'aspect:sun:square:moon')).toBe(true);
  });

  it('покрывает арканы 1-22 × ВСЕ 30 позиций матрицы (не «22×8», см. находку f4.md)', () => {
    expect(ALL_MATRIX_POSITIONS.length).toBe(30);
    let count = 0;
    for (let arcanum = 1; arcanum <= 22; arcanum++) {
      for (const position of ALL_MATRIX_POSITIONS) {
        expect(result.chunks.some((c) => c.key === arcanumKey(arcanum, position.slug))).toBe(true);
        count++;
      }
    }
    expect(count).toBe(22 * 30);
  });

  it('покрывает нумерологические ключи из примеров §6 конвенций', () => {
    expect(result.chunks.some((c) => c.key === 'numerology:life_path:7')).toBe(true);
    expect(result.chunks.some((c) => c.key === 'numerology:matrix_cell:health')).toBe(true);
    expect(result.chunks.some((c) => c.key === 'numerology:personal_year:5')).toBe(true);
    for (const c of result.chunks) {
      if (c.key.startsWith('numerology:')) expect(c.tradition).toBe('numerology');
    }
  });

  it('генерирует ровно 78 текстов пар совместимости (RU-слаги compat_pages)', () => {
    expect(result.compatPairs).toHaveLength(78);
    for (const pair of result.compatPairs) {
      expect(pair.bodyMd.length).toBeGreaterThan(20);
    }
    expect(result.compatPairs.some((p) => p.signA === 'oven' && p.signB === 'telec')).toBe(true);
  });
});
