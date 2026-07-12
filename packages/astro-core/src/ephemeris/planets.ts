/**
 * Позиции Меркурий–Плутон и Луна через `astronomy-engine` (MIT), приведённые к ЕДИНОЙ системе
 * координат ядра — видимая геоцентрическая эклиптическая долгота/широта ЭПОХИ ДАТЫ.
 *
 * Проверенный пайплайн (см. docs/roadmap/31-конвенции-реализации.md §7, критично!):
 *   `GeoVector(body, time, aberration=true)` — геоцентрический вектор J2000 (EQJ), с учётом
 *   светового времени и аберрации (astronomy-engine делает это сама);
 *   `Ecliptic(vec)` — переводит EQJ-вектор в **истинную эклиптику ДАТЫ** (precession + nutation
 *   встроены в саму функцию astronomy-engine, комментарий к `Ecliptic()` явно говорит "true
 *   ecliptic of date").
 * Кросс-проверено вручную против JPL Horizons (QUANTITIES=31, ObsEcLon/ObsEcLat = апарентная
 * геоцентрическая эклиптическая долгота/широта эпохи даты) — расхождение единицы угловых секунд
 * (Марс/Луна на 2000-01-01), см. `ACCURACY.md`. Это ЖЕ пространство координат, что и у нашего
 * модуля Солнца VSOP87 (`sun-vsop87.ts`) — согласованность гарантирована.
 */
import * as AE from 'astronomy-engine';
import { shortestDeltaDegrees } from '../util/angles.js';

export const PLANET_BODIES = [
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
] as const;
export type PlanetBody = (typeof PLANET_BODIES)[number];

const BODY_MAP: Record<PlanetBody | 'moon', AE.Body> = {
  mercury: AE.Body.Mercury,
  venus: AE.Body.Venus,
  mars: AE.Body.Mars,
  jupiter: AE.Body.Jupiter,
  saturn: AE.Body.Saturn,
  uranus: AE.Body.Uranus,
  neptune: AE.Body.Neptune,
  pluto: AE.Body.Pluto,
  moon: AE.Body.Moon,
};

export interface BodyGeocentricPosition {
  longitudeDeg: number;
  latitudeDeg: number;
  distanceAu: number;
  speedLongDegPerDay: number;
}

function eclipticOfDateDeg(body: AE.Body, time: AE.AstroTime): { lon: number; lat: number; dist: number } {
  const vec = AE.GeoVector(body, time, true);
  const ecl = AE.Ecliptic(vec);
  const dist = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  return { lon: ecl.elon, lat: ecl.elat, dist };
}

/**
 * Позиция тела (Меркурий..Плутон либо Луна) в момент `time`. Скорость по долготе — числовая
 * производная (центральная разность), достаточная для определения ретроградности и для орбисов
 * аппликации/сепарации (не для тайминга событий высокой точности — там root-finding работает
 * напрямую от знака разности долгот, без явной зависимости от скорости).
 */
export function bodyGeocentricPosition(body: PlanetBody | 'moon', time: AE.AstroTime): BodyGeocentricPosition {
  const aeBody = BODY_MAP[body];
  const { lon, lat, dist } = eclipticOfDateDeg(aeBody, time);

  // Луна движется быстро (~13°/сутки) — берём меньший шаг дифференцирования, чем для планет.
  const dt = body === 'moon' ? 0.005 : 0.02;
  const lon1 = eclipticOfDateDeg(aeBody, time.AddDays(-dt)).lon;
  const lon2 = eclipticOfDateDeg(aeBody, time.AddDays(dt)).lon;
  const speedLongDegPerDay = shortestDeltaDegrees(lon1, lon2) / (2 * dt);

  return { longitudeDeg: lon, latitudeDeg: lat, distanceAu: dist, speedLongDegPerDay };
}
