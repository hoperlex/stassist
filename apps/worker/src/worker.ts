/**
 * Обёртка над pg-boss с ленивой инициализацией (см. §3 конвенций реализации): импорт этого
 * модуля и сборка процесса не требуют БД. Реальное подключение и регистрация очереди/cron
 * происходят только внутри start(), и только если задан DATABASE_URL — иначе воркер логирует
 * degraded-статус и остаётся живым (не падает), чтобы оркестратор не считал процесс упавшим.
 */
import { PgBoss } from 'pg-boss';
import type { Logger } from 'pino';
import pino from 'pino';
import { Pool } from 'pg';
import { createDb } from '@stassist/db';
import { createPorts, type Config, type LlmProvider } from '@stassist/shared';
import { createLlmProviderChain } from '@stassist/llm';
import { buildAstroCalendarWindow } from './astro-calendar/build-window.js';
import { upsertAstroCalendarWindow } from './astro-calendar/upsert-window.js';
import { CALENDAR_REFERENCE_LOCATION } from './astro-calendar/reference-location.js';
import { processPendingShares } from './share/process-pending-shares.js';
import { DrizzleChunkRepository } from './llm/drizzle-chunk-repository.js';
import { processQueuedAiReports } from './llm/generate-report-job.js';

export type WorkerStatus = 'stopped' | 'degraded' | 'running';

/** Тестовая задача: раз в 5 минут пишет лог, чтобы подтвердить, что воркер жив. */
export const PING_QUEUE = 'ping';
export const PING_CRON = '*/5 * * * *';

/**
 * Предрасчёт лунного календаря на скользящее окно (см. docs/roadmap/prompts/
 * f3-калькуляторы-и-карта.md требование 3: «18 месяцев вперёд, ежесуточное обновление»).
 * Запускается раз в сутки в 00:10 MSK (21:10 UTC — тот же слот, что и ежедневная генерация
 * гороскопов Ф5, см. docs/architecture/21-техническая-архитектура.md §9).
 *
 * УПРОЩЕНИЕ MVP: каждый прогон пересчитывает ВСЁ окно целиком (idempotent upsert по `date`), а
 * не только новый день на краю окна — при ~550 днях это секунды CPU (root-finding void-of-course
 * на каждый день), приемлемо для раз-в-сутки задачи; инкрементальный пересчёт — оптимизация
 * следующих фаз, а не блокер MVP.
 */
export const ASTRO_CALENDAR_QUEUE = 'astro-calendar-precompute';
export const ASTRO_CALENDAR_CRON = '10 21 * * *';
export const ASTRO_CALENDAR_WINDOW_MONTHS = 18;
const ASTRO_CALENDAR_WINDOW_DAYS = ASTRO_CALENDAR_WINDOW_MONTHS * 31;

/** Асинхронная генерация OG PNG для «поделиться картой» (см. apps/worker/src/share). */
export const SHARE_OG_QUEUE = 'chart-share-og-backfill';
export const SHARE_OG_CRON = '*/1 * * * *';

/**
 * Ф4: асинхронная генерация ИИ-разборов (см. apps/worker/src/llm/generate-report-job.ts,
 * находка [внутренняя-полнота-модель-исполнения] в _work/build/findings/f4.md) — тот же
 * poll-по-статусу паттерн, что SHARE_OG_QUEUE (API пишет status='queued' напрямую в БД, без
 * прямого enqueue в pg-boss — см. заголовок process-pending-shares.ts).
 */
export const AI_REPORT_QUEUE = 'ai-report-generate';
export const AI_REPORT_CRON = '*/1 * * * *';

export function defaultLogger(config: Pick<Config, 'isProduction'>): Logger {
  return pino({ level: config.isProduction ? 'info' : 'warn' });
}

export class Worker {
  status: WorkerStatus = 'stopped';
  private boss: PgBoss | undefined;
  private pool: Pool | undefined;

  constructor(
    private readonly config: Config,
    private readonly logger: Logger = defaultLogger(config),
  ) {}

