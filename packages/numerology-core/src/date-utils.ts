/**
 * Чистые календарные утилиты (без обращения к системным часам) — нужны только для проверки
 * корректности дат (существует ли «29 февраля» в данном году и т.п.). Никакого `Date.now()`.
 */

/** Високосный год по григорианскому календарю. */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const DAYS_IN_MONTH: readonly number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Число дней в месяце `month` (1–12) данного года (учитывает високосный февраль). */
export function daysInMonth(month: number, year: number): number {
  if (month === 2 && isLeapYear(year)) return 29;
  return DAYS_IN_MONTH[month - 1] ?? 31;
}

/** Существует ли календарная дата день/месяц/год. */
export function isValidCalendarDate(day: number, month: number, year: number): boolean {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;
  return day <= daysInMonth(month, year);
}
