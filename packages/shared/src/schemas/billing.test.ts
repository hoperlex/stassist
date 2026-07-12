import { describe, expect, it } from 'vitest';
import {
  addPlanPeriod,
  applyPromoCodeToPrice,
  isPaidPlanCode,
  isPremiumAccessActive,
  PLAN_CATALOG,
} from './billing.js';

describe('PLAN_CATALOG', () => {
  it('содержит 3 плана с ценами req.2 промта Ф8 (349 ₽/мес, 2490 ₽/год, триал 7 дней)', () => {
    expect(PLAN_CATALOG.free.priceKop).toBe(0);
    expect(PLAN_CATALOG.premium_m.priceKop).toBe(34_900);
    expect(PLAN_CATALOG.premium_m.trialDays).toBe(7);
    expect(PLAN_CATALOG.premium_y.priceKop).toBe(249_000);
    expect(PLAN_CATALOG.premium_y.trialDays).toBe(7);
  });

  it('каждый план имеет непустой список фич (правило непустоты)', () => {
    for (const plan of Object.values(PLAN_CATALOG)) {
      expect(plan.features.length).toBeGreaterThan(0);
      for (const feature of plan.features) expect(feature.length).toBeGreaterThan(5);
    }
  });
});

describe('isPaidPlanCode', () => {
  it('free — не платный, premium_m/premium_y — платные', () => {
    expect(isPaidPlanCode('free')).toBe(false);
    expect(isPaidPlanCode('premium_m')).toBe(true);
    expect(isPaidPlanCode('premium_y')).toBe(true);
  });
});

describe('isPremiumAccessActive', () => {
  it('доступ активен в trial/active/past_due (грейс), закрыт в cancelled/expired', () => {
    expect(isPremiumAccessActive('trial')).toBe(true);
    expect(isPremiumAccessActive('active')).toBe(true);
    expect(isPremiumAccessActive('past_due')).toBe(true);
    expect(isPremiumAccessActive('cancelled')).toBe(false);
    expect(isPremiumAccessActive('expired')).toBe(false);
  });
});

describe('applyPromoCodeToPrice', () => {
  it('без промокода — цена и триал не меняются', () => {
    expect(applyPromoCodeToPrice(34_900, 7, null)).toEqual({ priceKop: 34_900, trialDays: 7 });
  });

  it('percent_discount уменьшает цену на процент, клампится к [0,100]', () => {
    expect(applyPromoCodeToPrice(10_000, 7, { kind: 'percent_discount', value: 20 })).toEqual({
      priceKop: 8_000,
      trialDays: 7,
    });
    expect(applyPromoCodeToPrice(10_000, 7, { kind: 'percent_discount', value: 150 }).priceKop).toBe(0);
  });

  it('fixed_discount_kop не уходит в отрицательные значения', () => {
    expect(applyPromoCodeToPrice(1_000, 7, { kind: 'fixed_discount_kop', value: 500 }).priceKop).toBe(500);
    expect(applyPromoCodeToPrice(1_000, 7, { kind: 'fixed_discount_kop', value: 5_000 }).priceKop).toBe(0);
  });

  it('trial_extension_days увеличивает триал, цену не трогает', () => {
    expect(applyPromoCodeToPrice(34_900, 7, { kind: 'trial_extension_days', value: 14 })).toEqual({
      priceKop: 34_900,
      trialDays: 21,
    });
  });
});

describe('addPlanPeriod', () => {
  it('addPlanPeriod month/year сдвигает календарно', () => {
    const start = new Date('2026-01-31T00:00:00Z');
    // JS Date переносит 31 января + 1 месяц на 3 марта (в феврале нет 31-го) — известное
    // поведение setUTCMonth, задокументировано здесь тестом (не скрытая неожиданность).
    const monthLater = addPlanPeriod(start, 'month');
    expect(monthLater.getUTCMonth()).toBe(2); // март (0-индекс)

    const regularStart = new Date('2026-03-15T00:00:00Z');
    expect(addPlanPeriod(regularStart, 'month').toISOString()).toBe('2026-04-15T00:00:00.000Z');
    expect(addPlanPeriod(regularStart, 'year').toISOString()).toBe('2027-03-15T00:00:00.000Z');
  });
});
