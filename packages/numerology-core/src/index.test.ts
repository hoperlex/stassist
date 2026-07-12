import { describe, expect, it } from 'vitest';
import {
  NUMEROLOGY_CORE_VERSION,
  lifePathNumber,
  nameNumbers,
  psychoMatrix,
  matrixOfDestiny,
} from './index.js';

describe('@stassist/numerology-core — точка входа', () => {
  it('экспортирует версию пакета', () => {
    expect(NUMEROLOGY_CORE_VERSION).toBe('1.0.0');
  });

  it('реэкспортирует публичные функции всех под-модулей', () => {
    expect(typeof lifePathNumber).toBe('function');
    expect(typeof nameNumbers).toBe('function');
    expect(typeof psychoMatrix).toBe('function');
    expect(typeof matrixOfDestiny).toBe('function');
  });
});
