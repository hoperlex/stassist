/**
 * Мелкие детерминированные форматтеры для сериализатора (src/facts/serializer.ts).
 */
import type { HouseCusp } from '@stassist/shared';

/** `signDegree` (0-30, дробный) → «24°04′» (градусы и минуты внутри знака). */
export function degMinStr(signDegree: number): string {
  const totalMinutes = Math.round(signDegree * 60);
  const deg = Math.floor(totalMinutes / 60);
  const min = totalMinutes % 60;
  return `${deg}°${String(min).padStart(2, '0')}′`;
}

/** Орбис в градусах → «3°21′» (для текста аспектов). */
export function orbStr(orbDeg: number): string {
  return degMinStr(Math.abs(orbDeg));
}

/** Долгота (0-360) → номер дома по куспидам (circular, как `houseNumberOf` в astro-core
 *  chart.ts) — нужен, чтобы вычислить дом Южного узла (astro-core его не считает, см. заголовок
 *  serializer.ts). Возвращает null для пустого списка куспидов (time_unknown). */
export function houseNumberOfLongitude(houses: readonly HouseCusp[], lonDeg: number): number | null {
  if (houses.length === 0) return null;
  const sorted = [...houses].sort((a, b) => a.number - b.number);
  const norm = ((lonDeg % 360) + 360) % 360;
  for (let i = 0; i < sorted.length; i++) {
    const cur = sorted[i]!;
    const next = sorted[(i + 1) % sorted.length]!;
    const start = cur.longitudeDeg;
    const end = next.longitudeDeg;
    if (start <= end) {
      if (norm >= start && norm < end) return cur.number;
    } else {
      // Дуга пересекает 0° (напр. куспид 12 дома в конце круга, куспид 1 дома в начале).
      if (norm >= start || norm < end) return cur.number;
    }
  }
  return sorted[0]!.number;
}
