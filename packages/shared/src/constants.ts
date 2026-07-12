export const APP_NAME = 'Stassist';
export const DEFAULT_LOCALE = 'ru' as const;

/** Заголовок, который прокидывается как correlation id (request-id) через все процессы. */
export const REQUEST_ID_HEADER = 'x-request-id';

/**
 * Опорная локация публичного лунного календаря (единственный источник правды — используется и
 * apps/worker при предрасчёте `astro_calendar`, и apps/api при отдаче ответа, чтобы UI мог честно
 * показать «по московскому времени», см. findings f3.md [internal-completeness] «не задана
 * опорная локация», docs/roadmap/prompts/f3-калькуляторы-и-карта.md). Лунные дни/void геозависимы
 * (считаются по восходам Луны для конкретной точки) — персональная гео-локация лунных дней —
 * фича кабинета за пределами MVP-предрасчёта.
 */
export const CALENDAR_REFERENCE_LOCATION = {
  name: 'Москва',
  lat: 55.7558,
  lon: 37.6173,
  tzId: 'Europe/Moscow',
} as const;

/** Час дня (по местному времени опорной локации), на который считается «снимок» суток. */
export const CALENDAR_REFERENCE_SNAPSHOT_HOUR = 12;
