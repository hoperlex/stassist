import { describe, expect, it } from 'vitest';
import { fortunaLongitudeDeg, isDaySect } from './fortuna.js';

describe('arabic-parts/fortuna', () => {
  it('дневная карта (Солнце над горизонтом, дуга Dsc→Asc): формула Asc+Луна−Солнце', () => {
    // Asc=0, Солнце=270 (в дуге 180..360 от Asc — над горизонтом → день).
    expect(isDaySect(270, 0)).toBe(true);
    const r = fortunaLongitudeDeg(0, 270, 90);
    expect(r.formula).toBe('day');
    expect(r.longitudeDeg).toBeCloseTo((0 + 90 - 270 + 360) % 360, 9);
  });

  it('ночная карта (Солнце под горизонтом, дуга Asc→Dsc): формула Asc+Солнце−Луна', () => {
    // Asc=0, Солнце=90 (в дуге 0..180 от Asc — под горизонтом → ночь).
    expect(isDaySect(90, 0)).toBe(false);
    const r = fortunaLongitudeDeg(0, 90, 200);
    expect(r.formula).toBe('night');
    expect(r.longitudeDeg).toBeCloseTo((0 + 90 - 200 + 360) % 360, 9);
  });

  it('граница ровно на Asc/Dsc — не выбрасывает исключение, детерминирована', () => {
    expect(() => fortunaLongitudeDeg(0, 180, 45)).not.toThrow();
    expect(() => fortunaLongitudeDeg(0, 0, 45)).not.toThrow();
  });
});
