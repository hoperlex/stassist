/**
 * Реестр вариантов оформления главной. Дефолт и тема сайта — «Небесный свет» (light); остальные
 * 4 (Космос/Ар-деко/Альманах/Аврора) — полностраничные превью, доступные через переключатель внизу
 * главной (ThemeSwitcher, только десктоп; выбор в localStorage). Разметка и стили каждого варианта
 * вынесены в generated/<slug>.{style.txt,body.html} и подключаются как строки через ?raw — их
 * инъектит DesignVariant.
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

export type VariantId = 'light' | 'midnight' | 'artdeco' | 'almanac' | 'aurora';

export interface VariantMeta {
  id: VariantId;
  /** Короткая подпись в переключателе. */
  label: string;
  /** Полное имя направления (title/подсказка). */
  fullLabel: string;
}

export const VARIANTS: VariantMeta[] = [
  { id: 'light', label: 'Небесный свет', fullLabel: 'Небесный свет (тема сайта)' },
  { id: 'midnight', label: 'Космос', fullLabel: 'Полночный космос' },
  { id: 'artdeco', label: 'Ар-деко', fullLabel: 'Мистический ар-деко' },
  { id: 'almanac', label: 'Альманах', fullLabel: 'Ретро-альманах' },
  { id: 'aurora', label: 'Аврора', fullLabel: 'Аврора / неон-модерн' },
];

export interface VariantAsset {
  css: string;
  html: string;
}

export const VARIANT_ASSETS: Record<VariantId, VariantAsset> = {
  midnight: { css: midnightCss, html: midnightHtml },
  artdeco: { css: artdecoCss, html: artdecoHtml },
  light: { css: lightCss, html: lightHtml },
  almanac: { css: almanacCss, html: almanacHtml },
  aurora: { css: auroraCss, html: auroraHtml },
};

export function isVariantId(value: string | null | undefined): value is VariantId {
  return typeof value === 'string' && VARIANTS.some((v) => v.id === value);
}
