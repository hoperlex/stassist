/**
 * Серверный рендер-хук Vike (без vike-react — React 18 несовместим с её requires react>=19).
 * Здесь же — SSR-извлечение стилей AntD5 через @ant-design/cssinjs (extractStyle): рендерим
 * страницу в StyleProvider с собственным cache, затем достаём собранный CSS и кладём его в
 * <head> ДО тела — иначе на первом кадре у пользователя «мигают» нестилизованные компоненты.
 *
 * Ф3: per-страничные SEO-метаданные (title/description/canonical/JSON-LD/og:image) — см.
 * apps/web/lib/seo.ts. Страница отдаёт `PageSeo` через `+data.ts` (поле `data.seo`); если его
 * нет (старые страницы Ф0–Ф2), используется дефолт сайта — обратная совместимость сохранена.
 */
import { renderToString } from 'react-dom/server';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import type { OnRenderHtmlAsync, PageContextServer } from 'vike/types';
import { loadConfig } from '@stassist/shared';
import type { PageSeo } from '../lib/seo.js';

const DEFAULT_TITLE = 'Stassist — русскоязычный астрологический портал';
const DEFAULT_DESCRIPTION =
  'Гороскопы, ИИ-астропомощник, нумерология и матрица судьбы, база знаний. Скоро запуск.';

export const onRenderHtml: OnRenderHtmlAsync = async (pageContext: PageContextServer) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Page = pageContext.Page as React.ComponentType<any> | undefined;
  if (!Page) {
    throw new Error('pages/**/+Page.tsx не найден для текущего маршрута');
  }

  const cache = createCache();
  const pageHtml = renderToString(
    <StyleProvider cache={cache} hashPriority="high">
      <Page pageContext={pageContext} />
    </StyleProvider>,
  );
  const styleText = extractStyle(cache, true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo: PageSeo | undefined = (pageContext.data as any)?.seo;
  const title = seo?.title ?? DEFAULT_TITLE;
  const description = seo?.description ?? DEFAULT_DESCRIPTION;
  const appUrl = loadConfig().appUrl;
  const canonicalUrl = seo ? `${appUrl}${seo.canonicalPath}` : undefined;
  const jsonLdBlocks = (seo?.jsonLd ?? []).map(
    (obj) => `<script type="application/ld+json">${dangerouslySkipEscape(JSON.stringify(obj))}</script>`,
  );

  const documentHtml = escapeInject`<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <title>${title}</title>
    ${seo?.noindex ? dangerouslySkipEscape('<meta name="robots" content="noindex,follow" />') : ''}
    ${canonicalUrl ? dangerouslySkipEscape(`<link rel="canonical" href="${canonicalUrl}" />`) : ''}
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    ${canonicalUrl ? dangerouslySkipEscape(`<meta property="og:url" content="${canonicalUrl}" />`) : ''}
    ${seo?.ogImage ? dangerouslySkipEscape(`<meta property="og:image" content="${seo.ogImage}" />`) : ''}
    ${dangerouslySkipEscape(jsonLdBlocks.join(''))}
    ${dangerouslySkipEscape(styleText)}
  </head>
  <body>
    <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
  </body>
</html>`;

  return {
    documentHtml,
    pageContext: {},
  };
};
