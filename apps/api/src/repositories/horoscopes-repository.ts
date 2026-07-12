/**
 * Репозиторий `horoscopes` для apps/api (публичное чтение + ленивая генерация, см. requirement 4
 * промта Ф5 «ленивая генерация при заходе»). Дублирует небольшой набор запросов с
 * apps/worker/src/horoscope/repository.ts — тот же прецедент, что apps/worker/src/llm/
 * drizzle-chunk-repository.ts vs apps/api/src/repositories/interpretation-chunks-repository.ts.
 */
import { and, desc, eq } from 'drizzle-orm';
import { horoscopes, type Db } from '@stassist/db';
import type { HoroscopePeriod, HoroscopeScope, HoroscopeStatus, HoroscopeTopic } from '@stassist/shared';
import { extractZachin, type HoroscopeAstroEvents } from '@stassist/llm';

export type HoroscopeRow = typeof horoscopes.$inferSelect;

export interface HoroscopeUniqueKey {
  scope: HoroscopeScope;
  sign: string;
  period: HoroscopePeriod;
  topic: HoroscopeTopic;
  dateKey: string;
  humor: boolean;
}

export async function findHoroscopeByKey(db: Db, key: HoroscopeUniqueKey): Promise<HoroscopeRow | null> {
  const rows = await db
    .select()
    .from(horoscopes)
    .where(
      and(
        eq(horoscopes.scope, key.scope),
        eq(horoscopes.sign, key.sign),
        eq(horoscopes.period, key.period),
        eq(horoscopes.topic, key.topic),
        eq(horoscopes.dateKey, key.dateKey),
        eq(horoscopes.humor, key.humor),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

/** scope='lunar_day' — evergreen, см. doc-комментарий packages/db/src/schema/horoscopes.ts. */
export async function findLunarDayHoroscope(db: Db, dayNumber: string): Promise<HoroscopeRow | null> {
  const rows = await db
    .select()
    .from(horoscopes)
    .where(and(eq(horoscopes.scope, 'lunar_day'), eq(horoscopes.sign, dayNumber), eq(horoscopes.humor, false)))
    .limit(1);
  return rows[0] ?? null;
}

const RECENT_ZACHINS_LIMIT = 7;

export async function findRecentZachins(
  db: Db,
  scope: HoroscopeScope,
  sign: string,
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  humor: boolean,
): Promise<string[]> {
  const rows = await db
    .select({ bodyMd: horoscopes.bodyMd })
    .from(horoscopes)
    .where(
      and(
        eq(horoscopes.scope, scope),
        eq(horoscopes.sign, sign),
        eq(horoscopes.period, period),
        eq(horoscopes.topic, topic),
        eq(horoscopes.humor, humor),
      ),
    )
    .orderBy(desc(horoscopes.dateKey))
    .limit(RECENT_ZACHINS_LIMIT);
  return rows.map((r) => extractZachin(r.bodyMd));
}

export interface UpsertHoroscopeInput extends HoroscopeUniqueKey {
  bodyMd: string;
  astroEvents: HoroscopeAstroEvents;
  status: HoroscopeStatus;
}

/** Идемпотентный upsert — используется ленивой генерацией (см. apps/api/src/horoscope/
 *  lazy-generate.ts): два одновременных запроса на одну и ту же отсутствующую страницу не
 *  создадут дублей (`ON CONFLICT DO UPDATE` по уникальному ключу). */
export async function upsertHoroscope(db: Db, input: UpsertHoroscopeInput): Promise<HoroscopeRow> {
  const [row] = await db
    .insert(horoscopes)
    .values({
      scope: input.scope,
      sign: input.sign,
      period: input.period,
      topic: input.topic,
      dateKey: input.dateKey,
      bodyMd: input.bodyMd,
      humor: input.humor,
      astroEvents: input.astroEvents,
      status: input.status,
      publishedAt: input.status === 'published' ? new Date() : null,
    })
    .onConflictDoUpdate({
      target: [horoscopes.scope, horoscopes.sign, horoscopes.period, horoscopes.topic, horoscopes.dateKey, horoscopes.humor],
      set: {
        bodyMd: input.bodyMd,
        astroEvents: input.astroEvents,
        status: input.status,
        publishedAt: input.status === 'published' ? new Date() : null,
        updatedAt: new Date(),
      },
    })
    .returning();
  if (!row) throw new Error('upsertHoroscope: INSERT/UPDATE не вернул строку');
  return row;
}
