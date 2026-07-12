import { describe, expect, it } from 'vitest';
import type { DaySkyFact } from '../horoscope/astro-day-facts.js';
import { selectDayEvent } from './select-day-event.js';

const BASE: DaySkyFact = {
  date: '2026-07-13',
  moonSignIndex: 5,
  lunarDay: 12,
  phaseName: 'waxing_gibbous',
  isVoidOfCourse: false,
  retrogradeBodies: [],
  signIngresses: [],
};

describe('selectDayEvent (приоритет событий дня)', () => {
  it('ингресс планеты (не Луны) — высший приоритет, заголовок в родительном падеже', () => {
    const { event, title } = selectDayEvent(
      { ...BASE, signIngresses: [{ body: 'moon', toSignIndex: 2 }, { body: 'mars', toSignIndex: 6 }], phaseName: 'full', retrogradeBodies: ['mercury'] },
      [{ bodyA: 'sun', bodyB: 'moon', angle: 'square', orbDeg: 0.1 }],
    );
    expect(event.kind).toBe('ingress');
    expect(event.body).toBe('mars');
    expect(title).toBe('Марс входит в знак Весов');
  });

  it('ингресс Луны игнорируется (Луна меняет знак каждые ~2,5 дня — это fallback, не событие)', () => {
    const { event } = selectDayEvent({ ...BASE, signIngresses: [{ body: 'moon', toSignIndex: 2 }] }, []);
    expect(event.kind).not.toBe('ingress');
  });

  it('точная фаза (полнолуние) — второй приоритет', () => {
    const { event, title } = selectDayEvent({ ...BASE, phaseName: 'full', moonSignIndex: 9, retrogradeBodies: ['venus'] }, []);
    expect(event.kind).toBe('moon_phase');
    expect(title).toBe('Полнолуние в знаке Козерога');
  });

  it('не-точные фазы событием не считаются, ретро — третий приоритет', () => {
    const { event, title } = selectDayEvent({ ...BASE, retrogradeBodies: ['mercury'] }, []);
    expect(event.kind).toBe('retro_station');
    expect(title).toBe('Ретроградный Меркурий');
  });

  it('без ингрессов/фаз/ретро — самый точный мажорный аспект', () => {
    const { event, title } = selectDayEvent(BASE, [
      { bodyA: 'venus', bodyB: 'jupiter', angle: 'trine', orbDeg: 2.4 },
      { bodyA: 'sun', bodyB: 'saturn', angle: 'square', orbDeg: 0.3 },
    ]);
    expect(event.kind).toBe('aspect');
    expect(event.aspect?.bodyA).toBe('sun');
    expect(title).toContain('квадрат');
  });

  it('fallback — Луна в знаке (есть всегда)', () => {
    const { event, title } = selectDayEvent(BASE, []);
    expect(event.kind).toBe('moon_sign');
    expect(title).toBe('Луна в знаке Девы');
  });

  it('детерминированность: один вход — один результат', () => {
    const a = selectDayEvent(BASE, []);
    const b = selectDayEvent(BASE, []);
    expect(a).toEqual(b);
  });
});
