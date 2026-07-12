import { describe, expect, it } from 'vitest';
import {
  advanceStreak,
  ASTRA_USER_ID,
  nextDayKey,
  skyCheckinCreateRequestSchema,
  skyDayKeySchema,
  skyDayMeResponseSchema,
  skyDayPayloadSchema,
} from './sky.js';

describe('advanceStreak (правило стрика «Живу по небу»)', () => {
  it('первый чек-ин начинает серию с 1', () => {
    const next = advanceStreak({ current: 0, best: 0, lastCheckinDay: null }, '2026-07-13');
    expect(next).toEqual({ current: 1, best: 1, lastCheckinDay: '2026-07-13' });
  });

  it('чек-ин на следующий календарный день продлевает серию', () => {
    const next = advanceStreak({ current: 3, best: 5, lastCheckinDay: '2026-07-12' }, '2026-07-13');
    expect(next).toEqual({ current: 4, best: 5, lastCheckinDay: '2026-07-13' });
  });

  it('продление через границу месяца и года работает (UTC-арифметика)', () => {
    expect(advanceStreak({ current: 1, best: 1, lastCheckinDay: '2026-07-31' }, '2026-08-01').current).toBe(2);
    expect(advanceStreak({ current: 9, best: 9, lastCheckinDay: '2026-12-31' }, '2027-01-01').current).toBe(10);
  });

  it('пропуск дня разрывает серию — начинается заново с 1, best сохраняется', () => {
    const next = advanceStreak({ current: 7, best: 7, lastCheckinDay: '2026-07-10' }, '2026-07-13');
    expect(next).toEqual({ current: 1, best: 7, lastCheckinDay: '2026-07-13' });
  });

  it('повторный чек-ин того же дня идемпотентен (смена вердикта не даёт +1)', () => {
    const prev = { current: 4, best: 6, lastCheckinDay: '2026-07-13' };
    expect(advanceStreak(prev, '2026-07-13')).toBe(prev);
  });

  it('best обновляется, когда текущая серия его превышает', () => {
    const next = advanceStreak({ current: 6, best: 6, lastCheckinDay: '2026-07-12' }, '2026-07-13');
    expect(next.best).toBe(7);
  });
});

describe('nextDayKey', () => {
  it('следующий день, включая високосный февраль', () => {
    expect(nextDayKey('2026-07-13')).toBe('2026-07-14');
    expect(nextDayKey('2028-02-28')).toBe('2028-02-29');
    expect(nextDayKey('2028-02-29')).toBe('2028-03-01');
  });
});

describe('контракты sky', () => {
  it('dayKey принимает только YYYY-MM-DD', () => {
    expect(skyDayKeySchema.safeParse('2026-07-13').success).toBe(true);
    expect(skyDayKeySchema.safeParse('13.07.2026').success).toBe(false);
    expect(skyDayKeySchema.safeParse('2026-7-3').success).toBe(false);
  });

  it('чек-ин: заметка ≤140, обрезается по trim, пустая недопустима', () => {
    expect(skyCheckinCreateRequestSchema.safeParse({ dayKey: '2026-07-13', verdict: 'hit' }).success).toBe(true);
    expect(
      skyCheckinCreateRequestSchema.safeParse({ dayKey: '2026-07-13', verdict: 'partial', note: 'а'.repeat(140) }).success,
    ).toBe(true);
    expect(
      skyCheckinCreateRequestSchema.safeParse({ dayKey: '2026-07-13', verdict: 'miss', note: 'а'.repeat(141) }).success,
    ).toBe(false);
    expect(skyCheckinCreateRequestSchema.safeParse({ dayKey: '2026-07-13', verdict: 'miss', note: '   ' }).success).toBe(false);
  });

  it('payload дня валидируется по схеме (антигаллюцинационное основание текста)', () => {
    const payload = {
      event: { kind: 'ingress', body: 'mars', signIndex: 6 },
      notableAspects: [{ bodyA: 'sun', bodyB: 'moon', angle: 'square', orbDeg: 1.2 }],
      moonSignIndex: 3,
      lunarDay: 12,
      phaseName: 'waxing_gibbous',
      retrogradeBodies: ['mercury'],
    };
    expect(skyDayPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it('me-ответ: честный empty-state computed=false с reason (паттерн синастрии)', () => {
    const empty = {
      computed: false,
      reason: 'no_profile',
      aspects: [],
      summary: null,
      myCheckin: null,
      streak: { current: 0, best: 0 },
    };
    expect(skyDayMeResponseSchema.safeParse(empty).success).toBe(true);
  });

  it('ASTRA_USER_ID — фиксированный UUID (тот же, что в сиде 0016_astra_user.sql)', () => {
    expect(ASTRA_USER_ID).toBe('a57a0000-0000-4000-8000-000000000001');
  });
});
