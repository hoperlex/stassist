import { loadConfig } from '@stassist/shared';
import { buildApp } from './app.js';
import { closeDb } from './db.js';

async function main(): Promise<void> {
  const config = loadConfig();
  const app = await buildApp({ config });

  if (config.degraded.length > 0) {
    app.log.warn(
      { degraded: config.degraded },
      `infra not configured: ${config.degraded.join(', ')} — процесс в degraded-режиме`,
    );
  }

  await app.listen({ port: config.api.port, host: '0.0.0.0' });

  let shuttingDown = false;
  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    app.log.info({ signal }, 'получен сигнал остановки, начинаю graceful shutdown');
    try {
      // app.close() ждёт завершения активных запросов (см. forceCloseConnections: 'idle'
      // в app.ts) и прогоняет onClose-хуки плагинов, прежде чем сервер перестанет отвечать.
      await app.close();
      await closeDb();
      app.log.info('graceful shutdown завершён');
      process.exit(0);
    } catch (err) {
      app.log.error({ err }, 'ошибка при graceful shutdown');
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
