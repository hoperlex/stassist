/**
 * Таксономия нумерологического корпуса (`tradition='numerology'`, ключи `numerology:*`, см.
 * docs/roadmap/31-конвенции-реализации.md §6). `@stassist/numerology-core` намеренно не содержит
 * текстовых слагов (см. JSDoc пакета) — соответствие цифра→название ячейки психоматрицы взято из
 * общепринятой (классической) методики квадрата Пифагора, зафиксированной в
 * `docs/research/06-нумерология-и-минералы.md:14` («характер, энергия, интерес, здоровье,
 * логика, труд, удача, долг, память» — порядок 1..9), а НЕ придумано произвольно.
 */
import { numerologyKey } from './keys.js';

/** Число пути/выражения/души/личности — диапазон numerology-core: 1-9, 11, 22 (мастер-числа). */
export const NUMEROLOGY_CORE_NUMBER_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22] as const;
export const NUMEROLOGY_CORE_NUMBER_CATEGORIES = ['life_path', 'expression', 'soul', 'personality'] as const;
export type NumerologyCoreNumberCategory = (typeof NUMEROLOGY_CORE_NUMBER_CATEGORIES)[number];

/** Персональный год/месяц/день — numerology-core: всегда 1-9 (без мастер-чисел). */
export const NUMEROLOGY_CYCLE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const NUMEROLOGY_CYCLE_CATEGORIES = ['personal_year', 'personal_month', 'personal_day'] as const;
export type NumerologyCycleCategory = (typeof NUMEROLOGY_CYCLE_CATEGORIES)[number];

/** 9 ячеек психоматрицы Пифагора, digit 1..9 → канонический слаг (см. заголовок файла). */
export const PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT: Readonly<Record<number, string>> = {
  1: 'character',
  2: 'energy',
  3: 'interest',
  4: 'health',
  5: 'logic',
  6: 'labor',
  7: 'luck',
  8: 'duty',
  9: 'memory',
};

/** Строки/столбцы/диагонали психоматрицы (8: 3+3+2) — см. `psychoMatrixResultSchema`
 *  (rowSums/colSums/diagonalMain/diagonalAnti в packages/numerology-core/src/schemas.ts). */
export const PSYCHOMATRIX_LINE_SLUGS = [
  'row_1', 'row_2', 'row_3', 'col_1', 'col_2', 'col_3', 'diag_main', 'diag_anti',
] as const;

export function numerologyCoreNumberKey(category: NumerologyCoreNumberCategory, value: number): string {
  return numerologyKey(category, value);
}
export function numerologyCycleKey(category: NumerologyCycleCategory, value: number): string {
  return numerologyKey(category, value);
}
export function numerologyMatrixCellKey(slug: string): string {
  return numerologyKey('matrix_cell', slug);
}
export function numerologyMatrixLineKey(slug: string): string {
  return numerologyKey('matrix_line', slug);
}
