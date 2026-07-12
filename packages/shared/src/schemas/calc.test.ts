import { describe, expect, it } from 'vitest';
import type { ChartData, Position } from './chart.js';
import {
  anonymizeChartData,
  compatPageResponseSchema,
  lunarCalendarMonthResponseSchema,
  shareKindSchema,
  synastryCalcRequestSchema,
} from './calc.js';

const validChartInput = {
  dateTime: { year: 1990, month: 6, day: 15, hour: 12, minute: 0, second: 0 },
  timeUnknown: false,
  tzId: 'Europe/Moscow',
  place: { lat: 55.7558, lon: 37.6173, elevationM: 0 },
  preset: {},
};

describe('synastryCalcRequestSchema', () => {
  it('принимает две валидные натальные карты входа', () => {
    const parsed = synastryCalcRequestSchema.parse({ a: validChartInput, b: validChartInput });
    expect(parsed.a.place.lat).toBeCloseTo(55.7558);
    expect(parsed.b.tzId).toBe('Europe/Moscow');
  });

  it('отвергает запрос без второй карты', () => {
    expect(() => synastryCalcRequestSchema.parse({ a: validChartInput })).toThrow();
  });
});

describe('compatPageResponseSchema', () => {
  it('bodyMd может быть null (текст пары ещё не залит Ф4 — честный empty-state)', () => {
    const parsed = compatPageResponseSchema.parse({ signA: 'oven', signB: 'telec', bodyMd: null });
    expect(parsed.bodyMd).toBeNull();
  });

  it('отвергает неизвестный слаг знака', () => {
    expect(() =>
      compatPageResponseSchema.parse({ signA: 'oven', signB: 'unknown-sign', bodyMd: null }),
    ).toThrow();
  });
});

describe('lunarCalendarMonthResponseSchema', () => {
  it('computed=false с пустым days — валидный честный empty-state (worker ещё не насчитал)', () => {
    const parsed = lunarCalendarMonthResponseSchema.parse({
      yyyyMm: '2026-08',
      referenceLocation: { name: 'Москва', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
      days: [],
      computed: false,
    });
    expect(parsed.computed).toBe(false);
    expect(parsed.days).toEqual([]);
  });

  it('отвергает некорректный формат месяца', () => {
    expect(() =>
      lunarCalendarMonthResponseSchema.parse({
        yyyyMm: '2026-8',
        referenceLocation: { name: 'Москва', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
        days: [],
        computed: false,
      }),
    ).toThrow();
  });
});

describe('shareKindSchema', () => {
  it('допускает только natal/synastry', () => {
    expect(shareKindSchema.parse('natal')).toBe('natal');
    expect(shareKindSchema.parse('synastry')).toBe('synastry');
    expect(() => shareKindSchema.parse('composite')).toThrow();
  });
});

// -------------------------------------------------------------------------------------------
// Ф7: анонимизация карты для публикации поста в коммьюнити (см. docs/roadmap/prompts/
// f7-вики-и-коммьюнити.md req.1 M8, findings f7.md [community-anon-unit] — «критичный тест
// анонимизации должен быть unit, не только E2E/по БД»). ВАЖНО: `ChartData.input` (см. chart.ts
// `chartDataSchema`) буквально ЭХО-ит birth-дату/место/tz обратно в вычисленную карту — поэтому
// анонимизация НЕ noop, а обязательный whitelist-шаг.
// -------------------------------------------------------------------------------------------

function fakePosition(overrides: Partial<Position> = {}): Position {
  return {
    longitudeDeg: 123.45,
    latitudeDeg: 0,
    distanceAu: null,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex: 4,
    signDegree: 3.45,
    houseNumber: 7,
    ...overrides,
  };
}

/** Полная `ChartData` с заведомо «палящими» ПД-значениями в `input` (дата/место/tz) — источник
 *  правды для проверки, что анонимайзер их отбрасывает. `input`/`kind` — НЕ часть whitelist'а. */
function fakeFullChartData(): ChartData {
  return {
    kind: 'natal',
    input: {
      dateTime: { year: 1990, month: 6, day: 15, hour: 3, minute: 33, second: 0 },
      timeUnknown: false,
      tzId: 'Europe/Moscow',
      place: { lat: 55.7558, lon: 37.6173, elevationM: 0 },
      preset: { zodiac: 'tropical', houseSystem: 'placidus', bodies: { trueNode: false, trueLilith: false, selena: true, chiron: true }, orbs: { byAspect: {}, byBody: {} }, aspectSet: 'major_minor' },
    },
    meta: {
      coreVersion: 'test-1',
      coordinateFrame: 'geocentric-apparent-ecliptic-of-date',
      zodiac: 'tropical',
      houseSystem: 'placidus',
      houseSystemFallback: false,
      noHouses: false,
      deltaTSeconds: 70,
      julianDayUT: 2448000.5,
      julianDayTT: 2448000.5008,
      gmstDeg: 100,
      gastDeg: 100,
      accuracyNotes: [],
    },
    bodies: {
      sun: fakePosition({ signIndex: 2 }),
      moon: fakePosition({ signIndex: 5 }),
      mercury: fakePosition(),
      venus: fakePosition(),
      mars: fakePosition(),
      jupiter: fakePosition(),
      saturn: fakePosition(),
      uranus: fakePosition(),
      neptune: fakePosition(),
      pluto: fakePosition(),
    },
    points: { meanNode: fakePosition() },
    arabicParts: {},
    angles: { ascDeg: 10, mcDeg: 100, dscDeg: 190, icDeg: 280, armcDeg: 95, vertexDeg: null },
    houses: Array.from({ length: 12 }, (_, i) => ({ number: i + 1, longitudeDeg: i * 30 })),
    aspects: [],
  };
}

describe('anonymizeChartData', () => {
  it('возвращает СТРОГО whitelist полей (bodies/points/angles/houses/aspects/meta{houseSystem,zodiac,noHouses})', () => {
    const anon = anonymizeChartData(fakeFullChartData());
    expect(Object.keys(anon).sort()).toEqual(['angles', 'aspects', 'bodies', 'houses', 'meta', 'points'].sort());
    expect(Object.keys(anon.meta).sort()).toEqual(['houseSystem', 'noHouses', 'zodiac'].sort());
  });

  it('НЕ содержит ПД (дата/время/место рождения, tz, входные данные) даже в сериализованном виде', () => {
    const anon = anonymizeChartData(fakeFullChartData());
    const json = JSON.stringify(anon);
    // input целиком отброшен — ни одно из «палящих» значений не должно просочиться.
    expect(json).not.toContain('1990');
    expect(json).not.toContain('55.7558');
    expect(json).not.toContain('37.6173');
    expect(json).not.toContain('Europe/Moscow');
    expect((anon as Record<string, unknown>).input).toBeUndefined();
    expect((anon as Record<string, unknown>).kind).toBeUndefined();
  });

  it('сохраняет расчётные позиции (позиции планет — не ПД, это и есть суть публикации)', () => {
    const anon = anonymizeChartData(fakeFullChartData());
    expect(anon.bodies.sun.signIndex).toBe(2);
    expect(anon.houses).toHaveLength(12);
  });
});
