/**
 * Регимонтан — замкнутая тригонометрия через построение «домовых кругов»: экватор делится на
 * 12 равных дуг по 30° начиная от RAMC; для каждой точки деления строится большой круг через
 * северную/южную точки горизонта и эту точку экватора; пересечение этого круга с эклиптикой —
 * искомый куспид.
 *
 * Реализовано через векторную алгебру поверх проверенных матриц поворота `astronomy-engine`
 * (а не через одну запомненную тригонометрическую формулу — риск перепутать знаки в такой
 * формуле высок, векторное построение легче проверить). ЧИСЛЕННО ПРОВЕРЕНО: при k=0 результат
 * точно совпадает с MC, при k=3 — точно с Asc (см. `houses.test.ts`), что и должно быть по
 * определению метода (при k=0 «домовой круг» вырождается в меридиан, при k=3 — в горизонт).
 * Ветвление знака (какое из двух антиподных пересечений большого круга с эклиптикой брать)
 * численно не требуется: для всех k возвращаемая функцией `SphereFromVector(...).lon` ветвь
 * монотонно возрастает по домам без разрывов (проверено на тестовой карте и property-тестом).
 */
import * as AE from 'astronomy-engine';
import { normalizeDegrees } from '../util/angles.js';
import type { HouseCusps } from './types.js';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function equatorPointEQD(raDeg: number): Vec3 {
  const ra = (raDeg * Math.PI) / 180;
  return { x: Math.cos(ra), y: Math.sin(ra), z: 0 };
}

function horizonPointEQD(azDeg: number, time: AE.AstroTime, observer: AE.Observer): Vec3 {
  const sph = new AE.Spherical(0, azDeg, 1);
  const vecHor = AE.VectorFromHorizon(sph, time, '');
  return AE.RotateVector(AE.Rotation_HOR_EQD(time, observer), vecHor);
}

/** RAMC как аргумент передаётся отдельно (уже посчитан в `time/sidereal-time.ts`). */
export function regiomontanusHouses(
  time: AE.AstroTime,
  observer: AE.Observer,
  ramcDeg: number,
): HouseCusps {
  const nHoriz = horizonPointEQD(0, time, observer);
  const eclPoleEqd = AE.RotateVector(AE.Rotation_ECT_EQD(time), new AE.Vector(0, 0, 1, time));

  const cuspForK = (k: number): number => {
    const eqPt = equatorPointEQD(normalizeDegrees(ramcDeg + 30 * k));
    const n1 = cross(nHoriz, eqPt);
    const dir = cross(n1, { x: eclPoleEqd.x, y: eclPoleEqd.y, z: eclPoleEqd.z });
    const dirEct = AE.RotateVector(AE.Rotation_EQD_ECT(time), new AE.Vector(dir.x, dir.y, dir.z, time));
    return normalizeDegrees(AE.SphereFromVector(dirEct).lon);
  };

  // house(h) <- k = (h - 10) mod 12 (проверено численно: k=0 -> MC(дом10), k=3 -> Asc(дом1)).
  const cusps = new Array<number>(12);
  for (let h = 1; h <= 12; h++) {
    const k = ((h - 10) % 12 + 12) % 12;
    cusps[h - 1] = cuspForK(k);
  }
  return { cusps };
}
