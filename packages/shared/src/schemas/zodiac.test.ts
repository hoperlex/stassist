import { describe, expect, it } from 'vitest';
import {
  ZODIAC_SIGNS,
  allCanonicalCompatPairs,
  canonicalCompatPairSlug,
  signByIndex,
  signBySlug,
} from './zodiac.js';

describe('ZODIAC_SIGNS', () => {
  it('содержит ровно 12 знаков с уникальными индексами 0..11 и слагами', () => {
    expect(ZODIAC_SIGNS).toHaveLength(12);
    expect(new Set(ZODIAC_SIGNS.map((s) => s.signIndex)).size).toBe(12);
    expect(new Set(ZODIAC_SIGNS.map((s) => s.slug)).size).toBe(12);
  });

  it('signBySlug/signByIndex согласованы друг с другом', () => {
    for (const sign of ZODIAC_SIGNS) {
      expect(signBySlug(sign.slug)).toEqual(sign);
      expect(signByIndex(sign.signIndex)).toEqual(sign);
    }
  });
});

describe('canonicalCompatPairSlug', () => {
  it('канонизирует порядок пары по возрастанию индекса знака', () => {
    const direct = canonicalCompatPairSlug('oven', 'telec');
    const reversed = canonicalCompatPairSlug('telec', 'oven');
    expect(direct).toEqual({ signA: 'oven', signB: 'telec', slug: 'oven-i-telec' });
    expect(reversed).toEqual(direct);
  });

  it('поддерживает пару знака с самим собой', () => {
    expect(canonicalCompatPairSlug('lev', 'lev')).toEqual({ signA: 'lev', signB: 'lev', slug: 'lev-i-lev' });
  });

  it('возвращает undefined для неизвестного слага', () => {
    expect(canonicalCompatPairSlug('oven', 'не-знак')).toBeUndefined();
  });
});

describe('allCanonicalCompatPairs', () => {
  it('генерирует ровно 78 канонических пар (12 одинаковых + 66 различных)', () => {
    const pairs = allCanonicalCompatPairs();
    expect(pairs).toHaveLength(78);
    // все слаги уникальны — нет дублей/зеркал среди «канонических»
    expect(new Set(pairs.map((p) => p.slug)).size).toBe(78);
    // каждая пара уже в каноническом порядке
    for (const pair of pairs) {
      expect(canonicalCompatPairSlug(pair.signA, pair.signB)?.slug).toBe(pair.slug);
    }
  });
});
