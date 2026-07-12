import { describe, expect, it } from 'vitest';
import { mskNow } from './jobs.js';

describe('mskNow', () => {
  it('сдвигает UTC-момент на +3 часа (МСК, без перехода на летнее время)', () => {
    const utc = new Date('2026-07-13T21:20:00Z');
    const msk = mskNow(utc);
    expect(msk.toISOString()).toBe('2026-07-14T00:20:00.000Z');
  });

  it('корректно определяет «понедельник» для повторяющегося cron-слота 00:20 МСК', () => {
    // 2026-07-13 21:20 UTC = 2026-07-14 00:20 MSK, вторник. Понедельник МСК соответствует
    // предыдущему вторнику по UTC-часам 21:xx воскресенья.
    const sundayLateUtc = new Date('2026-07-12T21:20:00Z'); // 2026-07-13 00:20 MSK — понедельник
    const msk = mskNow(sundayLateUtc);
    expect(msk.getUTCDay()).toBe(1);
  });
});
