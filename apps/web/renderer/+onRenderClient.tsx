/** Клиентский рендер-хук Vike: гидратация того же дерева, что отрисовал сервер. */
import { hydrateRoot } from 'react-dom/client';
import type { OnRenderClientAsync, PageContextClient } from 'vike/types';
import { AppRoot } from '../lib/site/AppRoot.js';

export const onRenderClient: OnRenderClientAsync = async (pageContext: PageContextClient) => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('#root не найден в разметке от сервера');
  }
  hydrateRoot(container, <AppRoot pageContext={pageContext} />);
};
