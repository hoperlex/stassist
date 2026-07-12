import type { PageSeo } from '../../lib/seo.js';

export interface EmailOptoutsData {
  seo: PageSeo;
}

/** Служебная страница (не для индексации) — см. +Page.tsx. */
export async function data(): Promise<EmailOptoutsData> {
  return {
    seo: {
      title: 'Отписка от рассылки | Stassist',
      description: 'Отписка от e-mail-рассылок Stassist.',
      canonicalPath: '/email-optouts',
      noindex: true,
    },
  };
}
