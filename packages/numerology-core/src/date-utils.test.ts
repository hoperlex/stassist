import { describe, expect, it } from 'vitest';
import { daysInMonth, isLeapYear, isValidCalendarDate } from './date-utils.js';

describe('isLeapYear', () => {
  it('2000 — високосный (делится на 400)', () => {
    expect(isLeapYear(2000)).toBe(true);
  });

  it('1900 — НЕ високосный (делится на 100, но не на 400)', () => {
    expect(isLeapYear(1900)).toBe(false);
  });

  it('2024 — високосный (делится на 4, не на 100)', () => {
    expect(isLeapYear(2024)).toBe(true);
  });

  it('2023 — не високосный', () => {
    expect(isLeapYear(2023)).toBe(false);
  });
});

describe('daysInMonth', () => {
  it('февраль високосного года — 29 дней', () => {
    expect(daysInMonth(2, 2000)).toBe(29);
  });

  it('февраль невисокосного года — 28 дней', () => {
    expect(daysInMonth(2, 1900)).toBe(28);
  });

  it('апрель — 30 дней', () => {
    expect(daysInMonth(4, 2024)).toBe(30);
  });
});

describe('isValidCalendarDate', () => {
  it('29 февраля 2000 — валидная дата (високосный год)', () => {
    expect(isValidCalendarDate(29, 2, 2000)).toBe(true);
  });

  it('30 февраля не существует ни в каком году', () => {
    expect(isValidCalendarDate(30, 2, 2000)).toBe(false);
  });

  it('31 апреля не существует (в апреле 30 дней)', () => {
    expect(isValidCalendarDate(31, 4, 2024)).toBe(false);
  });
});
