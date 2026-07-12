/**
 * Обёртка над `Geocoder`-портом (@stassist/shared) с кэшем `geocode_cache` (Ф2, см. §5 конвенций
 * реализации: «явно в списке миграций Ф2» + findings f2.md [geocoding]: обязательное соблюдение
 * usage policy Nominatim — сначала кэш, потом сеть).
 *
 * `geocode_cache` хранит ОДНУ запись на нормализованный запрос (query_norm unique) — этого
 * достаточно, чтобы гасить повторные ОДИНАКОВЫЕ запросы (типичная usage-policy-защита: debounce
 * на клиенте + идентичные запросы разных пользователей не бьют по Nominatim повторно). Полный
 * список подсказок при первом (некэшированном) запросе всё равно идёт живым в Geocoder — кэш
 * запоминает лучший (первый) вариант.
 */
import type { Db } from '@stassist/db';
import { normalizeGeocodeQuery, type Geocoder, type GeocodeResult } from '@stassist/shared';
import { findCachedGeocode, upsertCachedGeocode } from '../repositories/geocode-cache-repository.js';

export class CachedGeocoder implements Geocoder {
  constructor(
    private readonly db: Db,
    private readonly upstream: Geocoder,
    private readonly providerName: string,
  ) {}

  async geocode(query: string): Promise<GeocodeResult | null> {
    const results = await this.suggest(query, 1);
    return results[0] ?? null;
  }

  async suggest(query: string, limit = 5): Promise<GeocodeResult[]> {
    const queryNorm = normalizeGeocodeQuery(query);
    if (!queryNorm) return [];

    const cached = await findCachedGeocode(this.db, queryNorm);
    if (cached) return [cached];

    const results = await this.upstream.suggest(query, limit);
    const best = results[0];
    if (best) {
      await upsertCachedGeocode(this.db, { queryNorm, result: best, provider: this.providerName });
    }
    return results;
  }
}
