/**
 * Реэкспорт единого источника правды по форматам `date_key` — см. @stassist/shared
 * src/horoscope-date-keys.ts (doc-комментарий там же объясняет, почему эта логика НЕ
 * дублируется между apps/worker/apps/api, в отличие от остального кода Ф5).
 */
export {
  addDays,
  dateKeysInRange,
  endOfMonth,
  isoWeekStart,
  mskNow,
  startOfMonth,
  toDateKeyDay,
  toDateKeyMonth,
  toDateKeyWeek,
  toDateKeyYear,
} from '@stassist/shared';
