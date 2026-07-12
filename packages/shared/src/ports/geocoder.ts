/**
 * Порт геокодера (место рождения → координаты + часовой пояс). Реальная реализация — Nominatim
 * (поздние фазы, с User-Agent/лимитами/кэшем geocode_cache); стаб — фиксированный справочник
 * крупных городов РФ (детерминированный, не «Lorem», §2 конвенций).
 */

export interface GeocodeResult {
  placeName: string;
  lat: number;
  lon: number;
  /** IANA-идентификатор часового пояса. */
  tzId: string;
}

export interface Geocoder {
  geocode(query: string): Promise<GeocodeResult | null>;
}

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

const normalize = (s: string): string => s.trim().toLowerCase();

export class FixtureGeocoder implements Geocoder {
  async geocode(query: string): Promise<GeocodeResult | null> {
    const key = normalize(query);
    const exact = FIXTURES[key];
    if (exact) return exact;
    const partial = Object.entries(FIXTURES).find(([name]) => key.includes(name));
    return partial ? partial[1] : null;
  }
}
