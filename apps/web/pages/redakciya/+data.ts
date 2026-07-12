import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface RedakciyaData {
  seo: PageSeo;
}

export async function data(): Promise<RedakciyaData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Редакция Зодиакум — кто и как готовит материалы портала',
      description:
        'Как устроена редакция Зодиакум: кто отвечает за астрологические и нумерологические материалы, как проходит проверка текстов и что означают статусы «черновик» и «проверено».',
      canonicalPath: '/redakciya',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Редакция', path: '/redakciya' }])],
    },
  };
}
