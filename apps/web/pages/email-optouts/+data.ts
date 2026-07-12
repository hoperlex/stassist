import type { PageSeo } from '../../lib/seo.js';

export interface EmailOptoutsData {
  seo: PageSeo;
}

/** Служебная страница (не для индексации) — см. +Page.tsx. */
export async function data(): Promise<EmailOptoutsData> {
  return {
    seo: {
      title: 'Отписка от рассылки | Зодиакум',
      description: 'Отписка от e-mail-рассылок Зодиакум.',
      canonicalPath: '/email-optouts',
      noindex: true,
    },
  };
}
