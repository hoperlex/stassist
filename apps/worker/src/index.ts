import { loadConfig } from '@stassist/shared';
import { defaultLogger, Worker } from './worker.js';

async function main(): Promise<void> {
  const config = loadConfig();
  const logger = defaultLogger(config);
  const worker = new Worker(config, logger);

  await worker.start();

  if (worker.status === 'degraded') {
    // Держим процесс живым (event loop активен благодаря таймеру), чтобы docker/systemd не
    // считал воркер упавшим — только в degraded-режиме отсутствует БД, сам процесс жив.
    setInterval(() => {
      logger.debug('worker: heartbeat (degraded, DATABASE_URL не задан)');
    }, 60_000);
  }

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, 'worker: получен сигнал остановки, начинаю graceful shutdown');
    try {
      await worker.stop();
      logger.info('worker: graceful shutdown завершён');
      process.exit(0);
    } catch (err) {
      logger.error({ err }, 'worker: ошибка при graceful shutdown');
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
