import { describe, expect, it } from 'vitest';
import type { ChartData, Position } from '@stassist/shared';
import { serializeChartFacts } from './serializer.js';

function pos(overrides: Partial<Position>): Position {
  const signIndex = overrides.signIndex ?? 0;
  const signDegree = overrides.signDegree ?? 0;
  return {
    longitudeDeg: signIndex * 30 + signDegree,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex,
    signDegree,
    houseNumber: null,
    ...overrides,
  };
}

/** Минимальная, но полная (по zod-схеме) карта — вручную, без astro-core (юнит, без сети/БД). */
function buildFixture(overrides: Partial<ChartData> = {}): ChartData {
  const houses = Array.from({ length: 12 }, (_, i) => ({ number: i + 1, longitudeDeg: i * 30 }));
  return {
    kind: 'natal',
    input: {
      dateTime: { year: 1990, month: 6, day: 15, hour: 14, minute: 30, second: 0 },
      timeUnknown: false,
      tzId: 'Europe/Moscow',
      place: { lat: 55.75, lon: 37.62, elevationM: 0 },
      preset: {
        zodiac: 'tropical',
        houseSystem: 'placidus',
        bodies: { trueNode: false, trueLilith: false, selena: true, chiron: true },
        orbs: { byAspect: {}, byBody: {} },
        aspectSet: 'major_minor',
      },
    },
    meta: {
      coreVersion: '1.0.0',
      coordinateFrame: 'geocentric-apparent-ecliptic-of-date',
      zodiac: 'tropical',
      houseSystem: 'placidus',
      houseSystemFallback: false,
      noHouses: false,
      deltaTSeconds: 60,
      julianDayUT: 2448058.1,
      julianDayTT: 2448058.101,
      gmstDeg: 100,
      gastDeg: 100.01,
      accuracyNotes: [],
    },
    bodies: {
      sun: pos({ signIndex: 2, signDegree: 24.07, houseNumber: 9 }),
      moon: pos({ signIndex: 7, signDegree: 12.3, houseNumber: 2 }),
      mercury: pos({ signIndex: 1, signDegree: 5, houseNumber: 8 }),
      venus: pos({ signIndex: 3, signDegree: 18, houseNumber: 10 }),
      mars: pos({ signIndex: 7, signDegree: 2, houseNumber: 2, isRetrograde: true }),
      jupiter: pos({ signIndex: 9, signDegree: 9, houseNumber: 4 }),
      saturn: pos({ signIndex: 9, signDegree: 15, houseNumber: 4 }),
      uranus: pos({ signIndex: 0, signDegree: 3, houseNumber: 7 }),
      neptune: pos({ signIndex: 8, signDegree: 20, houseNumber: 3 }),
      pluto: pos({ signIndex: 6, signDegree: 11, houseNumber: 1 }),
      chiron: pos({ signIndex: 4, signDegree: 6, houseNumber: 11 }),
    },
    points: {
      meanNode: pos({ signIndex: 5, signDegree: 8, houseNumber: 12 }),
      meanLilith: pos({ signIndex: 10, signDegree: 1, houseNumber: 6 }),
      selena: pos({ signIndex: 11, signDegree: 22, houseNumber: 6 }),
    },
    arabicParts: {},
    angles: { ascDeg: 210.5, mcDeg: 120.2, dscDeg: 30.5, icDeg: 300.2, armcDeg: 118, vertexDeg: null },
    houses,
    aspects: [
      {
        bodyA: 'sun',
        bodyB: 'moon',
        angleName: 'square',
        exactAngleDeg: 90,
        actualDeltaDeg: 87.5,
        orbDeg: 2.5,
        orbAllowedDeg: 8,
        applying: true,
      },
      {
        bodyA: 'mars',
        bodyB: 'chiron',
        angleName: 'conjunction',
        exactAngleDeg: 0,
        actualDeltaDeg: -4,
        orbDeg: 4,
        orbAllowedDeg: 3,
        applying: false,
      },
    ],
    ...overrides,
  };
}

