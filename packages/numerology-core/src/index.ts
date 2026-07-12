/**
 * packages/numerology-core — матрица судьбы, психоматрица, числа: детерминированные функции
 * без I/O (см. docs/roadmap/prompts/f6-нумерология-и-камни.md).
 *
 * Единая точка входа — реэкспортирует все публичные функции/типы/схемы под-модулей.
 * Подробности методики, спорные решения (таблица букв, редукции, статус `methodologyVerified`)
 * см. в README.md пакета.
 */
export const NUMEROLOGY_CORE_VERSION = '1.0.0';

export * from './constants.js';
export * from './date-utils.js';
export * from './digit-utils.js';
export * from './text-utils.js';
export * from './schemas.js';
export * from './core-numbers.js';
export * from './psycho-matrix.js';
export * from './personal-cycles.js';
export * from './compatibility.js';
export * from './matrix-of-destiny.js';
