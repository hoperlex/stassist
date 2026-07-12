/**
 * geocode_cache — кэш геокодинга (см. docs/architecture/22-модель-данных.md §7б и §5 конвенций
 * реализации: «явно в списке миграций Ф2»). Наполняется api-слоем (см.
 * apps/api/src/geocoding/cached-geocoder.ts) при каждом успешном запросе к реальному Nominatim —
 * повторные запросы того же нормализованного места не бьют по внешнему API (обязательно по
 * usage policy Nominatim, см. findings f2.md [geocoding]).
 */
import { doublePrecision, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const geocodeCache = pgTable('geocode_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  /** Нормализованный запрос (trim+lowercase) — ключ кэша. */
  queryNorm: text('query_norm').notNull().unique(),
  placeName: text('place_name').notNull(),
  lat: doublePrecision('lat').notNull(),
  lon: doublePrecision('lon').notNull(),
  tzId: text('tz_id').notNull(),
  provider: text('provider').notNull(),
  fetchedAt: timestamp('fetched_at', { withTimezone: true }).notNull().defaultNow(),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
