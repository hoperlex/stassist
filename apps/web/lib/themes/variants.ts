/**
 * Оформление главной страницы — тема сайта «Небесный свет». Разметка и стили собраны из
 * самодостаточного макета (generated/light.*) и подключаются как строки через ?raw — их инъектит
 * DesignVariant. Раньше здесь был реестр из 6 вариантов с переключателем на главной; переключатель
 * убран (заказчик выбрал «Небесный свет» как единственное оформление), альтернативные превью удалены.
 */
import lightCss from './generated/light.style.txt?raw';
import lightHtml from './generated/light.body.html?raw';

export interface VariantAsset {
  css: string;
  html: string;
}

/** Единственное оформление главной — «Небесный свет» (тема сайта, она же SEO-версия). */
export const LIGHT_ASSET: VariantAsset = { css: lightCss, html: lightHtml };
