/**
 * Обёртка над pg-boss с ленивой инициализацией (см. §3 конвенций реализации): импорт этого
 * модуля и сборка процесса не требуют БД. Реальное подключение и регистрация очереди/cron
 * происходят только внутри start(), и только если задан DATABASE_URL — иначе воркер логирует
 * degraded-статус и остаётся живым (не падает), чтобы оркестратор не считал процесс упавшим.
 */
import { PgBoss } from 'pg-boss';
import type { Logger } from 'pino';
import pino from 'pino';
import type { Config } from '@stassist/shared';

export type WorkerStatus = 'stopped' | 'degraded' | 'running';

/** Тестовая задача: раз в 5 минут пишет лог, чтобы подтвердить, что воркер жив. */
export const PING_QUEUE = 'ping';
export const PING_CRON = '*/5 * * * *';

export function defaultLogger(config: Pick<Config, 'isProduction'>): Logger {
  return pino({ level: config.isProduction ? 'info' : 'warn' });
}

export class Worker {
  status: WorkerStatus = 'stopped';
  private boss: PgBoss | undefined;

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

    await boss.start();
    await boss.createQueue(PING_QUEUE);
    await boss.work<{ startedAt: string }>(PING_QUEUE, async (jobs) => {
      for (const job of jobs) {
        this.logger.info({ jobId: job.id }, 'ping: worker жив');
      }
    });
    await boss.schedule(PING_QUEUE, PING_CRON);

    this.boss = boss;
    this.status = 'running';
    this.logger.info(
      { queue: PING_QUEUE, cron: PING_CRON },
      'worker: pg-boss запущен, очередь ping активна',
    );
  }

  async stop(): Promise<void> {
    if (this.boss) {
      await this.boss.stop();
      this.boss = undefined;
    }
    this.status = 'stopped';
  }
}
