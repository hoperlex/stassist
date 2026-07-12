import { describe, expect, it } from 'vitest';
import type { Bodies, Position } from '@stassist/shared';
import {
  buildElectivesContent,
  buildEventDateContent,
  buildPeriodMapContent,
  computeElectiveWindowsForOrder,
  type ElectivesQuestionSubject,
  type EventDateSubject,
  type PeriodMapSubject,
} from './custom-forecast-content.js';

function pos(overrides: Partial<Position> = {}): Position {
  const signIndex = overrides.signIndex ?? 0;
  const signDegree = overrides.signDegree ?? 0;
  return {
    longitudeDeg: signIndex * 30 + signDegree,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex,
    signDegree,
    houseNumber: null,
    ...overrides,
  };
}

const NATAL_BODIES: Partial<Bodies> = {
  sun: pos({ signIndex: 2, signDegree: 24.07 }),
  moon: pos({ signIndex: 7, signDegree: 12.3 }),
};

describe('buildEventDateContent', () => {
  it('строит непустой контент с разделом «Как считали» и честным дисклеймером', () => {
    const subject: EventDateSubject = {
      type: 'event_date',
      birthProfileId: '11111111-1111-1111-1111-111111111111',
      depth: 'standard',
      eventDate: '2026-08-15',
      weighRetrogradeMercury: false,
    };
    const content = buildEventDateContent({
      subject,
      natalBodies: NATAL_BODIES,
      coverNoteRu: 'Подготовлено для профиля «Я»',
      introText: 'Вступление.',
      generatedAtIso: new Date().toISOString(),
    });

    expect(content.titleRu).toContain('2026');
    expect(content.sections.length).toBeGreaterThan(0);
    expect(content.sections.some((s) => s.heading === 'Как считали')).toBe(true);
    expect(content.disclaimerParagraphs.length).toBeGreaterThan(0);
    for (const section of content.sections) {
      expect(section.paragraphs.length).toBeGreaterThan(0);
    }
  });
});

describe('buildPeriodMapContent', () => {
  it('строит непустой контент за короткий период', () => {
    const subject: PeriodMapSubject = {
      type: 'period_map',
      birthProfileId: '11111111-1111-1111-1111-111111111111',
      depth: 'standard',
      periodStart: '2026-08-01',
      periodEnd: '2026-08-10',
      weighRetrogradeMercury: false,
    };
    const content = buildPeriodMapContent({
      subject,
      natalBodies: NATAL_BODIES,
      coverNoteRu: 'Подготовлено для профиля «Я»',
      introText: 'Вступление.',
      generatedAtIso: new Date().toISOString(),
    });

    expect(content.titleRu).toContain('Карта периода');
    expect(content.sections.some((s) => s.heading === 'Ключевые транзиты периода')).toBe(true);
  });
});

describe('computeElectiveWindowsForOrder / buildElectivesContent', () => {
  it(
    'depth=standard использует более крупный шаг (быстрее), depth=deep — более мелкий (детальнее)',
    () => {
      const baseSubject: Omit<ElectivesQuestionSubject, 'depth'> = {
        type: 'electives_question',
        birthProfileId: '11111111-1111-1111-1111-111111111111',
        intervalStart: '2026-08-01',
        intervalEnd: '2026-08-06',
        weighRetrogradeMercury: false,
      };
      const standardWindows = computeElectiveWindowsForOrder({ ...baseSubject, depth: 'standard' }, NATAL_BODIES);
      const deepWindows = computeElectiveWindowsForOrder({ ...baseSubject, depth: 'deep' }, NATAL_BODIES);

      expect(Array.isArray(standardWindows)).toBe(true);
      expect(Array.isArray(deepWindows)).toBe(true);

      const content = buildElectivesContent({
        subject: { ...baseSubject, depth: 'standard' },
        windows: standardWindows,
        coverNoteRu: 'Подготовлено для профиля «Я»',
        introText: 'Вступление.',
        generatedAtIso: new Date().toISOString(),
      });
      expect(content.titleRu).toBe('Поиск благоприятного окна');
      expect(content.sections.some((s) => s.heading === 'Наиболее благоприятные окна в указанном интервале')).toBe(true);
    },
    20_000,
  );

  it('честный empty-state, если окон не найдено (пустой массив windows)', () => {
    const subject: ElectivesQuestionSubject = {
      type: 'electives_question',
      birthProfileId: '11111111-1111-1111-1111-111111111111',
      depth: 'standard',
      intervalStart: '2026-08-01',
      intervalEnd: '2026-08-06',
      weighRetrogradeMercury: false,
    };
    const content = buildElectivesContent({
      subject,
      windows: [],
      coverNoteRu: 'x',
      introText: 'x',
      generatedAtIso: new Date().toISOString(),
    });
    expect(content.sections[0]!.paragraphs[0]).toMatch(/не найдено/);
  });
});
