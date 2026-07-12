/**
 * Минимальные типы для npm-пакета `ephemeris` (JS-порт Moshier/DE404, GPL-3.0) — используется
 * ТОЛЬКО как devDependency для кросс-валидации в тестах (см. cross-validation.test.ts), не
 * попадает в собираемый рантайм ядра. У пакета нет собственных .d.ts/@types.
 */
declare module 'ephemeris' {
  export interface EphemerisObservedBody {
    apparentLongitudeDd: number;
    is_retrograde: boolean;
  }

  export interface EphemerisResult {
    date: { julianTerrestrial: number; julianUniversal: number };
    observed: Record<string, EphemerisObservedBody>;
  }

  export function getAllPlanets(
    date: Date,
    geodeticalLongitude: number,
    geodeticalLatitude: number,
    height: number,
  ): EphemerisResult;
}
