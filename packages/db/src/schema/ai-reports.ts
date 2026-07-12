/**
 * ai_reports — сгенерированные ИИ-разборы (см. docs/architecture/22-модель-данных.md §3,
 * docs/architecture/21-техническая-архитектура.md §4). Генерация — асинхронная worker-задача
 * (кроме `kind='big3'`, которую `apps/api` допускает выполнять синхронно из-за лёгкости — см.
 * находку [внутренняя-полнота-модель-исполнения] в f4.md и apps/worker/src/llm/generate-report-job.ts).
 *
 * `cacheKey` = sha256(birthProfileId, kind, sphere?, promptVersion, presetId, coreVersion) — см.
 * packages/llm/src/cache/cache-key.ts (единственный источник правды по формуле; см. находку
 * [корректность-кэша] в f4.md: включает preset_id и core_version, чтобы не течь между
 * пресетами/не отдавать протухший отчёт после апгрейда ядра). Обычный (не уникальный) индекс —
 * приложение само ищет последнюю строку status='done' по cache_key.
 */
import { integer, jsonb, pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';
import { aiReportKindEnum, aiReportStatusEnum } from './enums.js';
import { users } from './users.js';
import { birthProfiles } from './birth-profiles.js';
import { charts } from './charts.js';

export const aiReports = pgTable(
  'ai_reports',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    birthProfileId: uuid('birth_profile_id').references(() => birthProfiles.id, { onDelete: 'cascade' }),
    /** null, пока чарт ещё не посчитан/сохранён (queued) или для custom_question без сохранённого чарта. */
    chartId: uuid('chart_id').references(() => charts.id, { onDelete: 'set null' }),
    kind: aiReportKindEnum('kind').notNull(),
    status: aiReportStatusEnum('status').notNull().default('queued'),
    /** Параметры запроса (sphere/question/partnerBirthProfileId — см. aiReportCreateRequestSchema). */
    input: jsonb('input').notNull(),
    contentMd: text('content_md'),
    /** «Как считали» — блок расчётных данных, которые видел ИИ (незыблемое правило №2 f4-промта). */
    calcBlock: jsonb('calc_block'),
    /** Ключи+версии интерпретационных чанков, реально попавших в промт — аудит качества (см.
     *  находку [внутренняя-полнота-аудит] в f4.md; формируется packages/llm/src/reports/pipeline.ts). */
    chunksUsed: jsonb('chunks_used'),
    promptVersion: text('prompt_version').notNull(),
    /** Версия seed-корпуса, использованная при генерации (см. packages/llm/src/version.ts). */
    corpusVersion: text('corpus_version'),
    provider: text('provider'),
    tokensIn: integer('tokens_in'),
    tokensOut: integer('tokens_out'),
    costMicros: integer('cost_micros'),
    /** S3-ключ PDF (см. ports/object-storage.ts) — null, пока PDF не сгенерирован. */
    pdfKey: text('pdf_key'),
    cacheKey: text('cache_key').notNull(),
    /** Причина status='failed' (для диагностики; НЕ показывается пользователю as-is). */
    errorMessage: text('error_message'),
    completedAt: timestamp('completed_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('ai_reports_cache_key_idx').on(table.cacheKey)],
);
