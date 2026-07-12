/**
 * SSR-данные страницы пары совместимости: канонизация порядка (301 на канон, см. findings f3.md
 * [internal-completeness] «правило канонизации пар») + текст пары из `compat_pages` (Ф4 заливает
 * `bodyMd` — пока `null`, страница показывает честный empty-state, см. §6 конвенций реализации).
 */
import { redirect } from 'vike/abort';
import type { PageContextServer } from 'vike/types';
import { canonicalCompatPairSlug, loadConfig, signBySlug, type CompatPageResponse } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface SovmestimostPairData {
  seo: PageSeo;
  signA: string;
  signB: string;
  nameA: string;
  nameB: string;
  bodyMd: string | null;
}

export async function data(pageContext: PageContextServer): Promise<SovmestimostPairData> {
  const raw = pageContext.routeParams.pair ?? '';
  const [rawA, rawB] = raw.split('-i-');
  const canon = rawA && rawB ? canonicalCompatPairSlug(rawA, rawB) : undefined;
  if (!canon) {
    throw redirect('/sovmestimost', 302);
  }
  if (canon.slug !== raw) {
    // Зеркальная пара (b-i-a) → 301 на каноническую (см. findings f3.md, минорный пункт).
    throw redirect(`/sovmestimost/${canon.slug}`, 301);
  }

  const nameA = signBySlug(canon.signA)?.nameRu ?? canon.signA;
  const nameB = signBySlug(canon.signB)?.nameRu ?? canon.signB;
  const appUrl = loadConfig().appUrl;

  let bodyMd: string | null = null;
  try {
    const compat = await serverApiGet<CompatPageResponse>(`/calc/compat-pages/${canon.signA}/${canon.signB}`);
    bodyMd = compat.bodyMd;
  } catch {
    bodyMd = null; // API/БД недоступны — честный empty-state, не 500 (см. заголовок файла)
  }

  return {
    seo: {
      title: `Совместимость ${nameA} и ${nameB} — гороскоп пары | Зодиакум`,
      description: `Совместимость знаков ${nameA} и ${nameB}: разбор пары и расчёт синастрии по датам рождения обоих партнёров.`,
      canonicalPath: `/sovmestimost/${canon.slug}`,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Совместимость', path: '/sovmestimost' },
          { name: `${nameA} и ${nameB}`, path: `/sovmestimost/${canon.slug}` },
        ]),
      ],
    },
    signA: canon.signA,
    signB: canon.signB,
    nameA,
    nameB,
    bodyMd,
  };
}
