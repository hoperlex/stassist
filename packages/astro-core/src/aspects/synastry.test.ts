import { describe, expect, it } from 'vitest';
import { detectSynastryAspects } from './synastry.js';
import type { AspectableBody } from './index.js';

describe('detectSynastryAspects', () => {
  it('находит только межкартовые аспекты, отбрасывая внутрикартовые', () => {
    const bodiesA: AspectableBody[] = [
      { key: 'sun', longitudeDeg: 0, speedLongDegPerDay: 1 },
      { key: 'moon', longitudeDeg: 10, speedLongDegPerDay: 13 }, // conjunction sun-moon внутри A — должен быть отброшен
    ];
    const bodiesB: AspectableBody[] = [
      { key: 'sun', longitudeDeg: 90, speedLongDegPerDay: 1 }, // square с A.sun
      { key: 'venus', longitudeDeg: 190, speedLongDegPerDay: 1 }, // ~180° от A.sun → opposition
    ];

    const aspects = detectSynastryAspects(bodiesA, bodiesB, { aspectSet: 'major_minor' });

    // Все найденные аспекты — строго один участник из A, другой из B.
    for (const aspect of aspects) {
      const fromA = aspect.bodyA.startsWith('a:') || aspect.bodyB.startsWith('a:');
      const fromB = aspect.bodyA.startsWith('b:') || aspect.bodyB.startsWith('b:');
      expect(fromA && fromB).toBe(true);
    }

    const keys = aspects.map((a) => [a.bodyA, a.bodyB, a.angleName].join('|'));
    expect(keys).toContain('a:sun|b:sun|square');
    expect(keys.some((k) => k.startsWith('a:sun|b:venus') || k.startsWith('a:moon|b:venus'))).toBe(true);
    // внутрикартовый sun-moon (A) не должен просочиться
    expect(aspects.some((a) => a.bodyA === 'a:sun' && a.bodyB === 'a:moon')).toBe(false);
  });

  it('пустые карты дают пустой список без ошибок', () => {
    expect(detectSynastryAspects([], [], { aspectSet: 'major' })).toEqual([]);
  });
});
