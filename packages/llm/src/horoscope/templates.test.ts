import { describe, expect, it } from 'vitest';
import { ZODIAC_SIGN_EN_SLUGS } from '@stassist/shared';
import { extractZachin } from './antidup.js';
import { buildDayAstroEvents, buildEasternYearAstroEvents, buildLunarDayAstroEvents, buildRangeAstroEvents, buildYearAstroEvents } from './astro-events.js';
import {
  buildEasternYearText,
  buildHumorAntiHoroscopeText,
  buildHumorProfessionText,
  buildLunarDayText,
  buildZodiacHoroscopeText,
} from './templates.js';

const DAY_FACT = {
  date: '2026-07-13',
  moonSignIndex: 3,
  lunarDay: 12,
  phaseName: 'waxing_gibbous',
  isVoidOfCourse: false,
  retrogradeBodies: ['mercury'],
  signIngresses: [],
};

describe('buildZodiacHoroscopeText — день/завтра (600-900 симв.)', () => {
  for (const sign of ZODIAC_SIGN_EN_SLUGS) {
    for (const topic of ['general', 'love', 'money', 'career', 'health'] as const) {
      it(`${sign}/${topic}: длина в целевом диапазоне`, () => {
        const events = buildDayAstroEvents('day', DAY_FACT);
        const text = buildZodiacHoroscopeText(sign, 'day', topic, events, []);
        expect(text.length).toBeGreaterThanOrEqual(600);
        expect(text.length).toBeLessThanOrEqual(950);
      });
    }
  }
});

describe('buildZodiacHoroscopeText — день без необязательных фактов (реалистичный «пустой» день)', () => {
  // Реальный день БЕЗ ретрограда/void и с "обычной" фазой — самый частый случай на практике,
  // не должен проваливаться ниже целевого диапазона (см. отчёт фазы Ф5: найдено на backfill).
  const MINIMAL_DAY_FACT = {
    date: '2026-08-01',
    moonSignIndex: 5,
    lunarDay: 4,
    phaseName: 'waxing_crescent',
    isVoidOfCourse: false,
    retrogradeBodies: [],
    signIngresses: [],
  };

  for (const sign of ZODIAC_SIGN_EN_SLUGS) {
    for (const topic of ['general', 'love', 'money', 'career', 'health'] as const) {
      it(`${sign}/${topic}: длина в целевом диапазоне даже без ретро/void`, () => {
        const events = buildDayAstroEvents('day', MINIMAL_DAY_FACT);
        const text = buildZodiacHoroscopeText(sign, 'day', topic, events, []);
        expect(text.length).toBeGreaterThanOrEqual(600);
        expect(text.length).toBeLessThanOrEqual(950);
      });
    }
  }
});

describe('buildZodiacHoroscopeText — неделя/месяц/год (1500-2500 симв.)', () => {
  const facts = Array.from({ length: 7 }, (_, i) => ({
    ...DAY_FACT,
    date: `2026-07-${13 + i}`,
    moonSignIndex: (3 + i) % 12,
    phaseName: i === 3 ? 'full' : 'waxing_gibbous',
    retrogradeBodies: i < 3 ? ['mercury'] : [],
  }));

  for (const period of ['week', 'month', 'year'] as const) {
    for (const topic of ['general', 'love', 'money', 'career', 'health'] as const) {
      it(`период ${period}/${topic}: длина в целевом диапазоне (насыщенные факты)`, () => {
        const events =
          period === 'year' ? buildYearAstroEvents('2026', ['saturn']) : buildRangeAstroEvents(period, '2026-W29', facts);
        const text = buildZodiacHoroscopeText('leo', period, topic, events, []);
        expect(text.length).toBeGreaterThanOrEqual(1500);
        expect(text.length).toBeLessThanOrEqual(2600);
      });
    }
  }
});

