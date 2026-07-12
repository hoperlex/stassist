import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface PravilaData {
  seo: PageSeo;
}

export async function data(): Promise<PravilaData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Правила сообщества | Stassist',
      description: 'Этический кодекс сообщества Stassist: что можно и что запрещено при публикации разборов, комментариев и обсуждений.',
      canonicalPath: '/pravila-soobshchestva',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Правила сообщества', path: '/pravila-soobshchestva' }])],
    },
  };
}
