import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { computeFourPillars, dayPillar, gregorianToJdn, yearPillar, HEAVENLY_STEMS, EARTHLY_BRANCHES } from './index.js';

describe('bazi/gregorianToJdn', () => {
  it('J2000 (2000-01-01 12:00 UT) — известный JDN 2451545', () => {
    expect(gregorianToJdn(2000, 1, 1)).toBe(2451545);
  });
});

describe('bazi/yearPillar', () => {
  it('1984 (после Личунь) — опорный год 甲子 (индексы 0,0), высокая уверенность (общеизвестный факт)', () => {
    const p = yearPillar(1984, 6, 1);
    expect(p.stemIndex).toBe(0);
    expect(p.branchIndex).toBe(0);
    expect(p.stem).toBe('甲');
    expect(p.branch).toBe('子');
  });

  it('60-летний цикл: 1984 и 2044 дают одинаковый столп', () => {
    const p1 = yearPillar(1984, 6, 1);
    const p2 = yearPillar(2044, 6, 1);
    expect(p2.stemIndex).toBe(p1.stemIndex);
    expect(p2.branchIndex).toBe(p1.branchIndex);
  });

  it('граница Личунь (~4 февраля): до неё считается предыдущий год', () => {
    const before = yearPillar(1985, 1, 1);
    const after = yearPillar(1985, 6, 1);
    // До Личунь 1985-й год ещё считается годом 1984 (甲子); после — 1985 (乙丑).
    expect(before.stemIndex).toBe(0);
    expect(after.stemIndex).toBe(1);
  });
});

describe('bazi/dayPillar', () => {
  it('опорная дата 1900-01-31 = 甲辰 (по построению)', () => {
    const p = dayPillar(1900, 1, 31);
    expect(p.stem).toBe('甲');
    expect(p.branch).toBe('辰');
  });

  it('60-дневный цикл: даты через 60 дней дают одинаковый столп', () => {
    const p1 = dayPillar(2000, 1, 1);
    const p2 = dayPillar(2000, 3, 1); // 60 дней спустя (январь 31 + февраль 29 (високосный) = 60)
    expect(p2.stemIndex).toBe(p1.stemIndex);
    expect(p2.branchIndex).toBe(p1.branchIndex);
  });
});

describe('bazi/computeFourPillars', () => {
  it('возвращает 4 корректных столпа с индексами в допустимых диапазонах', () => {
    const pillars = computeFourPillars(1990, 6, 15, 14);
    for (const pillar of Object.values(pillars)) {
      expect(pillar.stemIndex).toBeGreaterThanOrEqual(0);
      expect(pillar.stemIndex).toBeLessThan(10);
      expect(pillar.branchIndex).toBeGreaterThanOrEqual(0);
      expect(pillar.branchIndex).toBeLessThan(12);
      expect(HEAVENLY_STEMS).toContain(pillar.stem);
      expect(EARTHLY_BRANCHES).toContain(pillar.branch);
    }
  });

  it('property: для случайных дат все 4 столпа детерминированы и валидны', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1900, max: 2100 }),
        fc.integer({ min: 1, max: 12 }),
        fc.integer({ min: 1, max: 27 }),
        fc.integer({ min: 0, max: 23 }),
        (year, month, day, hour) => {
          const p1 = computeFourPillars(year, month, day, hour);
          const p2 = computeFourPillars(year, month, day, hour);
          expect(p1).toEqual(p2); // детерминизм
          for (const pillar of Object.values(p1)) {
            expect(pillar.stemIndex).toBeGreaterThanOrEqual(0);
            expect(pillar.stemIndex).toBeLessThan(10);
            expect(pillar.branchIndex).toBeGreaterThanOrEqual(0);
            expect(pillar.branchIndex).toBeLessThan(12);
          }
        },
      ),
    );
  });
});
