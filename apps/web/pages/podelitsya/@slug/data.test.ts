import { afterEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(slug: string) {
  return { routeParams: { slug } } as unknown as Parameters<typeof data>[0];
}

const positions = {
  bodies: {
    sun: { longitudeDeg: 10, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 0, signDegree: 10, houseNumber: 1 },
    moon: { longitudeDeg: 100, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 13, isRetrograde: false, signIndex: 3, signDegree: 10, houseNumber: 4 },
    mercury: { longitudeDeg: 15, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 0, signDegree: 15, houseNumber: 1 },
    venus: { longitudeDeg: 200, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 6, signDegree: 20, houseNumber: 7 },
    mars: { longitudeDeg: 280, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 9, signDegree: 10, houseNumber: 9 },
    jupiter: { longitudeDeg: 340, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 11, signDegree: 10, houseNumber: 11 },
    saturn: { longitudeDeg: 60, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 2, signDegree: 0, houseNumber: 3 },
    uranus: { longitudeDeg: 130, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 4, signDegree: 10, houseNumber: 5 },
    neptune: { longitudeDeg: 150, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 5, signDegree: 0, houseNumber: 5 },
    pluto: { longitudeDeg: 170, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 5, signDegree: 20, houseNumber: 6 },
  },
  points: {},
  angles: { ascDeg: 15, mcDeg: 285, dscDeg: 195, icDeg: 105, armcDeg: 280, vertexDeg: null },
  houses: Array.from({ length: 12 }, (_unused, i) => ({ number: i + 1, longitudeDeg: (15 + i * 30) % 360 })),
  aspects: [],
  meta: { houseSystem: 'placidus', zodiac: 'tropical', noHouses: false },
};

describe('pages/podelitsya/@slug +data', () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('404 на неизвестный слаг → render(404) (бросает)', async () => {
    global.fetch = vi.fn(async () => new Response('not found', { status: 404 })) as unknown as typeof fetch;
    await expect(data(fakePageContext('unknown'))).rejects.toThrow();
  });

  it('находит снапшот, ogImage выставлен только если PNG готов', async () => {
    global.fetch = vi.fn(async () =>
      new Response(
        JSON.stringify({ slug: 'abc123', kind: 'natal', positions, positionsB: null, theme: 'light', ogImageReady: false }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;
    const result = await data(fakePageContext('abc123'));
    expect(result.seo.ogImage).toBeUndefined();
    expect(result.share.kind).toBe('natal');
  });

  it('ogImageReady=true → ogImage указывает на публичный /api/v1/share/:slug/og.png', async () => {
    global.fetch = vi.fn(async () =>
      new Response(
        JSON.stringify({ slug: 'abc123', kind: 'natal', positions, positionsB: null, theme: 'light', ogImageReady: true }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;
    const result = await data(fakePageContext('abc123'));
    expect(result.seo.ogImage).toMatch(/\/api\/v1\/share\/abc123\/og\.png$/);
  });
});
