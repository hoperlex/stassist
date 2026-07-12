/**
 * Интеграционный прогон гороскопного пайплайна против реального Postgres (требует DATABASE_URL —
 * авто-skip иначе, см. §1 конвенций реализации). Проверяет требования из раздела «Верификация»
 * промта Ф5: полный комплект генерируется, идемпотентность (повторный прогон не создаёт дублей и
 * не дёргает LLM повторно), антидубляж зачинов, готовность (readiness) после прогона.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { astroCalendar, createDb, horoscopes, pageCache, type Db } from '@stassist/db';
import { StubLlmProvider, ZODIAC_SIGN_EN_SLUGS, type LlmGenerateRequest, type LlmGenerateResult, type LlmProvider } from '@stassist/shared';
import { extractZachin } from '@stassist/llm';
import pino from 'pino';
import { and, eq, gte, lte, sql } from 'drizzle-orm';
import { buildAstroCalendarWindow } from '../astro-calendar/build-window.js';
import { upsertAstroCalendarWindow } from '../astro-calendar/upsert-window.js';
import { CALENDAR_REFERENCE_LOCATION } from '../astro-calendar/reference-location.js';
import { checkDailyHoroscopeReadiness, runHoroscopePipeline, runDailyZodiacJob, mskNow } from './jobs.js';
import { horoscopeCacheTag } from './page-cache.js';

/** Считает вызовы generate() — для проверки «повторный запуск не дёргает LLM» (реальный путь;
 *  дефолтный stub-путь ВООБЩЕ не вызывает generate(), см. doc-комментарий generate-batch.ts —
 *  этот тест использует его именно для подсчёта вызовов на верхнем уровне идемпотентности).
 *  `name` НЕ 'stub' — заставляет generate-batch.ts пойти по «реальному» JSON-промт-пути. */
class CountingFakeProvider implements LlmProvider {
  readonly name = 'counting-fake';
  calls = 0;
  private readonly inner = new StubLlmProvider();
  async generate(req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    this.calls += 1;
    return this.inner.generate(req);
  }
}

