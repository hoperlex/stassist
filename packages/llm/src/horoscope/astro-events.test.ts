import { describe, expect, it } from 'vitest';
import {
  buildDayAstroEvents,
  buildEasternYearAstroEvents,
  buildLunarDayAstroEvents,
  buildRangeAstroEvents,
  buildYearAstroEvents,
  type DaySkyFact,
} from './astro-events.js';

const baseFact: DaySkyFact = {
  date: '2026-07-13',
  moonSignIndex: 3,
  lunarDay: 12,
  phaseName: 'waxing_gibbous',
  isVoidOfCourse: false,
  retrogradeBodies: ['mercury'],
  signIngresses: [],
};

describe('buildDayAstroEvents', () => {
  it('переносит все факты дня без искажений', () => {
    const events = buildDayAstroEvents('day', baseFact, [{ bodyA: 'sun', bodyB: 'moon', angle: 'trine', orbDeg: 1.2 }]);
    expect(events.scope).toBe('zodiac');
    expect(events.period).toBe('day');
    expect(events.dateKey).toBe('2026-07-13');
    expect(events.moonSignIndex).toBe(3);
    expect(events.notableAspects).toHaveLength(1);
  });
});

describe('buildRangeAstroEvents', () => {
  it('пустой диапазон даёт пустые массивы без исключений', () => {
    const events = buildRangeAstroEvents('week', '2026-W29', []);
    expect(events.moonSignsVisited).toEqual([]);
  });

  it('фиксирует смену знака Луны только на реальных переходах (без повторов подряд)', () => {
    const facts: DaySkyFact[] = [
      { ...baseFact, date: '2026-07-13', moonSignIndex: 3 },
      { ...baseFact, date: '2026-07-14', moonSignIndex: 3 },
      { ...baseFact, date: '2026-07-15', moonSignIndex: 4 },
    ];
    const events = buildRangeAstroEvents('week', '2026-W29', facts);
    expect(events.moonSignsVisited).toEqual([3, 4]);
    expect(events.fromDate).toBe('2026-07-13');
    expect(events.toDate).toBe('2026-07-15');
  });

  it('обнаруживает старт и конец ретроградности внутри периода', () => {
    const facts: DaySkyFact[] = [
      { ...baseFact, date: '2026-07-13', retrogradeBodies: [] },
      { ...baseFact, date: '2026-07-14', retrogradeBodies: ['mercury'] },
      { ...baseFact, date: '2026-07-15', retrogradeBodies: [] },
    ];
    const events = buildRangeAstroEvents('week', '2026-W29', facts);
    expect(events.retrogradeStarts).toEqual(['mercury']);
    expect(events.retrogradeEnds).toEqual(['mercury']);
  });

  it('собирает даты новолуний и полнолуний', () => {
    const facts: DaySkyFact[] = [
      { ...baseFact, date: '2026-07-13', phaseName: 'new' },
      { ...baseFact, date: '2026-07-14', phaseName: 'full' },
    ];
    const events = buildRangeAstroEvents('month', '2026-07', facts);
    expect(events.newMoonDates).toEqual(['2026-07-13']);
    expect(events.fullMoonDates).toEqual(['2026-07-14']);
  });
});

describe('buildYearAstroEvents / buildEasternYearAstroEvents / buildLunarDayAstroEvents', () => {
  it('year: период year, scope zodiac', () => {
    const events = buildYearAstroEvents('2026', ['saturn']);
    expect(events).toMatchObject({ scope: 'zodiac', period: 'year', dateKey: '2026', retrogradeBodies: ['saturn'] });
  });

  it('eastern: scope eastern, хранит индексы животного/стихии/субъекта', () => {
    const events = buildEasternYearAstroEvents('2026', 6, 1, 0);
    expect(events).toMatchObject({ scope: 'eastern', period: 'year', easternAnimalIndex: 6, easternElementIndex: 1, easternSubjectAnimalIndex: 0 });
  });

  it('lunar_day: scope lunar_day, evergreen (без sky-фактов)', () => {
    const events = buildLunarDayAstroEvents('2026-07-13', 15);
    expect(events).toMatchObject({ scope: 'lunar_day', period: 'day', lunarDay: 15 });
  });
});
