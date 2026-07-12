import { loadConfig } from '@stassist/shared';
import { ASTRO_CORE_VERSION } from '@stassist/astro-core';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface MethodologyData {
  seo: PageSeo;
  coreVersion: string;
}

/** `/methodology` — доверие E-E-A-T (doc 23 §5: «версия ядра, точность, источники алгоритмов —
 *  уникально для ниши», промт Ф8 req.6 явно требует эту страницу). */
export async function data(): Promise<MethodologyData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Методология расчётов — Зодиакум',
      description:
        'Как Зодиакум считает натальные карты, матрицу судьбы и элективные окна: источники алгоритмов, версия расчётного ядра, известные допущения и точность.',
      canonicalPath: '/methodology',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Методология', path: '/methodology' }])],
    },
    coreVersion: ASTRO_CORE_VERSION,
  };
}
