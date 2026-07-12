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

  // PWA: регистрируем service worker только в проде (в dev нечего кэшировать и это мешало бы HMR).
  // import.meta.env.PROD — true лишь в собранном клиентском бандле; guard на поддержку SW браузером.
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      void navigator.serviceWorker.register('/sw.js').catch(() => {
        /* регистрация не критична — сайт работает и без SW */
      });
    });
  }
};
