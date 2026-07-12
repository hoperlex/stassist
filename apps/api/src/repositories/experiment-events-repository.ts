/**
 * experiment_events — журнал A/B-экспозиций/конверсий (см. packages/db/src/schema/
 * experiment-events.ts). Назначение варианта — детерминированная ЧИСТАЯ функция
 * `assignPaywallVariant` (packages/shared/src/schemas/paywall.ts), эта таблица только пишет
 * события метрик, не хранит назначение.
 */
import { experimentEvents, type Db } from '@stassist/db';

export type ExperimentEventRow = typeof experimentEvents.$inferSelect;

export interface InsertExperimentEventInput {
  userId?: string | null;
  anonId?: string | null;
  experimentCode: string;
  variant: string;
  event: 'exposed' | 'converted';
  meta?: Record<string, unknown>;
}

export async function insertExperimentEvent(db: Db, input: InsertExperimentEventInput): Promise<void> {
  await db.insert(experimentEvents).values({
    userId: input.userId ?? null,
    anonId: input.anonId ?? null,
    experimentCode: input.experimentCode,
    variant: input.variant,
    event: input.event,
    meta: input.meta ?? {},
  });
}
