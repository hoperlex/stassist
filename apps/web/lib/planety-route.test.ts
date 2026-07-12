import { describe, expect, it } from 'vitest';
import { matchPlanetInSlug } from './planety-route.js';

describe('matchPlanetInSlug', () => {
  it('разбирает «планета в знаке» (напр. mars-v-lve → Марс в Льве)', () => {
    expect(matchPlanetInSlug('/planety/mars-v-lve')).toEqual({
      kind: 'sign', planetRuSlug: 'mars', planetEnSlug: 'mars', signPrepositionalSlug: 'lve', signEnSlug: 'leo',
    });
  });

  it('разбирает «планета в доме» (напр. venera-v-7-dome)', () => {
    expect(matchPlanetInSlug('/planety/venera-v-7-dome')).toEqual({
      kind: 'house', planetRuSlug: 'venera', planetEnSlug: 'venus', house: 7,
    });
  });

  it('отвергает неизвестную планету/знак/дом вне диапазона', () => {
    expect(matchPlanetInSlug('/planety/neizvestnaya-planeta-v-lve')).toBeNull();
    expect(matchPlanetInSlug('/planety/mars-v-neizvestnyj-znak')).toBeNull();
    expect(matchPlanetInSlug('/planety/mars-v-13-dome')).toBeNull();
    expect(matchPlanetInSlug('/planety/mars-v-0-dome')).toBeNull();
  });

  it('отвергает пути вне /planety/{slug}', () => {
    expect(matchPlanetInSlug('/planety')).toBeNull();
    expect(matchPlanetInSlug('/goroskop/mars-v-lve')).toBeNull();
  });
});