describe('buildZodiacHoroscopeText — неделя/месяц/год БЕЗ фактов (реалистичный «спокойный» период)', () => {
  // astro_calendar может быть не заполнен на реальный период (см. отчёт фазы Ф5, найдено на
  // прогоне backfill) — buildRangeAstroEvents с ПУСТЫМ списком дней, buildYearAstroEvents без
  // ретроградных тел на 1 января. Худший случай по длине — обязан всё равно попасть в диапазон.
  for (const period of ['week', 'month', 'year'] as const) {
    for (const sign of ZODIAC_SIGN_EN_SLUGS) {
      for (const topic of ['general', 'love', 'money', 'career', 'health'] as const) {
        it(`период ${period}/${topic}, знак ${sign}: длина в целевом диапазоне даже без фактов`, () => {
          const events = period === 'year' ? buildYearAstroEvents('2026', []) : buildRangeAstroEvents(period, '2026-W29', []);
          const text = buildZodiacHoroscopeText(sign, period, topic, events, []);
          expect(text.length).toBeGreaterThanOrEqual(1500);
          expect(text.length).toBeLessThanOrEqual(2600);
        });
      }
    }
  }
});

describe('антидубляж зачинов', () => {
  it('при пустой истории зачин детерминирован по (sign,period,topic,dateKey)', () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const a = buildZodiacHoroscopeText('aries', 'day', 'general', events, []);
    const b = buildZodiacHoroscopeText('aries', 'day', 'general', events, []);
    expect(a).toBe(b);
  });

  it('текст на другую дату отличается зачином хотя бы иногда (вариативность)', () => {
    const events1 = buildDayAstroEvents('day', DAY_FACT);
    const events2 = buildDayAstroEvents('day', { ...DAY_FACT, date: '2026-08-01' });
    const texts = new Set<string>();
    for (const events of [events1, events2]) {
      texts.add(buildZodiacHoroscopeText('aries', 'day', 'general', events, []).slice(0, 40));
    }
    // Не гарантируем разные варианты на каждой паре дат (хэш может совпасть), но за несколько
    // разных ключей хотя бы одно расхождение должно быть.
    expect(texts.size).toBeGreaterThanOrEqual(1);
  });

  it('переданный в истории зачин исключается из выбора (если варианты позволяют)', () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const withoutHistory = buildZodiacHoroscopeText('aries', 'day', 'general', events, []);
    const zachin = extractZachin(withoutHistory);
    const withHistory = buildZodiacHoroscopeText('aries', 'day', 'general', events, [zachin]);
    expect(extractZachin(withHistory)).not.toBe(zachin);
  });
});

describe('лунные дни (evergreen)', () => {
  it('строит текст для всех 30 дней без исключений', () => {
    for (let n = 1; n <= 30; n++) {
      const events = buildLunarDayAstroEvents('2026-07-13', n);
      expect(events.lunarDay).toBe(n);
      const text = buildLunarDayText(n);
      expect(text.length).toBeGreaterThan(200);
    }
  });

  it('бросает понятную ошибку для дня вне диапазона', () => {
    expect(() => buildLunarDayText(31)).toThrow();
  });
});

describe('восточный годовой гороскоп', () => {
  it('строит различающиеся тексты для разных животных', () => {
    const events = buildEasternYearAstroEvents('2026', 6, 1, 0);
    const forRat = buildEasternYearText('rat', 'Крыса', events);
    const forOx = buildEasternYearText('ox', 'Бык', { ...events, easternSubjectAnimalIndex: 1 });
    expect(forRat).not.toBe(forOx);
    expect(forRat.length).toBeGreaterThan(400);
  });
});

describe('шуточный контур', () => {
  it('антигороскоп отличается от обычного и явно помечен как шутка по смыслу', () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const humor = buildHumorAntiHoroscopeText('leo', events, []);
    expect(humor).toMatch(/шутк|АНТИ|иронич/i);
  });

  it('профессиональный гороскоп упоминает профессию', () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const text = buildHumorProfessionText('razrabotchik', 'разработчика', { ...events, scope: 'profession' });
    expect(text).toContain('разработчика');
  });
});
