/**
 * Стартовый backfill гороскопов (см. docs/roadmap/31-конвенции-реализации.md §6 «Ф5 initial-run»,
 * requirement из промта Ф5 «стартовый backfill (критично для «портал не пустой»)»). Единоразовый
 * (идемпотентный, безопасно перезапускать) прогон, наполняющий НА ДАТУ ЗАПУСКА:
 *  - сегодня + завтра (12 знаков × 5 тем × 2 периода = 120);
 *  - текущую неделю (12×5=60) — БЕЗ гейта «только по понедельникам» (в отличие от cron, см.
 *    apps/worker/src/horoscope/jobs.ts `runHoroscopePipeline`) — backfill обязан заполнить её
 *    независимо от дня недели запуска;
 *  - текущий месяц (12×5=60) — аналогично, без гейта «только 1 числа»;
 *  - текущий год (12×5=60, + следующий год с октября);
 *  - восточный годовой (12, + следующий год с октября);
 *  - 30 лунных дней (evergreen);
 *  - шуточный контур (12 антигороскопов + 3 профессии).
 *
 * ИТОГО в типичном прогоне (не октябрь): 120+60+60+60+12+30+15 = 357 текстов, из них РОВНО 300 —
 * полная матрица scope='zodiac' (day+tomorrow+week+month+year × 12 × 5, см. doc-комментарий
 * packages/shared/src/schemas/horoscope.ts «ровно DoD «300 текстов»»), плюс 57 сверх неё
 * (восточный/лунные/шуточный — вне зодиакальной матрицы 12×5×5).
 *
 * DATA-STEP (§4 конвенций реализации): требует DATABASE_URL (пишет в реальную БД — в отличие от
 * `gen-corpus.ts`, результат НЕ детерминирован по «сегодня» и не может быть закоммичен статичным
 * SQL-сидом, см. doc-комментарий apps/worker/src/horoscope/jobs.ts). НЕ часть build/CI-гейта.
 * Требует СОБРАННЫЕ пакеты + apps/worker (см. package.json скрипт `data:horoscopes-backfill`).
 */
import { Pool } from 'pg';
import type { Logger } from 'pino';
import { createDb, resolvePgPoolConfig } from '@stassist/db';
import { StubLlmProvider } from '@stassist/shared';
// apps/* (в отличие от packages/*) не публикует workspace-экспорт — забираем собранный dist
// напрямую по относительному пути (см. doc-комментарий файла выше).
import {
  mskNow,
  runDailyZodiacJob,
  runEasternYearlyJob,
  runHumorJob,
  runLunarDayJob,
  runMonthlyZodiacJob,
  runWeeklyZodiacJob,
  runYearlyZodiacJob,
  type HoroscopeJobDeps,
} from '../apps/worker/dist/horoscope/jobs.js';

/** Консольный логгер вместо `pino` — `tools/` запускается напрямую через `node
 *  --experimental-strip-types` из корня репозитория (без node_modules/pino, тот стоит только в
 *  apps/worker/apps/api); структурно совместим с `pino.Logger` (см. тот же приём в
 *  apps/worker/src/worker.test.ts `fakeLogger()`). */
function consoleLogger(): Logger {
  return {
    info: (...args: unknown[]) => console.log('[info]', ...args),
    warn: (...args: unknown[]) => console.warn('[warn]', ...args),
    error: (...args: unknown[]) => console.error('[error]', ...args),
    debug: () => undefined,
    trace: () => undefined,
    fatal: (...args: unknown[]) => console.error('[fatal]', ...args),
  } as unknown as Logger;
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      'DATABASE_URL не задан. Backfill гороскопов пишет в реальную БД — это ручной data-step, не часть сборки.',
    );
    process.exit(1);
  }
  const force = process.argv.includes('--force');

  const pool = new Pool(resolvePgPoolConfig(connectionString));
  const db = createDb(pool);
  const logger = consoleLogger();
  const deps: HoroscopeJobDeps = { db, llm: new StubLlmProvider(), logger };
  const msk = mskNow(new Date());

  console.log(`Backfill гороскопов на ${msk.toISOString().slice(0, 10)} (МСК)${force ? ' — force' : ''} …`);

  const daily = await runDailyZodiacJob(deps, msk, force);
  const weekly = await runWeeklyZodiacJob(deps, msk, force);
  const monthly = await runMonthlyZodiacJob(deps, msk, force);
  const yearly = await runYearlyZodiacJob(deps, msk, force);
  const eastern = await runEasternYearlyJob(deps, msk, force);
  const lunarDay = await runLunarDayJob(deps, msk, force);
  const humor = await runHumorJob(deps, msk, force);

  const total = daily.written + weekly.written + monthly.written + yearly.written + eastern.written + lunarDay.written + humor.written;
  console.log('Готово:', { daily: daily.written, weekly: weekly.written, monthly: monthly.written, yearly: yearly.written, eastern: eastern.written, lunarDay: lunarDay.written, humor: humor.written, total });

  await pool.end();
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
