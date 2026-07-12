/**
 * Русские названия объектов/аспектов для текста сериализатора (см. src/facts/serializer.ts).
 * Отдельный словарь (не переиспользуем `packages/ui/src/chart-wheel/glyphs.ts` — там React/SVG
 * зависимости, а `packages/llm` должен оставаться независимым от UI-пакета).
 */
import { signByIndex, type ZodiacSignInfo } from '@stassist/shared';
import { ZODIAC_SIGN_EN_SLUGS, type AspectAngleSlug } from './keys.js';

/** RU-данные знака (имя/родительный падеж/стихия/крест) по английскому слагу ключей корпуса
 *  (см. заголовок keys.ts) — переиспользует единый источник правды ZODIAC_SIGNS из @stassist/shared. */
export function signRuInfoByEnSlug(enSlug: string): ZodiacSignInfo {
  const idx = ZODIAC_SIGN_EN_SLUGS.indexOf(enSlug as (typeof ZODIAC_SIGN_EN_SLUGS)[number]);
  if (idx === -1) throw new Error(`signRuInfoByEnSlug: неизвестный английский слаг знака "${enSlug}"`);
  const info = signByIndex(idx);
  if (!info) throw new Error(`signRuInfoByEnSlug: нет RU-данных для индекса ${idx}`);
  return info;
}

export const OBJECT_NAME_RU: Record<string, string> = {
  sun: 'Солнце',
  moon: 'Луна',
  mercury: 'Меркурий',
  venus: 'Венера',
  mars: 'Марс',
  jupiter: 'Юпитер',
  saturn: 'Сатурн',
  uranus: 'Уран',
  neptune: 'Нептун',
  pluto: 'Плутон',
  chiron: 'Хирон',
  north_node: 'Северный узел',
  south_node: 'Южный узел',
  lilith: 'Лилит',
  selena: 'Селена',
};

export function objectNameRu(slug: string): string {
  return OBJECT_NAME_RU[slug] ?? slug;
}

export const ASPECT_NAME_RU: Record<AspectAngleSlug, string> = {
  conjunction: 'соединение',
  opposition: 'оппозиция',
  trine: 'трин',
  square: 'квадрат',
  sextile: 'секстиль',
  quincunx: 'квинконс',
  semisextile: 'полусекстиль',
  semisquare: 'полуквадрат',
  sesquiquadrate: 'полутораквадрат',
  quintile: 'квинтиль',
  biquintile: 'биквинтиль',
};

export function aspectNameRu(angle: string): string {
  return ASPECT_NAME_RU[angle as AspectAngleSlug] ?? angle;
}
