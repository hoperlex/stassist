/**
 * SSR-снапшот «Неба дня» (Ф9) — renderToStaticMarkup по фикстуре (паттерн
 * pages/podelitsya/@slug/Page.test.tsx): заголовок события, колесо дня, агрегатная строка,
 * бейдж «ИИ» у Астры в треде и честный empty-state до первого прогона worker'а.
 */
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { SharePositions, SkyDayResponse } from '@stassist/shared';
import type { CommentResponse } from '@stassist/shared/schemas/community.js';
import { Page } from './+Page.js';
import type { NeboDnyaData } from './+data.js';

function pos(longitudeDeg: number) {
  return {
    longitudeDeg,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex: Math.floor(longitudeDeg / 30),
    signDegree: longitudeDeg % 30,
    houseNumber: null,
  };
}

const transitPositions: SharePositions = {
  bodies: {
    sun: pos(10), moon: pos(100), mercury: pos(15), venus: pos(200), mars: pos(280),
    jupiter: pos(340), saturn: pos(60), uranus: pos(130), neptune: pos(150), pluto: pos(170),
  },
  points: {},
  angles: { ascDeg: 0, mcDeg: 0, dscDeg: 0, icDeg: 0, armcDeg: 0, vertexDeg: null },
  houses: [],
  aspects: [],
  meta: { houseSystem: 'placidus', zodiac: 'tropical', noHouses: true },
};

const day: SkyDayResponse = {
  dayKey: '2026-07-13',
  title: 'Марс входит в знак Весов',
  summaryMd: 'Сегодня Марс меняет знак.\n\nОбратите внимание на баланс.',
  payload: {
    event: { kind: 'ingress', body: 'mars', signIndex: 6 },
    notableAspects: [],
    moonSignIndex: 4,
    lunarDay: 12,
    phaseName: 'waxing_gibbous',
    retrogradeBodies: [],
  },
  transitPositions,
  threadPostId: '7e0c8f1a-58e2-4a2f-9c37-2f6f1b1a2b3c',
  aggregates: { total: 87, hit: 40, partial: 30, miss: 17 },
};

const astraComment: CommentResponse = {
  id: 'c1a2b3c4-d5e6-47f8-9a0b-1c2d3e4f5a6b',
  postId: day.threadPostId!,
  authorId: 'a57a0000-0000-4000-8000-000000000001',
  authorDisplayName: 'Астра',
  authorKind: 'ai',
  parentId: null,
  bodyMd: 'Расскажите, как это небо отзывается у вас.',
  status: 'published',
  moderation: 'approved',
  markedUsefulAt: null,
  createdAt: '2026-07-13T00:40:00.000Z',
  isMine: false,
};

describe('pages/nebo-dnya', () => {
  it('рендерит событие дня: заголовок, текст, колесо, агрегаты и тред с бейджем «ИИ»', () => {
    const fixture: NeboDnyaData = {
      seo: { title: 't', description: 'd', canonicalPath: '/nebo-dnya' },
      day,
      comments: [astraComment],
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('Марс входит в знак Весов');
    expect(html).toContain('<svg');
    expect(html).toContain('откликнулись 87');
    expect(html).toContain('46%'); // 40/87 «в точку»
    expect(html).toContain('Астра');
    expect(html).toContain('ИИ');
    expect(html).toContain('Тред дня');
  });

  it('честный empty-state с CTA, пока worker не рассчитал день', () => {
    const fixture: NeboDnyaData = {
      seo: { title: 't', description: 'd', canonicalPath: '/nebo-dnya', noindex: true },
      day: null,
      comments: [],
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('рассчитывается');
    expect(html).toContain('/natalnaya-karta');
  });
});
