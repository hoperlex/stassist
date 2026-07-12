/**
 * Психоматрица (квадрат Пифагора) — 4 дополнительных числа + сетка 3×3 частот цифр 1–9.
 * См. docs/research/06-нумерология-и-минералы.md §1 и JSDoc ниже за пошаговым алгоритмом.
 */
import { sumDigits } from './digit-utils.js';
import type { NumerologyBirthData, PsychoMatrixResult } from './schemas.js';

/** Первая цифра дня рождения — для двузначного дня это цифра десятков, для однозначного — 0. */
function firstDigitOfDay(day: number): number {
  return Math.floor(day / 10);
}

/** Считает вхождения цифр 1–9 (0 НЕ учитывается — стандартное правило метода) в массиве цифр. */
function countDigitOccurrences(digits: readonly number[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (let d = 1; d <= 9; d += 1) counts[String(d)] = 0;
  for (const digit of digits) {
    if (digit === 0) continue;
    const key = String(digit);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

/** Разбивает целое неотрицательное число на массив его цифр (порядок не важен для подсчёта). */
function digitsOf(n: number): number[] {
  return String(Math.abs(Math.trunc(n)))
    .split('')
    .map(Number);
}

/**
 * Психоматрица по дате ДД.ММ.ГГГГ. Алгоритм (см. docs/research/06-нумерология-и-минералы.md §1):
 *  1. (1) = сумма всех цифр даты (день + месяц + год, как строка цифр).
 *  2. (2) = сумма цифр числа (1) — ОДИН проход суммирования (не редукция до одной цифры).
 *  3. (3) = (1) минус удвоенная первая цифра дня рождения.
 *  4. (4) = сумма цифр числа (3) — один проход.
 *
 * Мультимножество цифр для сетки = все цифры даты (8 цифр: ДД ММ ГГГГ) + все цифры чисел
 * (1)–(4) (каждое число даёт 1 или 2 цифры), НОЛИ ИЗ ПОДСЧЁТА ИСКЛЮЧАЮТСЯ (стандартное правило
 * метода — ноль не занимает отдельную позицию в сетке).
 *
 * Раскладка сетки 3×3 — традиционный квадрат Пифагора, читается по столбцам сверху вниз:
 * характер(1,2,3) / энергия(4,5,6) / интерес(7,8,9) → grid[row][col], row0=[c1,c4,c7],
 * row1=[c2,c5,c8], row2=[c3,c6,c9]. Возвращаются только СЧЁТЧИКИ и суммы (детерминированная
 * арифметика) — текстовые трактовки ячеек (характер/энергия/…) в этот модуль намеренно
 * не включены (это уровень контента/LLM, не деterминированного ядра).
 */
export function psychoMatrix(
  birthDate: Pick<NumerologyBirthData, 'day' | 'month' | 'year'>,
): PsychoMatrixResult {
  // Цифры даты собираются из строк, дополненных нулём слева (день/месяц — 2 знака, год — 4),
  // а НЕ через digitsOf(число) — иначе терялся бы ведущий 0 (digitsOf(5) даёт [5], не [0,5]).
  const dayStr = String(birthDate.day).padStart(2, '0');
  const monthStr = String(birthDate.month).padStart(2, '0');
  const yearStr = String(birthDate.year).padStart(4, '0');
  const dateDigits = [...(dayStr + monthStr + yearStr)].map(Number);

  const number1 = dateDigits.reduce((acc, d) => acc + d, 0);
  const number2 = sumDigits(number1);
  const number3 = number1 - 2 * firstDigitOfDay(birthDate.day);
  const number4 = sumDigits(number3);

  const allDigits = [
    ...dateDigits,
    ...digitsOf(number1),
    ...digitsOf(number2),
    ...digitsOf(number3),
    ...digitsOf(number4),
  ];
  const counts = countDigitOccurrences(allDigits);

  const c = (digit: number): number => counts[String(digit)] ?? 0;
  const grid: [[number, number, number], [number, number, number], [number, number, number]] = [
    [c(1), c(4), c(7)],
    [c(2), c(5), c(8)],
    [c(3), c(6), c(9)],
  ];
  const rowSums: [number, number, number] = [
    grid[0][0] + grid[0][1] + grid[0][2],
    grid[1][0] + grid[1][1] + grid[1][2],
    grid[2][0] + grid[2][1] + grid[2][2],
  ];
  const colSums: [number, number, number] = [
    grid[0][0] + grid[1][0] + grid[2][0],
    grid[0][1] + grid[1][1] + grid[2][1],
    grid[0][2] + grid[1][2] + grid[2][2],
  ];
  const diagonalMain = grid[0][0] + grid[1][1] + grid[2][2];
  const diagonalAnti = grid[0][2] + grid[1][1] + grid[2][0];

  return { number1, number2, number3, number4, counts, grid, rowSums, colSums, diagonalMain, diagonalAnti };
}
