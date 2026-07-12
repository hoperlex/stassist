/**
 * Разбор URL `/planety/{planeta}-v-{znak|dom}` (см. docs/architecture/23-seo-стратегия.md §2, 240
 * URL = 10 планет × (12 знаков + 12 домов)). `+route.ts` использует эту функцию (см.
 * pages/planety/@slug/+route.ts).
 *
 * НАМЕРЕННО без импорта `@stassist/shared` — тот же осознанный выбор, что
 * apps/web/lib/goroskop-route.ts (doc-комментарий там: `+route.ts` компилируется vike упрощённым
 * загрузчиком, не резолвящим транзитивные зависимости воркспейс-пакетов). Списки ниже — ДУБЛИКАТ
 * `CLASSICAL_PLANETS`/`ZODIAC_SIGNS` (packages/shared/src/schemas/planet.ts,zodiac.ts) — только
 * для мэтчинга URL, не источник правды по данным (реальные данные — через `+data.ts`).
 */
const PLANET_RU_SLUG_TO_EN: Record<string, string> = {
  solnce: 'sun', luna: 'moon', merkurij: 'mercury', venera: 'venus', mars: 'mars',
  yupiter: 'jupiter', saturn: 'saturn', uran: 'uranus', neptun: 'neptune', pluton: 'pluto',
};

const SIGN_PREPOSITIONAL_TO_EN: Record<string, string> = {
  ovne: 'aries', teltse: 'taurus', bliznetsah: 'gemini', rake: 'cancer', lve: 'leo', deve: 'virgo',
  vesah: 'libra', skorpione: 'scorpio', streltse: 'sagittarius', kozeroge: 'capricorn', vodolee: 'aquarius', rybah: 'pisces',
};

export interface PlanetInSignMatch {
  kind: 'sign';
  planetRuSlug: string;
  planetEnSlug: string;
  signPrepositionalSlug: string;
  signEnSlug: string;
}
export interface PlanetInHouseMatch {
  kind: 'house';
  planetRuSlug: string;
  planetEnSlug: string;
  house: number;
}

const HOUSE_RE = /^([a-z]+)-v-(\d{1,2})-dome$/;
const SIGN_RE = /^([a-z]+)-v-([a-z]+)$/;

export function matchPlanetInSlug(urlPathname: string): PlanetInSignMatch | PlanetInHouseMatch | null {
  const parts = urlPathname.split('/').filter(Boolean);
  if (parts.length !== 2 || parts[0] !== 'planety') return null;
  const slug = parts[1]!;

  const houseMatch = HOUSE_RE.exec(slug);
  if (houseMatch) {
    const planetRuSlug = houseMatch[1]!;
    const house = Number(houseMatch[2]);
    const planetEnSlug = PLANET_RU_SLUG_TO_EN[planetRuSlug];
    if (!planetEnSlug || house < 1 || house > 12) return null;
    return { kind: 'house', planetRuSlug, planetEnSlug, house };
  }

  const signMatch = SIGN_RE.exec(slug);
  if (signMatch) {
    const planetRuSlug = signMatch[1]!;
    const signPrepositionalSlug = signMatch[2]!;
    const planetEnSlug = PLANET_RU_SLUG_TO_EN[planetRuSlug];
    const signEnSlug = SIGN_PREPOSITIONAL_TO_EN[signPrepositionalSlug];
    if (!planetEnSlug || !signEnSlug) return null;
    return { kind: 'sign', planetRuSlug, planetEnSlug, signPrepositionalSlug, signEnSlug };
  }

  return null;
}
