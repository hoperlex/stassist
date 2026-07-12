/**
 * `computeChart` — единственная точка входа расчёта натальной (и однотипных) карт: чистая
 * функция без I/O. Собирает время → позиции → дома → аспекты → арабские части в `ChartData`
 * (zod-схема из `packages/shared` — единый источник правды, см. docs/architecture/21 §3.2).
 */
import {
  chartInputSchema,
  chartDataSchema,
  type ChartInput,
  type ChartData,
  type Position,
  type Bodies,
  type Points,
} from '@stassist/shared';
import { localWallTimeToUtc } from './time/timezone.js';
import { resolveTime } from './time/julian-day.js';
import { gastDegrees, gmstDegrees } from './time/sidereal-time.js';
import { sunApparentPosition } from './ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition, PLANET_BODIES } from './ephemeris/planets.js';
import {
  meanNodeLongitudeDeg,
  trueNodeLongitudeDeg,
  meanLilithLongitudeDeg,
  selenaLongitudeDeg,
} from './ephemeris/nodes-lilith.js';
import { chironPosition, ChironOutOfRangeError } from './ephemeris/chiron.js';
import { computeHouses } from './houses/index.js';
import { detectAspects, type AspectableBody } from './aspects/index.js';
import { fortunaLongitudeDeg } from './arabic-parts/fortuna.js';
import { signIndexOf, signDegreeOf, normalizeDegrees } from './util/angles.js';
import { ASTRO_CORE_VERSION } from './version.js';

function toPosition(
  longitudeDeg: number,
  latitudeDeg: number,
  distanceAu: number | null,
  speedLongDegPerDay: number,
  houseOfLongitude: ((lon: number) => number | null) | null,
): Position {
  const lon = normalizeDegrees(longitudeDeg);
  return {
    longitudeDeg: lon,
    latitudeDeg,
    distanceAu,
    speedLongDegPerDay,
    isRetrograde: speedLongDegPerDay < 0,
    signIndex: signIndexOf(lon),
    signDegree: signDegreeOf(lon),
    houseNumber: houseOfLongitude ? houseOfLongitude(lon) : null,
  };
}

/** Номер дома (1..12) для эклиптической долготы по массиву 12 куспидов (возрастающих по кругу). */
function houseNumberOf(cusps: readonly number[], lonDeg: number): number {
  const lon = normalizeDegrees(lonDeg);
  for (let i = 0; i < 12; i++) {
    const start = cusps[i]!;
    const end = cusps[(i + 1) % 12]!;
    const span = normalizeDegrees(end - start) || 360;
    const rel = normalizeDegrees(lon - start);
    if (rel < span) return i + 1;
  }
  // Численный краевой случай (rel === span на каждом куспиде из-за погрешности) — последний дом.
  return 12;
}

