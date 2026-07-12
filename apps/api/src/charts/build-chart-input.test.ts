import { describe, expect, it } from 'vitest';
import type { CalcPreset } from '@stassist/shared';
import { buildChartInput, InvalidBirthDateTimeError } from './build-chart-input.js';

const PRESET: CalcPreset = {
  zodiac: 'tropical',
  houseSystem: 'placidus',
  bodies: { trueNode: false, trueLilith: false, selena: true, chiron: true },
  orbs: { byAspect: {}, byBody: {} },
  aspectSet: 'major_minor',
};

describe('buildChartInput', () => {
  it('переносит известную дату/время/место 1:1 в ChartInput', () => {
    const input = buildChartInput(
      { birthDate: '1990-05-17', birthTime: '14:30', timeUnknown: false, lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
      PRESET,
    );
    expect(input.dateTime).toMatchObject({ year: 1990, month: 5, day: 17, hour: 14, minute: 30, second: 0 });
    expect(input.timeUnknown).toBe(false);
    expect(input.tzId).toBe('Europe/Moscow');
    expect(input.place).toMatchObject({ lat: 55.7558, lon: 37.6173 });
    expect(input.preset).toBe(PRESET);
  });

  it('поддерживает секунды в birthTime', () => {
    const input = buildChartInput(
      { birthDate: '2000-01-01', birthTime: '08:15:42', timeUnknown: false, lat: 0, lon: 0, tzId: 'UTC' },
      PRESET,
    );
    expect(input.dateTime.second).toBe(42);
  });

  it('timeUnknown=true → полдень 12:00:00, даже если birthTime как-то передан', () => {
    const input = buildChartInput(
      { birthDate: '1990-05-17', birthTime: null, timeUnknown: true, lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
      PRESET,
    );
    expect(input.dateTime).toMatchObject({ hour: 12, minute: 0, second: 0 });
    expect(input.timeUnknown).toBe(true);
  });

  it('бросает InvalidBirthDateTimeError на некорректный формат даты', () => {
    expect(() =>
      buildChartInput(
        { birthDate: '17.05.1990', birthTime: '12:00', timeUnknown: false, lat: 0, lon: 0, tzId: 'UTC' },
        PRESET,
      ),
    ).toThrow(InvalidBirthDateTimeError);
  });

  it('бросает InvalidBirthDateTimeError на некорректный формат времени', () => {
    expect(() =>
      buildChartInput(
        { birthDate: '1990-05-17', birthTime: '25:99', timeUnknown: false, lat: 0, lon: 0, tzId: 'UTC' },
        PRESET,
      ),
    ).toThrow(InvalidBirthDateTimeError);
  });
});
