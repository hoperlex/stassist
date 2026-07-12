/**
 * Совместимость по числу жизненного пути (ЧЖП) — числовая оценка 0–100 по симметричной
 * таблице 9×9.
 *
 * ВАЖНО (рабочая эвристика, не сверенный факт): конкретные оценки построены по простой
 * прозрачной формуле — «циклическое расстояние» между базовыми числами 1–9 на круге из 9 позиций
 * (0 = совпадение → 100 баллов, 1 = соседние числа → 85, …, 4 = максимально далёкие → 40).
 * Это ЛОГИКА/эвристика конкретного расчёта, а НЕ выверенный редакцией контент-факт — таблица
 * требует контентной сверки редактором перед использованием в продакшене. См. README.md.
 *
 * Мастер-числа 11 и 22 для целей ЭТОЙ таблицы приводятся к базовым 2 и 4 соответственно
 * (задокументированное правило — см. {@link toCompatibilityBase}).
 */
import type { LifePathCompatibilityResult } from './schemas.js';

/** Приводит ЧЖП к базовому числу 1–9 для лукапа в таблице совместимости (11→2, 22→4). */
export function toCompatibilityBase(lifePathNumber: number): number {
  if (lifePathNumber === 11) return 2;
  if (lifePathNumber === 22) return 4;
  return lifePathNumber;
}

/** Циклическое расстояние между двумя числами 1–9 на круге из 9 позиций (симметрично). */
function circularDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 9;
  return Math.min(diff, 9 - diff);
}

/** Оценка 0–100 по циклическому расстоянию: индекс массива = расстояние 0..4. */
const DISTANCE_SCORE: readonly number[] = [100, 85, 70, 55, 40];

/**
 * Симметричная таблица совместимости 9×9 (строки/столбцы — базовые числа 1–9, индекс 0 = число 1).
 * Построена формулой (не «с потолка» вручную набранными числами), но именно как lookup-таблица,
 * чтобы соответствовать традиционному представлению «таблица совместимости 9×9».
 */
export const LIFE_PATH_COMPATIBILITY_TABLE: readonly (readonly number[])[] = Array.from(
  { length: 9 },
  (_unused, i) =>
    Array.from({ length: 9 }, (_unused2, j) => {
      const distance = circularDistance(i + 1, j + 1);
      return DISTANCE_SCORE[distance] ?? 40;
    }),
);

/**
 * Оценка совместимости пары ЧЖП (0–100). Симметрична по построению:
 * `lifePathCompatibilityScore(a, b) === lifePathCompatibilityScore(b, a)` для любых a, b.
 */
export function lifePathCompatibilityScore(
  lifePathA: number,
  lifePathB: number,
): LifePathCompatibilityResult {
  const baseA = toCompatibilityBase(lifePathA);
  const baseB = toCompatibilityBase(lifePathB);

  if (baseA < 1 || baseA > 9 || baseB < 1 || baseB > 9) {
    throw new Error(
      `lifePathCompatibilityScore: ожидались числа 1-9/11/22, получено (${lifePathA}, ${lifePathB})`,
    );
  }

  const row = LIFE_PATH_COMPATIBILITY_TABLE[baseA - 1];
  const score = row?.[baseB - 1];
  if (score === undefined) {
    throw new Error(`Нет значения совместимости для пары (${lifePathA}, ${lifePathB})`);
  }

  return { baseA, baseB, score };
}
