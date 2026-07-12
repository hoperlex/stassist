import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface IndexData {
  seo: PageSeo;
}

export async function data(): Promise<IndexData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Stassist — натальная карта, матрица судьбы, гороскопы и ИИ-астропомощник',
      description:
        'Бесплатный расчёт натальной карты, матрицы судьбы, совместимости и нумерологии — с точным астрономическим ядром и разбором от ИИ. Гороскопы, лунный календарь, база знаний.',
      canonicalPath: '/',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }])],
    },
  };
}
