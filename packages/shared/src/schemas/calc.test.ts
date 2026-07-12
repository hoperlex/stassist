import { describe, expect, it } from 'vitest';
import {
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
