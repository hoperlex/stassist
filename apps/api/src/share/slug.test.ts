import { describe, expect, it } from 'vitest';
import type { SharePositions } from '@stassist/shared';
import { computeShareSlug } from './slug.js';

function pos(longitudeDeg: number) {
  return {
    longitudeDeg,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex: Math.floor(longitudeDeg / 30),
    signDegree: longitudeDeg % 30,
    houseNumber: 1,
  };
}

const positions: SharePositions = {
  bodies: {
    sun: pos(10), moon: pos(100), mercury: pos(15), venus: pos(200), mars: pos(280),
    jupiter: pos(340), saturn: pos(60), uranus: pos(130), neptune: pos(150), pluto: pos(170),
  },
  points: {},
  angles: { ascDeg: 0, mcDeg: 0, dscDeg: 0, icDeg: 0, armcDeg: 0, vertexDeg: null },
  houses: [],
  aspects: [],
  meta: { houseSystem: 'placidus', zodiac: 'tropical', noHouses: false },
};

describe('computeShareSlug', () => {
  it('одинаковый вход даёт одинаковый слаг (дедупликация)', () => {
    const a = computeShareSlug({ kind: 'natal', positions, positionsB: undefined });
    const b = computeShareSlug({ kind: 'natal', positions, positionsB: undefined });
    expect(a).toBe(b);
  });

  it('разный вход даёт разный слаг', () => {
    const a = computeShareSlug({ kind: 'natal', positions, positionsB: undefined });
    const b = computeShareSlug({ kind: 'synastry', positions, positionsB: positions });
    expect(a).not.toBe(b);
  });

  it('слаг — короткая hex-строка, годная для URL', () => {
    const slug = computeShareSlug({ kind: 'natal', positions, positionsB: undefined });
    expect(slug).toMatch(/^[0-9a-f]{16}$/);
  });

  it('Ф9: caption — часть содержимого карточки: другая подпись → другой слаг, та же → тот же', () => {
    const base = { kind: 'transit_day' as const, positions, positionsB: positions };
    const a = computeShareSlug({ ...base, caption: 'В точку · Марс □ Солнце' });
    const b = computeShareSlug({ ...base, caption: 'Мимо · Марс □ Солнце' });
    const c = computeShareSlug({ ...base, caption: 'В точку · Марс □ Солнце' });
    expect(a).not.toBe(b);
    expect(a).toBe(c);
    // отсутствие caption эквивалентно null (обратная совместимость со старыми записями)
    expect(computeShareSlug({ kind: 'natal', positions, positionsB: undefined })).toBe(
      computeShareSlug({ kind: 'natal', positions, positionsB: undefined, caption: undefined }),
    );
  });
});
