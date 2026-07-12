import { describe, expect, it } from 'vitest';
import { dateKeysInRange, endOfMonth, isoWeekStart, startOfMonth, toDateKeyDay, toDateKeyMonth, toDateKeyWeek, toDateKeyYear } from './date-keys.js';

describe('toDateKeyDay/Month/Year', () => {
  it('форматирует день/месяц/год', () => {
    const d = new Date('2026-07-13T15:00:00Z');
    expect(toDateKeyDay(d)).toBe('2026-07-13');
    expect(toDateKeyMonth(d)).toBe('2026-07');
    expect(toDateKeyYear(d)).toBe('2026');
  });
});

describe('isoWeekStart / toDateKeyWeek', () => {
  it('понедельник для среды той же недели', () => {
    // 2026-07-13 — понедельник (проверено вручную: 2026-01-01 — четверг).
    const monday = isoWeekStart(new Date('2026-07-15T12:00:00Z'));
    expect(toDateKeyDay(monday)).toBe('2026-07-13');
  });

  it('неделя формата YYYY-Www с ведущим нулём', () => {
    const key = toDateKeyWeek(new Date('2026-01-05T12:00:00Z'));
    expect(key).toMatch(/^\d{4}-W\d{2}$/);
  });

  it('лексикографический порядок ключей недель совпадает с хронологией', () => {
    const w1 = toDateKeyWeek(new Date('2026-01-05T12:00:00Z'));
    const w2 = toDateKeyWeek(new Date('2026-07-15T12:00:00Z'));
    expect(w1 < w2).toBe(true);
  });

  it('переход года: последние дни декабря могут принадлежать неделе следующего ISO-года', () => {
    // 2026-12-31 — четверг; ISO-неделя этой даты принадлежит 2026 (неделя 53).
    const key = toDateKeyWeek(new Date('2026-12-31T12:00:00Z'));
    expect(key.startsWith('2026-') || key.startsWith('2027-')).toBe(true);
  });
});

describe('dateKeysInRange', () => {
  it('включает обе границы', () => {
    const keys = dateKeysInRange(new Date('2026-07-13T00:00:00Z'), new Date('2026-07-15T00:00:00Z'));
    expect(keys).toEqual(['2026-07-13', '2026-07-14', '2026-07-15']);
  });
});

describe('startOfMonth/endOfMonth', () => {
  it('границы месяца для середины месяца', () => {
    const mid = new Date('2026-02-14T10:00:00Z');
    expect(toDateKeyDay(startOfMonth(mid))).toBe('2026-02-01');
    expect(toDateKeyDay(endOfMonth(mid))).toBe('2026-02-28');
  });
});
