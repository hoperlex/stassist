/**
 * SSR-данные «Неба дня» (Ф9, публичная страница): событие дня из `GET /sky/today` + SSR-тред
 * (комментарии публичны). День ещё не рассчитан (первый запуск до тика worker'а) — честный
 * empty-state с noindex (паттерн findings f5.md «явная заглушка с noindex»), НЕ 404: страница
 * раздела существует всегда.
 */
import type { CommentResponse, SkyDayResponse } from '@stassist/shared';
import { loadConfig } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';
import { ServerApiError, serverApiGet } from '../../lib/server-api.js';

export interface NeboDnyaData {
  seo: PageSeo;
  day: SkyDayResponse | null;
  comments: CommentResponse[];
}

export async function loadSkyDayData(path: string, canonicalPath: string): Promise<NeboDnyaData> {
  let day: SkyDayResponse | null = null;
  try {
    day = await serverApiGet<SkyDayResponse>(path);
  } catch (err) {
    if (!(err instanceof ServerApiError && err.status === 404)) throw err;
  }

  let comments: CommentResponse[] = [];
  if (day?.threadPostId) {
    try {
      const res = await serverApiGet<{ items: CommentResponse[] }>(`/posts/${day.threadPostId}/comments`);
      comments = res.items;
    } catch {
      comments = [];
    }
  }

  const appUrl = loadConfig().appUrl;
  const title = day ? `Небо дня: ${day.title} — Зодиакум` : 'Небо дня — Зодиакум';
  const description = day
    ? `${day.title}. Одно небо на всех — узнайте, как сегодняшнее событие касается вашей натальной карты, и оставьте отклик.`
    : 'Ежедневное астрособытие: одно небо на всех, персональная проекция на вашу карту, отклики сообщества.';

  return {
    seo: {
      title,
      description,
      canonicalPath,
      jsonLd: day
        ? [
            articleJsonLd(appUrl, { headline: title, description, path: canonicalPath, datePublished: day.dayKey }),
            breadcrumbJsonLd(appUrl, [
              { name: 'Главная', path: '/' },
              { name: 'Небо дня', path: '/nebo-dnya' },
            ]),
          ]
        : undefined,
      noindex: !day,
    },
    day,
    comments,
  };
}

export async function data(): Promise<NeboDnyaData> {
  return loadSkyDayData('/sky/today', '/nebo-dnya');
}