export function computeChart(rawInput: ChartInput): ChartData {
  const input = chartInputSchema.parse(rawInput);
  const accuracyNotes: string[] = [];

  const effectiveDateTime = input.timeUnknown
    ? { ...input.dateTime, hour: 12, minute: 0, second: 0 }
    : input.dateTime;
  if (input.timeUnknown) {
    accuracyNotes.push(
      'Время рождения неизвестно: расчёт выполнен на полдень локального времени; дома и углы не считаются (noHouses=true).',
    );
  }

  const utc = localWallTimeToUtc(effectiveDateTime, input.tzId);
  const { jdUT, jdTT, deltaTSeconds, astroTime } = resolveTime(utc);

  // --- дома/углы (пропускаем при timeUnknown) ---
  const noHouses = input.timeUnknown;
  const housesResult = noHouses
    ? null
    : computeHouses({
        time: astroTime,
        jdUT,
        jdTT,
        latDeg: input.place.lat,
        lonDeg: input.place.lon,
        system: input.preset.houseSystem,
      });

  const houseOf = housesResult ? (lon: number): number => houseNumberOf(housesResult.cusps, lon) : null;

  // --- тела ---
  const sun = sunApparentPosition(astroTime);
  const moon = bodyGeocentricPosition('moon', astroTime);

  const bodies: Bodies = {
    sun: toPosition(sun.longitudeDeg, sun.latitudeDeg, sun.distanceAu, sun.speedLongDegPerDay, houseOf),
    moon: toPosition(moon.longitudeDeg, moon.latitudeDeg, moon.distanceAu, moon.speedLongDegPerDay, houseOf),
  } as Bodies;

  for (const p of PLANET_BODIES) {
    const pos = bodyGeocentricPosition(p, astroTime);
    (bodies as Record<string, Position>)[p] = toPosition(
      pos.longitudeDeg,
      pos.latitudeDeg,
      pos.distanceAu,
      pos.speedLongDegPerDay,
      houseOf,
    );
  }

  if (input.preset.bodies.chiron) {
    try {
      const ch = chironPosition(jdTT);
      bodies.chiron = toPosition(ch.longitudeDeg, ch.latitudeDeg, null, ch.speedLongDegPerDay, houseOf);
    } catch (err) {
      if (err instanceof ChironOutOfRangeError) {
        accuracyNotes.push(`Хирон не рассчитан: ${err.message}`);
      } else {
        throw err;
      }
    }
  }

  // --- точки ---
  const points: Points = {};
  if (input.preset.bodies.trueNode) {
    const lon = trueNodeLongitudeDeg(astroTime);
    points.trueNode = toPosition(lon, 0, null, 0, houseOf);
  } else {
    const lon = meanNodeLongitudeDeg(astroTime);
    points.meanNode = toPosition(lon, 0, null, 0, houseOf);
  }
  if (input.preset.bodies.trueLilith) {
    accuracyNotes.push(
      'Истинная (оскулирующая) Лилит запрошена, но не реализована в этой версии ядра (версия 2+) — использована средняя Лилит.',
    );
  }
  {
    const lon = meanLilithLongitudeDeg(astroTime);
    points.meanLilith = toPosition(lon, 0, null, 0, houseOf);
  }
  if (input.preset.bodies.selena) {
    const lon = selenaLongitudeDeg(astroTime);
    points.selena = toPosition(lon, 0, null, 0, houseOf);
  }

  // --- аспекты ---
  const aspectableBodies: AspectableBody[] = [
    ...Object.entries(bodies).map(([key, pos]) => ({
      key,
      longitudeDeg: pos.longitudeDeg,
      speedLongDegPerDay: pos.speedLongDegPerDay,
    })),
    ...Object.entries(points).map(([key, pos]) => ({
      key,
      longitudeDeg: (pos as Position).longitudeDeg,
      speedLongDegPerDay: (pos as Position).speedLongDegPerDay,
    })),
  ];
  const aspects = detectAspects(aspectableBodies, {
    aspectSet: input.preset.aspectSet,
    orbs: input.preset.orbs,
  });

  // --- арабские части (Фортуна) ---
  const arabicParts: ChartData['arabicParts'] = {};
  if (housesResult) {
    const fortuna = fortunaLongitudeDeg(housesResult.ascDeg, sun.longitudeDeg, moon.longitudeDeg);
    arabicParts.fortuna = {
      longitudeDeg: fortuna.longitudeDeg,
      signIndex: signIndexOf(fortuna.longitudeDeg),
      signDegree: signDegreeOf(fortuna.longitudeDeg),
      houseNumber: houseOf ? houseOf(fortuna.longitudeDeg) : null,
      formula: fortuna.formula,
    };
  }

  const angles = housesResult
    ? {
        ascDeg: housesResult.ascDeg,
        mcDeg: housesResult.mcDeg,
        dscDeg: housesResult.dscDeg,
        icDeg: housesResult.icDeg,
        armcDeg: housesResult.armcDeg,
        vertexDeg: null,
      }
    : { ascDeg: 0, mcDeg: 0, dscDeg: 0, icDeg: 0, armcDeg: 0, vertexDeg: null };

  const houses = housesResult
    ? housesResult.cusps.map((lon, i) => ({ number: i + 1, longitudeDeg: lon }))
    : [];

  if (housesResult?.fallbackApplied) {
    accuracyNotes.push(
      `Система домов ${input.preset.houseSystem} недоступна на широте ${input.place.lat.toFixed(2)}° (>66.5°) — применён фоллбэк на Порфирия.`,
    );
  }

  const gmstDeg = gmstDegrees(jdUT, jdTT);
  const gastDeg = gastDegrees(astroTime, jdUT, jdTT);

  const chartData: ChartData = {
    kind: 'natal',
    input,
    meta: {
      coreVersion: ASTRO_CORE_VERSION,
      coordinateFrame: 'geocentric-apparent-ecliptic-of-date',
      zodiac: input.preset.zodiac,
      ayanamsha: input.preset.ayanamsha,
      houseSystem: housesResult?.usedSystem ?? input.preset.houseSystem,
      houseSystemFallback: housesResult?.fallbackApplied ?? false,
      noHouses,
      deltaTSeconds,
      julianDayUT: jdUT,
      julianDayTT: jdTT,
      gmstDeg,
      gastDeg,
      accuracyNotes,
    },
    bodies,
    points,
    arabicParts,
    angles,
    houses,
    aspects,
  };

  return chartDataSchema.parse(chartData);
}
