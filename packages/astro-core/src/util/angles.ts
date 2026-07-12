/** Общие утилиты работы с углами (градусы), используются во всём ядре. */

/** Приводит угол к диапазону [0,360). */
export function normalizeDegrees(deg: number): number {
  const r = deg % 360;
  return r < 0 ? r + 360 : r;
}

/** Кратчайшая знаковая разность b-a в диапазоне (-180,180]. */
export function shortestDeltaDegrees(a: number, b: number): number {
  let d = normalizeDegrees(b - a);
  if (d > 180) d -= 360;
  return d;
}

/** Абсолютная величина кратчайшей дуги между двумя долготами, [0,180]. */
export function angularSeparationDegrees(a: number, b: number): number {
  return Math.abs(shortestDeltaDegrees(a, b));
}

/** Индекс знака зодиака 0..11 (0=Овен) для тропической/сидерической долготы. */
export function signIndexOf(longitudeDeg: number): number {
  return Math.floor(normalizeDegrees(longitudeDeg) / 30) % 12;
}

/** Градус внутри знака, 0..30. */
export function signDegreeOf(longitudeDeg: number): number {
  return normalizeDegrees(longitudeDeg) % 30;
}

/** Средняя точка двух долгот по КОРОТКОЙ дуге (для композита/Davison). */
export function midpointShortArcDegrees(a: number, b: number): number {
  const na = normalizeDegrees(a);
  const nb = normalizeDegrees(b);
  const diff = shortestDeltaDegrees(na, nb);
  return normalizeDegrees(na + diff / 2);
}

/** Линейная интерполяция по кратчайшей дуге между двумя углами, t в [0,1]. */
export function lerpAngleDegrees(a: number, b: number, t: number): number {
  return normalizeDegrees(a + shortestDeltaDegrees(a, b) * t);
}