describe('serializeChartFacts', () => {
  it('детерминированный текст фактов (снапшот)', () => {
    const { text } = serializeChartFacts(buildFixture());
    expect(text).toMatchSnapshot();
  });

  it('одинаковый вход даёт побайтово одинаковый вывод (детерминизм)', () => {
    const fixture = buildFixture();
    const a = serializeChartFacts(fixture);
    const b = serializeChartFacts(fixture);
    expect(a.text).toBe(b.text);
    expect(a.factKeys).toEqual(b.factKeys);
  });

  it('строит ключи planet_in_sign/planet_in_house для классических планет', () => {
    const { factKeys } = serializeChartFacts(buildFixture());
    expect(factKeys).toContain('planet_in_sign:sun:gemini');
    expect(factKeys).toContain('planet_in_house:sun:9');
    expect(factKeys).toContain('planet_in_sign:mars:scorpio');
  });

  it('строит point_in_sign/point_in_house для узла/Лилит/Селены/Хирона + вычисляет Южный узел', () => {
    const { factKeys, text } = serializeChartFacts(buildFixture());
    expect(factKeys).toContain('point_in_sign:north_node:virgo');
    expect(factKeys).toContain('point_in_sign:south_node:pisces');
    expect(factKeys).toContain('point_in_sign:lilith:aquarius');
    expect(factKeys).toContain('point_in_sign:selena:pisces');
    expect(factKeys).toContain('point_in_sign:chiron:leo');
    expect(text).toContain('Южный узел');
  });

  it('строит asc_in_sign по Асценденту', () => {
    const { factKeys } = serializeChartFacts(buildFixture());
    expect(factKeys).toContain('asc_in_sign:scorpio');
  });

  it('строит канонический ключ аспекта независимо от порядка bodyA/bodyB', () => {
    const { factKeys } = serializeChartFacts(buildFixture());
    expect(factKeys).toContain('aspect:sun:square:moon');
    expect(factKeys).toContain('aspect:mars:conjunction:chiron');
  });

  it('находит эссенциальное достоинство (Марс в Скорпионе — обитель)', () => {
    const { text } = serializeChartFacts(buildFixture());
    expect(text).toContain('в своей обители');
  });

  it('time_unknown: не упоминает Асцендент/дома, не строит asc_in_sign', () => {
    const fixture = buildFixture({
      meta: {
        coreVersion: '1.0.0',
        coordinateFrame: 'geocentric-apparent-ecliptic-of-date',
        zodiac: 'tropical',
        houseSystem: 'placidus',
        houseSystemFallback: false,
        noHouses: true,
        deltaTSeconds: 60,
        julianDayUT: 2448058.1,
        julianDayTT: 2448058.101,
        gmstDeg: 100,
        gastDeg: 100.01,
        accuracyNotes: [],
      },
      houses: [],
    });
    // Реалистичная симуляция astro-core при noHouses=true: houseNumber null у ВСЕХ объектов
    // (см. заголовок serializer.ts / находку про time_unknown в _work/build/findings/f4.md).
    for (const body of Object.values(fixture.bodies)) if (body) body.houseNumber = null;
    for (const point of Object.values(fixture.points)) if (point) point.houseNumber = null;
    const { text, factKeys } = serializeChartFacts(fixture);
    expect(text).toContain('Время рождения неизвестно');
    expect(factKeys.some((k) => k.startsWith('asc_in_sign:'))).toBe(false);
    expect(factKeys.some((k) => k.startsWith('planet_in_house:'))).toBe(false);
  });

  it('находит стеллиум при концентрации 3+ объектов в одном доме', () => {
    const fixture = buildFixture();
    fixture.bodies.moon = pos({ signIndex: 7, signDegree: 12, houseNumber: 2 });
    fixture.bodies.mars = pos({ signIndex: 7, signDegree: 2, houseNumber: 2 });
    fixture.bodies.mercury = pos({ signIndex: 1, signDegree: 5, houseNumber: 2 });
    const { text } = serializeChartFacts(fixture);
    expect(text).toMatch(/Стеллиумы/);
    expect(text).toMatch(/в доме 2/);
  });
});
