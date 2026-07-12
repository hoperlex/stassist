import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { PodelitsyaData } from './+data.js';

function pos(longitudeDeg: number) {
  return {
    longitudeDeg, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false,
    signIndex: Math.floor(longitudeDeg / 30), signDegree: longitudeDeg % 30, houseNumber: 1,
  };
}

const positions = {
  bodies: {
    sun: pos(10), moon: pos(100), mercury: pos(15), venus: pos(200), mars: pos(280),
    jupiter: pos(340), saturn: pos(60), uranus: pos(130), neptune: pos(150), pluto: pos(170),
  },
  points: {},
  angles: { ascDeg: 15, mcDeg: 285, dscDeg: 195, icDeg: 105, armcDeg: 280, vertexDeg: null },
  houses: Array.from({ length: 12 }, (_unused, i) => ({ number: i + 1, longitudeDeg: (15 + i * 30) % 360 })),
  aspects: [],
  meta: { houseSystem: 'placidus' as const, zodiac: 'tropical' as const, noHouses: false },
};

describe('pages/podelitsya/@slug', () => {
  it('рендерит ChartWheel и честную заметку, пока PNG не готов', () => {
    const fixture: PodelitsyaData = {
      seo: { title: 't', description: 'd', canonicalPath: '/podelitsya/abc' },
      share: { slug: 'abc', kind: 'natal', positions, positionsB: null, theme: 'light', ogImageReady: false },
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('Натальная карта');
    expect(html).toContain('готовится');
    expect(html).toContain('<svg');
  });
});
