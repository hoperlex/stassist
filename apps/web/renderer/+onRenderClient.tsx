/** Клиентский рендер-хук Vike: гидратация того же дерева, что отрисовал сервер. */
import { hydrateRoot } from 'react-dom/client';
import type { OnRenderClientAsync, PageContextClient } from 'vike/types';

export const onRenderClient: OnRenderClientAsync = async (pageContext: PageContextClient) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Page = pageContext.Page as React.ComponentType<any> | undefined;
  if (!Page) {
    throw new Error('pages/**/+Page.tsx не найден для текущего маршрута');
  }
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('#root не найден в разметке от сервера');
  }
  hydrateRoot(container, <Page pageContext={pageContext} />);
};
