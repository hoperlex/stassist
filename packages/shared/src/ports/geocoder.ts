/**
 * Порт геокодера (место рождения → координаты + часовой пояс). Реальная реализация —
 * `NominatimGeocoder` (Ф2, с User-Agent/rate-limit; кэш `geocode_cache` — на уровне apps/api,
 * см. apps/api/src/geocoding/cached-geocoder.ts, а НЕ здесь: этот пакет не имеет доступа к БД);
 * стаб — фиксированный справочник крупных городов РФ (детерминированный, не «Lorem», §2 конвенций).
 *
 * **coord→IANA tz** (находка f2.md [geocoding]): Nominatim возвращает только lat/lon, БЕЗ
 * часового пояса — `NominatimGeocoder` дополнительно прогоняет координаты через офлайн-библиотеку
 * `tz-lookup` (без сети, без внешнего сервиса) и кладёт результат в `tzId`.
 */
import tzlookup from 'tz-lookup';

export interface GeocodeResult {
  placeName: string;
  lat: number;
  lon: number;
  /** IANA-идентификатор часового пояса. */
  tzId: string;
}

export interface Geocoder {
  geocode(query: string): Promise<GeocodeResult | null>;
  /** Список подсказок для автодополнения (AntD AutoComplete) — до `limit` вариантов. */
  suggest(query: string, limit?: number): Promise<GeocodeResult[]>;
}

/** Ключ кэша/сравнения — нормализованный запрос (используется и `geocode_cache.query_norm`). */
export const normalizeGeocodeQuery = (s: string): string => s.trim().toLowerCase();

/** Известные города — публичные общеизвестные координаты, для стаба без сети. */
const FIXTURES: Record<string, GeocodeResult> = {
  'москва': { placeName: 'Москва, Россия', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
  'санкт-петербург': {
    placeName: 'Санкт-Петербург, Россия',
    lat: 59.9311,
    lon: 30.3609,
    tzId: 'Europe/Moscow',
  },
  'новосибирск': {
    placeName: 'Новосибирск, Россия',
    lat: 55.0084,
    lon: 82.9357,
    tzId: 'Asia/Novosibirsk',
  },
  'екатеринбург': {
    placeName: 'Екатеринбург, Россия',
    lat: 56.8389,
    lon: 60.6057,
    tzId: 'Asia/Yekaterinburg',
  },
  'казань': { placeName: 'Казань, Россия', lat: 55.8304, lon: 49.0661, tzId: 'Europe/Moscow' },
  'владивосток': {
    placeName: 'Владивосток, Россия',
    lat: 43.1155,
    lon: 131.8855,
    tzId: 'Asia/Vladivostok',
  },
};

export class FixtureGeocoder implements Geocoder {
  async geocode(query: string): Promise<GeocodeResult | null> {
    const results = await this.suggest(query, 1);
    return results[0] ?? null;
  }

  async suggest(query: string, limit = 5): Promise<GeocodeResult[]> {
    const key = normalizeGeocodeQuery(query);
    if (!key) return [];
    const exact = FIXTURES[key];
    const rest = Object.entries(FIXTURES)
      .filter(([name]) => name !== key && (key.includes(name) || name.includes(key)))
      .map(([, v]) => v);
    const all = exact ? [exact, ...rest] : rest;
    return all.slice(0, limit);
  }
}

export interface NominatimGeocoderOptions {
  baseUrl: string;
  /** Обязателен по usage policy Nominatim (identifying User-Agent с контактом). */
  userAgent: string;
  /** Минимальный интервал между запросами (мс) — Nominatim policy: не чаще 1 req/sec. */
  minIntervalMs?: number;
  fetchImpl?: typeof fetch;
}

interface NominatimSearchItem {
  display_name: string;
  lat: string;
  lon: string;
}

/**
 * Реальный адаптер — публичный Nominatim (или self-host на проде, см. NOMINATIM_URL). Соблюдает
 * usage policy: identifying User-Agent (обязателен) + мин. интервал между запросами (rate-limit
 * на стороне клиента). Кэш `geocode_cache` подключается ВЫШЕ по стеку (apps/api), т.к. этот
 * пакет не имеет доступа к БД — см. заголовок файла.
 *
 * НЕ используется в unit/build-гейте (сеть) — конструируется только при `GEOCODER=nominatim`
 * (см. ports/factory.ts), проверяется в integration/e2e с реальной сетью.
 */
export class NominatimGeocoder implements Geocoder {
  private readonly baseUrl: string;
  private readonly userAgent: string;
  private readonly minIntervalMs: number;
  private readonly fetchImpl: typeof fetch;
  private lastRequestAt = 0;

  constructor(options: NominatimGeocoderOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.userAgent = options.userAgent;
    this.minIntervalMs = options.minIntervalMs ?? 1000;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  private async throttle(): Promise<void> {
    const elapsed = Date.now() - this.lastRequestAt;
    if (elapsed < this.minIntervalMs) {
      await new Promise((resolve) => setTimeout(resolve, this.minIntervalMs - elapsed));
    }
    this.lastRequestAt = Date.now();
  }

  async geocode(query: string): Promise<GeocodeResult | null> {
    const results = await this.suggest(query, 1);
    return results[0] ?? null;
  }

  async suggest(query: string, limit = 5): Promise<GeocodeResult[]> {
    const q = query.trim();
    if (!q) return [];
    await this.throttle();

    const url = new URL(`${this.baseUrl}/search`);
    url.searchParams.set('q', q);
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('addressdetails', '0');

    const response = await this.fetchImpl(url, {
      headers: { 'User-Agent': this.userAgent, Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Nominatim: HTTP ${response.status} для запроса "${q}"`);
    }
    const items = (await response.json()) as NominatimSearchItem[];
    return items.map((item) => {
      const lat = Number.parseFloat(item.lat);
      const lon = Number.parseFloat(item.lon);
      return {
        placeName: item.display_name,
        lat,
        lon,
        // Nominatim НЕ отдаёт tz — считаем офлайн из координат (см. заголовок файла).
        tzId: tzlookup(lat, lon),
      };
    });
  }
}
