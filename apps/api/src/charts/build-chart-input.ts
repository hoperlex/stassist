/**
 * Маппинг «профиль рождения (расшифрованный) + calc_preset» → `ChartInput` для
 * `computeChart` (@stassist/astro-core). ЧИСТАЯ функция — без I/O, покрывается unit-тестом
 * без БД (findings f2.md [integration-contract]: контракт astro-core должен быть явным).
 * `timeUnknown` → `ChartInput.timeUnknown` (ядро само переключается на полдень/noHouses=true,
 * см. packages/astro-core/src/chart.ts).
 */
import type { CalcPreset, ChartInput } from '@stassist/shared';

export interface ChartInputSourceProfile {
  birthDate: string; // 'YYYY-MM-DD'
  birthTime: string | null; // 'HH:mm' | 'HH:mm:ss' | null
  timeUnknown: boolean;
  lat: number;
  lon: number;
  tzId: string;
}

export class InvalidBirthDateTimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidBirthDateTimeError';
  }
}

function parseDateParts(birthDate: string): { year: number; month: number; day: number } {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!match) throw new InvalidBirthDateTimeError(`birthDate "${birthDate}" не в формате YYYY-MM-DD`);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    throw new InvalidBirthDateTimeError(`birthDate "${birthDate}": месяц/день вне допустимого диапазона`);
  }
  return { year: Number(match[1]), month, day };
}

function parseTimeParts(birthTime: string): { hour: number; minute: number; second: number } {
  const match = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(birthTime);
  if (!match) throw new InvalidBirthDateTimeError(`birthTime "${birthTime}" не в формате HH:mm[:ss]`);
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3] ?? '0');
  if (hour > 23 || minute > 59 || second > 59) {
    throw new InvalidBirthDateTimeError(`birthTime "${birthTime}": значение вне допустимого диапазона`);
  }
  return { hour, minute, second };
}

export function buildChartInput(profile: ChartInputSourceProfile, preset: CalcPreset): ChartInput {
  const dateParts = parseDateParts(profile.birthDate);
  const timeParts =
    !profile.timeUnknown && profile.birthTime
      ? parseTimeParts(profile.birthTime)
      : { hour: 12, minute: 0, second: 0 };

  return {
    dateTime: { ...dateParts, ...timeParts },
    timeUnknown: profile.timeUnknown,
    tzId: profile.tzId,
    place: { lat: profile.lat, lon: profile.lon, elevationM: 0 },
    preset,
  };
}
