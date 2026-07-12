/** Общие утилиты построения SVG-строк (без React) — переиспользуются ChartWheel/MatrixOctagram,
 *  чтобы один и тот же вывод годился и для SSR/клиента (через dangerouslySetInnerHTML), и для
 *  resvg в воркере (см. docs/architecture/21-техническая-архитектура.md §6). */

/** Экранирование текста для вставки в SVG/XML (атрибуты и текстовые узлы). */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Нормализует градусы в диапазон [0, 360). */
export function normalizeDeg(deg: number): number {
  const n = deg % 360;
  return n < 0 ? n + 360 : n;
}

export interface Point {
  x: number;
  y: number;
}

/** Точка на окружности: угол в «экранных» градусах (0=вправо, увеличение — против часовой стрелки). */
export function polarToXY(cx: number, cy: number, radius: number, screenAngleDeg: number): Point {
  const rad = (screenAngleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
}

/**
 * Астрологическая долгота → «экранный» угол при заданном Асценденте: Асцендент кладётся слева
 * (9 часов, 180° в экранной системе), знаки/дома растут ПРОТИВ часовой стрелки — стандартная
 * визуальная конвенция западной астрологии.
 */
export function longitudeToScreenAngleDeg(longitudeDeg: number, ascDeg: number): number {
  return normalizeDeg(180 + (longitudeDeg - ascDeg));
}
