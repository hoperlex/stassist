import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface TarifyData {
  seo: PageSeo;
}

export async function data(): Promise<TarifyData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Тарифы Зодиакум — бесплатный доступ и Премиум-подписка',
      description:
        'Сравнение тарифов Зодиакум: бесплатный доступ к расчётам и первому ИИ-разбору, Премиум-подписка с полной лентой прогнозов, безлимитным чатом и скидкой на PDF. Пробный период 7 дней.',
      canonicalPath: '/tarify',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Тарифы', path: '/tarify' }])],
    },
  };
}
