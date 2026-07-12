import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface ONasData {
  seo: PageSeo;
}

export async function data(): Promise<ONasData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'О проекте Зодиакум — как мы считаем и почему нам можно доверять',
      description:
        'Зодиакум — астрологический и нумерологический портал с открытым расчётным ядром: реальная астрономия вместо готовых шаблонов, честные допущения, редакционная проверка контента.',
      canonicalPath: '/o-nas',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'О проекте', path: '/o-nas' }])],
    },
  };
}
