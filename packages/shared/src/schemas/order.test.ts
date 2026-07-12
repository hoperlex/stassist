import { describe, expect, it } from 'vitest';
import {
  CUSTOM_FORECAST_CATALOG,
  customForecastPriceKop,
  customForecastSubjectSchema,
  MAX_ELECTIVES_INTERVAL_DAYS,
  MAX_PERIOD_MAP_DAYS,
  orderCreateRequestSchema,
} from './order.js';

const BIRTH_PROFILE_ID = '11111111-1111-1111-1111-111111111111';

describe('customForecastSubjectSchema — event_date', () => {
  it('валиден с eventDate', () => {
    const result = customForecastSubjectSchema.safeParse({
      type: 'event_date',
      birthProfileId: BIRTH_PROFILE_ID,
      eventDate: '2026-08-01',
    });
    expect(result.success).toBe(true);
  });

  it('без eventDate — невалиден', () => {
    const result = customForecastSubjectSchema.safeParse({ type: 'event_date', birthProfileId: BIRTH_PROFILE_ID });
    expect(result.success).toBe(false);
  });
});

describe('customForecastSubjectSchema — period_map', () => {
  it('валиден в границах MAX_PERIOD_MAP_DAYS', () => {
    const result = customForecastSubjectSchema.safeParse({
      type: 'period_map',
      birthProfileId: BIRTH_PROFILE_ID,
      periodStart: '2026-08-01',
      periodEnd: '2026-09-01',
    });
    expect(result.success).toBe(true);
  });

  it('periodEnd раньше periodStart — невалиден', () => {
    const result = customForecastSubjectSchema.safeParse({
      type: 'period_map',
      birthProfileId: BIRTH_PROFILE_ID,
      periodStart: '2026-09-01',
      periodEnd: '2026-08-01',
    });
    expect(result.success).toBe(false);
  });

  it(`интервал длиннее ${MAX_PERIOD_MAP_DAYS} дней — невалиден`, () => {
    const result = customForecastSubjectSchema.safeParse({
      type: 'period_map',
      birthProfileId: BIRTH_PROFILE_ID,
      periodStart: '2026-01-01',
      periodEnd: '2026-12-31',
    });
    expect(result.success).toBe(false);
  });
});

describe('customForecastSubjectSchema — electives_question', () => {
  it('валиден в границах MAX_ELECTIVES_INTERVAL_DAYS', () => {
    const result = customForecastSubjectSchema.safeParse({
      type: 'electives_question',
      birthProfileId: BIRTH_PROFILE_ID,
      intervalStart: '2026-08-01',
      intervalEnd: '2026-08-20',
      question: 'Когда лучше подписать договор аренды?',
      weighRetrogradeMercury: true,
    });
    expect(result.success).toBe(true);
  });

  it(`интервал длиннее ${MAX_ELECTIVES_INTERVAL_DAYS} дней — невалиден`, () => {
    const result = customForecastSubjectSchema.safeParse({
      type: 'electives_question',
      birthProfileId: BIRTH_PROFILE_ID,
      intervalStart: '2026-01-01',
      intervalEnd: '2026-08-01',
    });
    expect(result.success).toBe(false);
  });

  it('без intervalStart/intervalEnd — невалиден', () => {
    const result = customForecastSubjectSchema.safeParse({ type: 'electives_question', birthProfileId: BIRTH_PROFILE_ID });
    expect(result.success).toBe(false);
  });
});

describe('CUSTOM_FORECAST_CATALOG / customForecastPriceKop', () => {
  it('deep дороже standard для всех 3 типов', () => {
    for (const type of Object.keys(CUSTOM_FORECAST_CATALOG) as Array<keyof typeof CUSTOM_FORECAST_CATALOG>) {
      expect(customForecastPriceKop(type, 'deep')).toBeGreaterThan(customForecastPriceKop(type, 'standard'));
    }
  });
});

describe('orderCreateRequestSchema — обратная совместимость pdf_report + новый custom_forecast', () => {
  it('pdf_report (Ф6) продолжает валидироваться как раньше', () => {
    const result = orderCreateRequestSchema.safeParse({
      kind: 'pdf_report',
      subject: { productType: 'matrix_full_pdf', birthProfileId: BIRTH_PROFILE_ID },
    });
    expect(result.success).toBe(true);
  });

  it('custom_forecast (Ф8) валидируется по customForecastSubjectSchema', () => {
    const result = orderCreateRequestSchema.safeParse({
      kind: 'custom_forecast',
      subject: { type: 'event_date', birthProfileId: BIRTH_PROFILE_ID, eventDate: '2026-08-01' },
    });
    expect(result.success).toBe(true);
  });

  it('custom_forecast с pdf-предметом (перепутанная форма) — невалиден', () => {
    const result = orderCreateRequestSchema.safeParse({
      kind: 'custom_forecast',
      subject: { productType: 'matrix_full_pdf', birthProfileId: BIRTH_PROFILE_ID },
    });
    expect(result.success).toBe(false);
  });
});
