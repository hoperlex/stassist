import { describe, expect, it } from 'vitest';
import { resolvePeriodOrTopicSlug, type HoroscopePeriod, type HoroscopeTopic } from '@stassist/shared';
import { zodiacHoroscopePath } from './horoscope-seo.js';

const PERIODS: HoroscopePeriod[] = ['day', 'tomorrow', 'week', 'month', 'year'];
const TOPICS: HoroscopeTopic[] = ['general', 'love', 'money', 'career', 'health'];

describe('zodiacHoroscopePath — согласованность с resolvePeriodOrTopicSlug', () => {
  for (const period of PERIODS) {
    for (const topic of TOPICS) {
      it(`${period}/${topic}: путь резолвится обратно в тот же (period,topic) (кроме канона day/general)`, () => {
        const path = zodiacHoroscopePath('oven', period, topic);
        expect(path.startsWith('/goroskop/oven')).toBe(true);

        if (period === 'day' && topic === 'general') {
          expect(path).toBe('/goroskop/oven');
          return;
        }
        const segments = path.split('/').filter(Boolean); // ['goroskop','oven', ...]
        if (segments.length === 3) {
          const resolved = resolvePeriodOrTopicSlug(segments[2]!);
          expect(resolved).toEqual({ period, topic });
        } else {
          // 4-сегментный путь — period+tema оба явные, без косвенного резолва.
          expect(segments).toHaveLength(4);
        }
      });
    }
  }

  it('все 25 комбинаций дают РАЗНЫЕ пути (нет коллизий URL)', () => {
    const paths = new Set<string>();
    for (const period of PERIODS) {
      for (const topic of TOPICS) {
        paths.add(zodiacHoroscopePath('oven', period, topic));
      }
    }
    expect(paths.size).toBe(25);
  });
});