  async start(): Promise<void> {
    if (!this.config.db.url) {
      this.status = 'degraded';
      this.logger.warn(
        { subsystem: 'db' },
        'infra not configured: db — worker в degraded-режиме, очередь pg-boss не запущена',
      );
      return;
    }

    const boss = new PgBoss(this.config.db.url);
    boss.on('error', (err) => this.logger.error({ err }, 'pg-boss error'));

    const pool = new Pool({ connectionString: this.config.db.url });
    this.pool = pool;
    const db = createDb(pool);
    const ports = createPorts(this.config);
    // Ф4: createPorts() всегда даёт StubLlmProvider (см. doc-комментарий в packages/shared/src/
    // ports/factory.ts) — реальный адаптер накладываем здесь, если LLM_PROVIDER настроен (тот же
    // паттерн, что CachedGeocoder в apps/api/src/route-context.ts).
    const llmProvider: LlmProvider = this.config.llm.driver === 'stub' ? ports.llm : createLlmProviderChain(this.config);
    const chunkRepository = new DrizzleChunkRepository(db);

    await boss.start();
    await boss.createQueue(PING_QUEUE);
    await boss.work<{ startedAt: string }>(PING_QUEUE, async (jobs) => {
      for (const job of jobs) {
        this.logger.info({ jobId: job.id }, 'ping: worker жив');
      }
    });
    await boss.schedule(PING_QUEUE, PING_CRON);

    // Ф3: предрасчёт лунного календаря (astro_calendar, скользящее окно 18 мес., опорная
    // локация — Москва, см. astro-calendar/reference-location.ts).
    await boss.createQueue(ASTRO_CALENDAR_QUEUE);
    await boss.work(ASTRO_CALENDAR_QUEUE, async () => {
      const today = new Date().toISOString().slice(0, 10);
      const window = buildAstroCalendarWindow(today, ASTRO_CALENDAR_WINDOW_DAYS, CALENDAR_REFERENCE_LOCATION);
      await upsertAstroCalendarWindow(db, window);
      this.logger.info({ days: window.length }, 'astro-calendar: окно предрасчитано и записано');
    });
    await boss.schedule(ASTRO_CALENDAR_QUEUE, ASTRO_CALENDAR_CRON);

    // Ф3: асинхронная генерация OG PNG для «поделиться картой» (chart_shares, см.
    // apps/worker/src/share/process-pending-shares.ts) — resvg, не в браузере/API.
    await boss.createQueue(SHARE_OG_QUEUE);
    await boss.work(SHARE_OG_QUEUE, async () => {
      const processed = await processPendingShares(db, ports.storage, this.logger);
      if (processed > 0) this.logger.info({ processed }, 'chart-share-og: PNG сгенерированы');
    });
    await boss.schedule(SHARE_OG_QUEUE, SHARE_OG_CRON);

    // Ф4: генерация ИИ-разборов (ai_reports.status='queued' → 'generating' → 'done'/'failed'/'flagged').
    await boss.createQueue(AI_REPORT_QUEUE);
    await boss.work(AI_REPORT_QUEUE, async () => {
      const processed = await processQueuedAiReports(db, llmProvider, chunkRepository, this.logger);
      if (processed > 0) this.logger.info({ processed }, 'ai-report-generate: разборы обработаны');
    });
    await boss.schedule(AI_REPORT_QUEUE, AI_REPORT_CRON);

    this.boss = boss;
    this.status = 'running';
    this.logger.info(
      { queues: [PING_QUEUE, ASTRO_CALENDAR_QUEUE, SHARE_OG_QUEUE, AI_REPORT_QUEUE] },
      'worker: pg-boss запущен, очереди активны',
    );
  }

  async stop(): Promise<void> {
    if (this.boss) {
      await this.boss.stop();
      this.boss = undefined;
    }
    if (this.pool) {
      await this.pool.end();
      this.pool = undefined;
    }
    this.status = 'stopped';
  }
}
