/**
 * Асинхронная генерация OG PNG для `chart_shares` без `og_image_key` (см. docs/architecture/
 * 21-техническая-архитектура.md §6, packages/db/src/schema/chart-shares.ts). Оркестрация
 * (DB+ObjectStorage) — не юнит-тестируется (см. §1 конвенций реализации); чистые части
 * (build-share-svg.ts, render-og-png.ts) покрыты unit-тестами отдельно.
 *
 * Триггер — периодический pg-boss cron в worker.ts (НЕ прямой enqueue из apps/api: api не
 * держит соединения к pg-boss, только к Postgres через drizzle — см. route-context.ts). Это
 * означает публикацию OG-картинки с задержкой до одного тика cron (см. отчёт фазы, раздел
 * «механизм OG-шеринга» — задержка публикации отделена от времени самой генерации PNG, ≤2 с).
 */
import type { Logger } from 'pino';
import type { Db } from '@stassist/db';
import type { ObjectStorage } from '@stassist/shared';
import { svgToPngBuffer } from '../og/render-og-png.js';
import { buildShareChartWheelInput, composeTransitDayShareSvg } from './build-share-svg.js';
import { findPendingChartShares, markOgImageGenerated } from './chart-shares-repository.js';
import { renderChartWheelSvg } from '@stassist/ui/render';

export function ogImageKeyFor(slug: string): string {
  return `og/${slug}.png`;
}

export async function processPendingShares(db: Db, storage: ObjectStorage, logger: Logger): Promise<number> {
  const pending = await findPendingChartShares(db);
  let processed = 0;
  for (const row of pending) {
    try {
      const wheelInput = buildShareChartWheelInput({
        kind: row.kind,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb из БД не типизирован на границе
        positions: row.positions as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        positionsB: row.positionsB as any,
        theme: row.theme === 'dark' ? 'dark' : 'light',
      });
      const wheelSvg = renderChartWheelSvg(wheelInput);
      // Ф9: карточка «Небо дня» с подписью — OG-компоновка 1200×630 (колесо + текст отклика).
      const svg =
        row.kind === 'transit_day' && row.caption
          ? composeTransitDayShareSvg(wheelSvg, row.caption, row.theme === 'dark' ? 'dark' : 'light')
          : wheelSvg;
      const png = svgToPngBuffer(svg, { width: 1200, backgroundColor: row.theme === 'dark' ? '#1a1730' : '#ffffff' });
      const key = ogImageKeyFor(row.slug);
      await storage.put(key, png, 'image/png');
      await markOgImageGenerated(db, row.id, key);
      processed += 1;
    } catch (err) {
      logger.error({ err, slug: row.slug }, 'share: не удалось сгенерировать OG PNG');
    }
  }
  return processed;
}
