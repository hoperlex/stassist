/**
 * Тестовая фикстура `ChartData` (только для юнит-тестов пакета — БЕЗ обращения к astro-core,
 * см. §1 конвенций реализации: test:unit без сети/БД). НЕ путать с packages/astro-core/fixtures/
 * golden — та golden-фикстура эталонная для расчётного ядра, эта — просто валидная форма данных.
 */
import type { ChartData, Position } from '@stassist/shared';

export function pos(overrides: Partial<Position> = {}): Position {
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

export function buildTestChartData(overrides: Partial<ChartData> = {}): ChartData {
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
    ],
    ...overrides,
  };
}
