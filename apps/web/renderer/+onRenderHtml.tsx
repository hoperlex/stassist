/**
 * Серверный рендер-хук Vike (без vike-react — React 18 несовместим с её requires react>=19).
 * Здесь же — SSR-извлечение стилей AntD5 через @ant-design/cssinjs (extractStyle): рендерим
 * страницу в StyleProvider с собственным cache, затем достаём собранный CSS и кладём его в
 * <head> ДО тела — иначе на первом кадре у пользователя «мигают» нестилизованные компоненты.
 */
import { renderToString } from 'react-dom/server';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import type { OnRenderHtmlAsync, PageContextServer } from 'vike/types';

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

  const title = 'Stassist — русскоязычный астрологический портал';
  const description =
    'Гороскопы, ИИ-астропомощник, нумерология и матрица судьбы, база знаний. Скоро запуск.';

  const documentHtml = escapeInject`<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <title>${title}</title>
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
