/**
 * chart_shares — анонимные снапшоты карт для OG-шеринга (кнопка «поделиться» на калькуляторах).
 *
 * НЕ упомянута в docs/architecture/22-модель-данных.md как отдельная таблица — введена Ф3, чтобы
 * разрешить найденное верификацией противоречие («нет постоянного URL/og:image», см.
 * _work/build/findings/f3.md, [internal-completeness] «Механика OG-шеринга противоречит…»):
 * анонимный расчёт НЕ сохраняется (§ требование 4 промта — «без сохранения ПД»), но у
 * расшариваемой ссылки должен быть постоянный URL, доступный краулеру.
 *
 * Решение: по кнопке «поделиться» создаётся запись с ОБЕЗЛИЧЕННЫМ срезом результата —
 * `positions` (см. `SharePositions` в packages/shared/src/schemas/calc.ts: только bodies/points/
 * angles/houses/aspects, БЕЗ input/даты/времени/места рождения) — прямой аналог
 * `posts.chart_id` → «анонимизированная копия» (docs/architecture/22-модель-данных.md §7). Слаг —
 * детерминированный хэш от `positions` (см. apps/api/src/share/slug.ts): повторный шеринг ТОГО ЖЕ
 * результата отдаёт тот же URL (дедупликация, не плодит записи).
 *
 * PNG для og:image генерируется АСИНХРОННО worker'ом (resvg, см. apps/worker/src/og) и кладётся
 * в ObjectStorage под ключом `og_image_key`; SSR-страница `/podelitsya/{slug}` отдаёт
 * `og:image`, ссылающийся на `GET /api/v1/share/:slug/og.png` — эндпоинт умеет и лениво
 * сгенерировать PNG при первом холодном запросе (см. apps/api/src/routes/share.ts), если worker
 * ещё не успел (устраняет гонку «краулер обошёл раньше воркера»).
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shareKindEnum } from './enums.js';

export const chartShares = pgTable('chart_shares', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  kind: shareKindEnum('kind').notNull(),
  /** `SharePositions` (карта A) — см. packages/shared/src/schemas/calc.ts. */
  positions: jsonb('positions').notNull(),
  /** `SharePositions` карты B — только для kind='synastry'. */
  positionsB: jsonb('positions_b'),
  theme: text('theme').notNull().default('light'),
  /** Ключ PNG в ObjectStorage (`og/<slug>.png`) — null, пока не сгенерирован. */
  ogImageKey: text('og_image_key'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
