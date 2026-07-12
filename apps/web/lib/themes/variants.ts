/**
 * Реестр вариантов оформления главной страницы. 6 вариантов: текущий минимал-antd + 5 новых
 * дизайн-направлений. Разметка и стили каждого нового варианта вынесены в generated/<slug>.*
 * (собраны из самодостаточных макетов) и подключаются как строки через ?raw — их инъектит
 * DesignVariant. Переключение — внизу страницы (ThemeSwitcher), выбор хранится в localStorage.
 */
import midnightCss from './generated/midnight.style.txt?raw';
import midnightHtml from './generated/midnight.body.html?raw';
import artdecoCss from './generated/artdeco.style.txt?raw';
import artdecoHtml from './generated/artdeco.body.html?raw';
import lightCss from './generated/light.style.txt?raw';
import lightHtml from './generated/light.body.html?raw';
import almanacCss from './generated/almanac.style.txt?raw';
import almanacHtml from './generated/almanac.body.html?raw';
import auroraCss from './generated/aurora.style.txt?raw';
import auroraHtml from './generated/aurora.body.html?raw';

export type VariantId = 'existing' | 'midnight' | 'artdeco' | 'light' | 'almanac' | 'aurora';

export interface VariantMeta {
  id: VariantId;
  /** Короткая подпись в переключателе. */
  label: string;
  /** Полное имя направления (title/подсказка). */
  fullLabel: string;
}

export const VARIANTS: VariantMeta[] = [
  { id: 'existing', label: 'Текущий', fullLabel: 'Текущий (минимал)' },
  { id: 'midnight', label: 'Космос', fullLabel: 'Полночный космос' },
  { id: 'artdeco', label: 'Ар-деко', fullLabel: 'Мистический ар-деко' },
  { id: 'light', label: 'Небесный свет', fullLabel: 'Небесный свет' },
  { id: 'almanac', label: 'Альманах', fullLabel: 'Ретро-альманах' },
  { id: 'aurora', label: 'Аврора', fullLabel: 'Аврора / неон-модерн' },
];

export interface VariantAsset {
  css: string;
  html: string;
}

export const VARIANT_ASSETS: Record<Exclude<VariantId, 'existing'>, VariantAsset> = {
  midnight: { css: midnightCss, html: midnightHtml },
  artdeco: { css: artdecoCss, html: artdecoHtml },
  light: { css: lightCss, html: lightHtml },
  almanac: { css: almanacCss, html: almanacHtml },
  aurora: { css: auroraCss, html: auroraHtml },
};

export function isVariantId(value: string | null | undefined): value is VariantId {
  return typeof value === 'string' && VARIANTS.some((v) => v.id === value);
}
