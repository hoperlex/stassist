import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({
    NODE_ENV: 'test',
    COOKIE_SECRET: 'x'.repeat(32),
    CORS_ALLOWLIST: 'https://stassist.ru',
  } as NodeJS.ProcessEnv);

describe('POST /api/v1/share', () => {
  it('без БД отвечает 503 (шеринг требует персистентности слага)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/share',
      payload: { kind: 'natal', positions: minimalPositions(), theme: 'light' },
    });
    expect(res.statusCode).toBe(503);
    await app.close();
  });
});

describe('GET /api/v1/share/:slug', () => {
  it('404 на неизвестный слаг', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/share/does-not-exist' });
    expect(res.statusCode).toBe(404);
    await app.close();
  });
});

describe('GET /api/v1/share/:slug/og.png', () => {
  it('404, пока PNG не сгенерирован воркером', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/share/does-not-exist/og.png' });
    expect(res.statusCode).toBe(404);
    await app.close();
  });
});

function pos(longitudeDeg: number) {
  return {
    longitudeDeg,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex: Math.floor(longitudeDeg / 30),
    signDegree: longitudeDeg % 30,
    houseNumber: 1,
  };
}

function minimalPositions() {
  return {
    bodies: {
      sun: pos(10), moon: pos(100), mercury: pos(15), venus: pos(200), mars: pos(280),
      jupiter: pos(340), saturn: pos(60), uranus: pos(130), neptune: pos(150), pluto: pos(170),
    },
    points: {},
    angles: { ascDeg: 0, mcDeg: 0, dscDeg: 0, icDeg: 0, armcDeg: 0, vertexDeg: null },
    houses: [],
    aspects: [],
    meta: { houseSystem: 'placidus', zodiac: 'tropical', noHouses: false },
  };
}
