import { describe, expect, it } from 'vitest';
import { birthProfileInputSchema } from './birth-profile.js';

const validPlace = { placeName: 'Москва, Россия', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' };

describe('birthProfileInputSchema', () => {
  it('принимает профиль с известным временем рождения', () => {
    expect(() =>
      birthProfileInputSchema.parse({
        label: 'Я',
        birthDate: '1990-05-17',
        birthTime: '14:30',
        timeUnknown: false,
        place: validPlace,
      }),
    ).not.toThrow();
  });

  it('принимает профиль с timeUnknown=true и без birthTime', () => {
    expect(() =>
      birthProfileInputSchema.parse({
        label: 'Партнёр',
        birthDate: '1990-05-17',
        timeUnknown: true,
        place: validPlace,
      }),
    ).not.toThrow();
  });

  it('отклоняет профиль без времени и без timeUnknown', () => {
    expect(() =>
      birthProfileInputSchema.parse({
        label: 'Я',
        birthDate: '1990-05-17',
        timeUnknown: false,
        place: validPlace,
      }),
    ).toThrow(/время рождения/);
  });

  it('отклоняет некорректный формат даты', () => {
    expect(() =>
      birthProfileInputSchema.parse({
        label: 'Я',
        birthDate: '17.05.1990',
        timeUnknown: true,
        place: validPlace,
      }),
    ).toThrow();
  });

  it('требует место (place) с координатами', () => {
    expect(() =>
      birthProfileInputSchema.parse({
        label: 'Я',
        birthDate: '1990-05-17',
        timeUnknown: true,
        place: { placeName: 'X', lat: 999, lon: 0, tzId: 'Europe/Moscow' },
      }),
    ).toThrow();
  });
});
