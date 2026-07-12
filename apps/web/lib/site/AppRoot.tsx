/**
 * Корневая обёртка приложения — применяет тему «Небесный свет» на КАЖДОЙ странице: antd
 * ConfigProvider (токены), глобальный CSS (фон/шрифты/serif-заголовки) и общий SiteLayout
 * (шапка/подвал). Используется и в SSR (+onRenderHtml), и при гидратации (+onRenderClient),
 * поэтому деревья совпадают.
 *
 * Главная («/») рендерится БЕЗ SiteLayout: у неё собственный полностраничный герой и
 * переключатель оформления (см. pages/index/+Page.tsx) — общий каркас там был бы лишним/двойным.
 */
import { ConfigProvider } from 'antd';
import { celestialTheme } from './celestial-theme.js';
import { CELESTIAL_GLOBAL_CSS } from './global-css.js';
import { SiteLayout } from './SiteLayout.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppRoot({ pageContext }: { pageContext: any }): React.JSX.Element {
  const Page = pageContext.Page as React.ComponentType<{ pageContext: unknown }> | undefined;
  if (!Page) {
    throw new Error('pages/**/+Page.tsx не найден для текущего маршрута');
  }
  // Путь берём из pageContext (доступен на сервере), а на клиенте — из window.location: Vike без
  // passToClient не кладёт urlPathname в клиентский pageContext, и если бы isHome вычислялся иначе
  // на сервере и клиенте — SiteLayout «слетал» бы после гидратации (рассинхрон). Для одного и того
  // же URL оба источника дают один путь, поэтому деревья совпадают.
  const path: string =
    (typeof pageContext.urlPathname === 'string' && pageContext.urlPathname) ||
    (typeof window !== 'undefined' ? window.location.pathname : '/');
  const isHome = path === '/';
  const page = <Page pageContext={pageContext} />;

  return (
    <ConfigProvider theme={celestialTheme}>
      <style dangerouslySetInnerHTML={{ __html: CELESTIAL_GLOBAL_CSS }} />
      {isHome ? page : <SiteLayout>{page}</SiteLayout>}
    </ConfigProvider>
  );
}