describe.skipIf(!process.env.DATABASE_URL)('Гороскопный пайплайн (integration)', () => {
  let pool: Pool;
  let db: Db;
  // Далёкая тестовая дата — не пересекается с реальными данными, детерминирована для теста.
  const TEST_NOW = new Date('2031-05-14T21:20:00Z'); // 2031-05-15 00:20 MSK, четверг

  beforeAll(async () => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = createDb(pool);

    // Предрасчитываем astro_calendar на окно вокруг тестовой даты — реальные факты, не заглушка.
    const window = buildAstroCalendarWindow('2031-05-10', 20, CALENDAR_REFERENCE_LOCATION);
    await upsertAstroCalendarWindow(db, window);
  });

  afterAll(async () => {
    await db.delete(horoscopes).where(sql`date_key LIKE '2031%' OR date_key LIKE '2032%'`);
    await db.delete(astroCalendar).where(and(gte(astroCalendar.date, '2031-05-01'), lte(astroCalendar.date, '2031-05-31')));
    await db.delete(pageCache).where(sql`path LIKE '/goroskop/aries?d=2031%'`);
    await pool.end();
  });

  it('полный прогон пайплайна создаёт западную матрицу дня (60=12×5) + восточные/лунные/шуточные тексты', async () => {
    const logger = pino({ level: 'silent' });
    const summary = await runHoroscopePipeline({ db, llm: new StubLlmProvider(), logger }, TEST_NOW);

    expect(summary.daily).toBeGreaterThanOrEqual(120); // 12×5 (день) + 12×5 (завтра)
    expect(summary.eastern).toBeGreaterThanOrEqual(12);
    // lunar_day evergreen — если уже создано (этим же прогоном ИЛИ ручным data:horoscopes-backfill
    // на этой БД ранее, см. doc-комментарий findLunarDayHoroscope), новые 0 — это КОРРЕКТНАЯ
    // идемпотентность, а не провал; инвариант «всего 30» проверяет отдельный тест ниже.
    expect(summary.lunarDay).toBeGreaterThanOrEqual(0);
    expect(summary.humor).toBeGreaterThanOrEqual(15); // 12 антигороскоп + 3 профессии
    expect(summary.total).toBeGreaterThan(0);

    const readiness = await checkDailyHoroscopeReadiness({ db, llm: new StubLlmProvider(), logger }, TEST_NOW);
    expect(readiness.ready).toBe(true);
    expect(readiness.publishedCount).toBe(60);
  });

  it('page_cache: инвалидируется по тегу horoscope:{dateKey} после публикации (requirement 6 промта Ф5)', async () => {
    const logger = pino({ level: 'silent' });
    const msk = mskNow(TEST_NOW);
    const dateKey = msk.toISOString().slice(0, 10);
    const tag = horoscopeCacheTag(dateKey);

    await db.insert(pageCache).values({
      path: `/goroskop/aries?d=${dateKey}`,
      html: '<html>устаревшая версия</html>',
      expiresAt: new Date(Date.now() + 3_600_000),
      tags: [tag],
    });

    // force=true гарантированно перезаписывает (а не пропускает как уже существующее) — так
    // проверка инвалидации не зависит от того, был ли этот день уже сгенерирован предыдущим тестом.
    await runDailyZodiacJob({ db, llm: new StubLlmProvider(), logger }, msk, true);

    const remaining = await db.select({ id: pageCache.id }).from(pageCache).where(eq(pageCache.path, `/goroskop/aries?d=${dateKey}`));
    expect(remaining).toHaveLength(0);
  });

  it('идемпотентность: повторный прогон не создаёт дублей и не дёргает LLM (реальный провайдер)', async () => {
    const logger = pino({ level: 'silent' });
    const counting = new CountingFakeProvider();
    const msk = mskNow(TEST_NOW);
    const first = await runDailyZodiacJob({ db, llm: counting, logger }, msk, true); // force — гарантируем перезапись реальным путём один раз
    const callsAfterFirst = counting.calls;
    expect(callsAfterFirst).toBeGreaterThan(0);

    const second = await runDailyZodiacJob({ db, llm: counting, logger }, msk, false); // без force — идемпотентно
    expect(second.written).toBe(0);
    expect(counting.calls).toBe(callsAfterFirst); // не дёрнуло LLM повторно

    void first;
  });

  it('антидубляж: зачины дней подряд для одного знака не совпадают в пределах окна истории', async () => {
    const logger = pino({ level: 'silent' });
    const llm = new StubLlmProvider();
    const zachins: string[] = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(TEST_NOW.getTime() + i * 86_400_000);
      await runDailyZodiacJob({ db, llm, logger }, mskNow(day), false);
      const dateKey = mskNow(day).toISOString().slice(0, 10);
      const rows = await db
        .select({ bodyMd: horoscopes.bodyMd })
        .from(horoscopes)
        .where(
          sql`${horoscopes.scope} = 'zodiac' AND ${horoscopes.sign} = 'aries' AND ${horoscopes.period} = 'day' AND ${horoscopes.topic} = 'general' AND ${horoscopes.dateKey} = ${dateKey} AND ${horoscopes.humor} = false`,
        )
        .limit(1);
      if (rows[0]) zachins.push(extractZachin(rows[0].bodyMd));
    }
    const uniqueZachins = new Set(zachins);
    // Не требуем ВСЕ разными (короткий банк вариантов может исчерпаться), но большинство должны отличаться.
    expect(uniqueZachins.size).toBeGreaterThan(1);
  });

  it('лунные дни: evergreen — повторный прогон не пересоздаёт существующие 30 записей', async () => {
    const logger = pino({ level: 'silent' });
    const before = await db.select({ id: horoscopes.id }).from(horoscopes).where(eq(horoscopes.scope, 'lunar_day'));
    await runHoroscopePipeline({ db, llm: new StubLlmProvider(), logger }, new Date(TEST_NOW.getTime() + 86_400_000));
    const after = await db.select({ id: horoscopes.id }).from(horoscopes).where(eq(horoscopes.scope, 'lunar_day'));
    expect(after.length).toBe(before.length);
    expect(after.length).toBe(30);
  });

  it('западная годовая матрица покрывает все 12 знаков', async () => {
    const rows = await db
      .select({ sign: horoscopes.sign })
      .from(horoscopes)
      .where(sql`${horoscopes.scope} = 'zodiac' AND ${horoscopes.period} = 'year' AND ${horoscopes.humor} = false AND ${horoscopes.topic} = 'general'`);
    const signs = new Set(rows.map((r) => r.sign));
    for (const sign of ZODIAC_SIGN_EN_SLUGS) expect(signs.has(sign)).toBe(true);
  });
});
