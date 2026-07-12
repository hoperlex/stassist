import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface FaqData {
  seo: PageSeo;
}

export async function data(): Promise<FaqData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Вопросы и ответы — Зодиакум',
      description:
        'Частые вопросы о Зодиакум: точность расчётов, подписка и оплата, персональные данные, отмена подписки, PDF-отчёты и индивидуальные прогнозы.',
      canonicalPath: '/faq',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Вопросы и ответы', path: '/faq' }])],
    },
  };
}
