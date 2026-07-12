/**
 * Русские подписи для фильтров/тегов страниц камней (см. apps/web/pages/kamni). Единый источник
 * RU-названия знака по EN-слагу (`stones.zodiac_signs`) — `ZODIAC_SIGNS`/`zodiacEnSlugByIndex` из
 * `@stassist/shared` дают RU-слаг/имя по индексу, здесь просто переиндексировано по EN-слагу.
 *
 * Импорт НАПРЯМУЮ из подмодулей (а НЕ `from '@stassist/shared'`) — этот файл используется
 * клиентскими `+Page.tsx` (см. apps/web/pages/kamni), баррель-индекс `@stassist/shared` тянет
 * серверные порты/node:crypto в клиентский бандл (тот же приём, что pages/natalnaya-karta/+Page.tsx).
 */
import { STONE_CHAKRA_NAME_RU, STONE_PLANET_NAME_RU, STONE_PURPOSE_NAME_RU } from '@stassist/shared/schemas/stone.js';
import { ZODIAC_SIGNS, zodiacEnSlugByIndex, type ZodiacSignEnSlug } from '@stassist/shared/schemas/zodiac.js';

export const ZODIAC_EN_TO_NAME_RU: Record<ZodiacSignEnSlug, string> = Object.fromEntries(
  ZODIAC_SIGNS.map((s) => [zodiacEnSlugByIndex(s.signIndex), s.nameRu]),
) as Record<ZodiacSignEnSlug, string>;

export const ZODIAC_EN_TO_RU_SLUG: Record<ZodiacSignEnSlug, string> = Object.fromEntries(
  ZODIAC_SIGNS.map((s) => [zodiacEnSlugByIndex(s.signIndex), s.slug]),
) as Record<ZodiacSignEnSlug, string>;

export { STONE_PLANET_NAME_RU, STONE_PURPOSE_NAME_RU, STONE_CHAKRA_NAME_RU };
