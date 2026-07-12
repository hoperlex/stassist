import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({
    NODE_ENV: 'test',
    COOKIE_SECRET: 'x'.repeat(32),
    CORS_ALLOWLIST: 'https://stassist.ru',
  } as NodeJS.ProcessEnv);

const chartInput = (year: number) => ({
  dateTime: { year, month: 6, day: 15, hour: 14, minute: 30, second: 0 },
  timeUnknown: false,
  tzId: 'Europe/Moscow',
  place: { lat: 55.7558, lon: 37.6173, elevationM: 0 },
});

describe('POST /api/v1/calc/natal', () => {
  it('считает натальную карту анонимно, без БД', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'POST', url: '/api/v1/calc/natal', payload: chartInput(1990) });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.bodies.sun.longitudeDeg).toBeGreaterThanOrEqual(0);
    expect(body.meta.noHouses).toBe(false);
    await app.close();
  });

  it('«время неизвестно» → дома не считаются (noHouses=true)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/calc/natal',
      payload: { ...chartInput(1990), timeUnknown: true },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().meta.noHouses).toBe(true);
    await app.close();
  });

  it('отвергает некорректный вход (месяц вне диапазона)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/calc/natal',
      payload: { ...chartInput(1990), dateTime: { ...chartInput(1990).dateTime, month: 13 } },
    });
    expect(res.statusCode).toBe(400);
    await app.close();
  });

  it('не пишет тело запроса (дату рождения) в логи (pino req-сериализатор без body)', async () => {
    const { Writable } = await import('node:stream');
    class CaptureStream extends Writable {
      lines: string[] = [];
      override _write(chunk: Buffer, _enc: string, cb: () => void): void {
        this.lines.push(chunk.toString('utf8'));
        cb();
      }
      text(): string {
        return this.lines.join('');
      }
    }
    const stream = new CaptureStream();
    const app = await buildApp({ config: testConfig(), logStream: stream, logLevel: 'info' });
    await app.inject({ method: 'POST', url: '/api/v1/calc/natal', payload: chartInput(1975) });
    await app.close();
    expect(stream.text()).not.toContain('1975');
  });
});

describe('POST /api/v1/calc/synastry', () => {
  it('считает совместимость двух карт и межкартовые аспекты', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/calc/synastry',
      payload: { a: chartInput(1990), b: chartInput(1992) },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.a.bodies.sun).toBeDefined();
    expect(body.b.bodies.sun).toBeDefined();
    expect(Array.isArray(body.crossAspects)).toBe(true);
    for (const aspect of body.crossAspects) {
      expect(aspect.bodyA.startsWith('a:') || aspect.bodyA.startsWith('b:')).toBe(true);
    }
    await app.close();
  });
});

describe('POST /api/v1/calc/numerology/life-path', () => {
  it('считает число жизненного пути', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/calc/numerology/life-path',
      payload: { day: 29, month: 2, year: 2000 },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().lifePathNumber).toBe(6);
    await app.close();
  });

  it('отвергает несуществующую календарную дату', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/calc/numerology/life-path',
      payload: { day: 31, month: 4, year: 2000 },
    });
    expect(res.statusCode).toBe(400);
    await app.close();
  });
});

describe('POST /api/v1/calc/numerology/psycho-matrix', () => {
  it('считает квадрат Пифагора (психоматрицу)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/calc/numerology/psycho-matrix',
      payload: { day: 15, month: 6, year: 1990 },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.grid).toHaveLength(3);
    await app.close();
  });
});

describe('POST /api/v1/calc/numerology/matrix-of-destiny', () => {
  it('считает октаграмму матрицы судьбы (только числа, без трактовок)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/calc/numerology/matrix-of-destiny',
      payload: { day: 15, month: 6, year: 1990 },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.corePointsMethodologyVerified).toBe(true);
    expect(body.corePoints.day).toBeGreaterThanOrEqual(1);
    await app.close();
  });
});
