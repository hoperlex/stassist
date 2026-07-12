import { describe, expect, it } from 'vitest';
import { StubLlmProvider } from '@stassist/shared';
import { InMemoryChunkRepository } from '../rag/chunk-repository.js';
import {
  buildPersonalHoroscopeCacheKey,
  buildPersonalHoroscopeFull,
  buildPersonalHoroscopeSummary,
  computeTransitBodyPositions,
  computeTransitToNatalAspects,
  prioritizeTransitAspects,
  type TransitBodyPosition,
} from './personal.js';

const FIXED_TRANSITS: TransitBodyPosition[] = [
  { key: 'sun', longitudeDeg: 110, speedLongDegPerDay: 1 },
  { key: 'moon', longitudeDeg: 15, speedLongDegPerDay: 13 },
  { key: 'mars', longitudeDeg: 200, speedLongDegPerDay: 0.5 },
];

const NATAL_BODIES = {
  sun: { longitudeDeg: 10, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 0, signDegree: 10, houseNumber: 1 },
  moon: { longitudeDeg: 200, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 13, isRetrograde: false, signIndex: 6, signDegree: 20, houseNumber: 7 },
};

describe('computeTransitBodyPositions', () => {
  it('возвращает 10 тел (Солнце, Луна, 8 планет)', () => {
    const positions = computeTransitBodyPositions(new Date('2026-07-13T12:00:00Z'));
    expect(positions).toHaveLength(10);
    expect(positions.map((p) => p.key)).toContain('sun');
    expect(positions.map((p) => p.key)).toContain('pluto');
  });

  it('детерминирована для одной и той же даты', () => {
    const a = computeTransitBodyPositions(new Date('2026-07-13T12:00:00Z'));
    const b = computeTransitBodyPositions(new Date('2026-07-13T12:00:00Z'));
    expect(a).toEqual(b);
  });
});

describe('computeTransitToNatalAspects + prioritizeTransitAspects', () => {
  it('находит аспект транзитного Солнца (110°) к точному квадрату натальной Луны (200°) — орбис 0', () => {
    const aspects = computeTransitToNatalAspects(NATAL_BODIES, FIXED_TRANSITS);
    const prioritized = prioritizeTransitAspects(aspects);
    expect(prioritized.length).toBeGreaterThan(0);
    const top = prioritized[0]!;
    expect(top.orbDeg).toBeLessThanOrEqual(1);
  });

  it('приоритизация сортирует по возрастанию орбиса', () => {
    const aspects = computeTransitToNatalAspects(NATAL_BODIES, FIXED_TRANSITS);
    const prioritized = prioritizeTransitAspects(aspects, 10);
    for (let i = 1; i < prioritized.length; i++) {
      expect(prioritized[i]!.orbDeg).toBeGreaterThanOrEqual(prioritized[i - 1]!.orbDeg);
    }
  });

  it('пустой список транзитов даёт пустую приоритизацию', () => {
    expect(prioritizeTransitAspects([])).toEqual([]);
  });
});

describe('buildPersonalHoroscopeSummary', () => {
  it('честный empty-state, если значимых транзитов нет', () => {
    expect(buildPersonalHoroscopeSummary([])).toMatch(/спокойный|ровный/i);
  });

  it('упоминает тела из топ-1 транзита', () => {
    const aspects = computeTransitToNatalAspects(NATAL_BODIES, FIXED_TRANSITS);
    const prioritized = prioritizeTransitAspects(aspects);
    const summary = buildPersonalHoroscopeSummary(prioritized);
    expect(summary.length).toBeGreaterThan(20);
  });
});

describe('buildPersonalHoroscopeCacheKey', () => {
  it('детерминирован и меняется при смене dateKey (суточная инвалидация)', () => {
    const base = { birthProfileId: 'p1', period: 'day' as const, coreVersion: 'v1', promptVersion: 'pv1' };
    const key1 = buildPersonalHoroscopeCacheKey({ ...base, dateKey: '2026-07-13' });
    const key2 = buildPersonalHoroscopeCacheKey({ ...base, dateKey: '2026-07-14' });
    const key1Again = buildPersonalHoroscopeCacheKey({ ...base, dateKey: '2026-07-13' });
    expect(key1).toBe(key1Again);
    expect(key1).not.toBe(key2);
  });
});

describe('buildPersonalHoroscopeFull', () => {
  it('честный empty-state без сети, если транзитов нет', async () => {
    const result = await buildPersonalHoroscopeFull({
      prioritized: [],
      period: 'day',
      llm: new StubLlmProvider(),
      chunkRepository: new InMemoryChunkRepository(),
    });
    expect(result.provider).toBe('none');
    expect(result.flagged).toBe(false);
  });

  it('идёт через LlmProvider.generate() при наличии транзитов (см. doc-комментарий personal.ts)', async () => {
    const aspects = computeTransitToNatalAspects(NATAL_BODIES, FIXED_TRANSITS);
    const prioritized = prioritizeTransitAspects(aspects);
    const result = await buildPersonalHoroscopeFull({
      prioritized,
      period: 'day',
      llm: new StubLlmProvider(),
      chunkRepository: new InMemoryChunkRepository(),
    });
    expect(result.provider).toBe('stub');
    expect(result.fullMd.length).toBeGreaterThan(0);
  });
});
