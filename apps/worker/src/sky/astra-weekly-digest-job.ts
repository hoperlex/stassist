/**
 * Недельный дайджест Астры (Ф9, решение заказчика: «ИИ-участник — тред дня + дайджест»,
 * см. docs/strategy/11-соцраздел-созвездие.md §1, §5): по воскресеньям Астра публикует в треде
 * сегодняшнего дня комментарий-итог недели — сколько откликов, как распределились вердикты,
 * сколько заметок. Оживляет тишину малого сообщества («не сжать поток, а дать повод вернуться»).
 *
 * Текст — ДЕТЕРМИНИРОВАННЫЙ (агрегаты, без LLM): дайджест обязан быть точным по цифрам, а не
 * «правдоподобным». Маркировка — `author_kind='ai'`. Идемпотентность — по маркеру-префиксу в
 * bodyMd среди комментариев Астры сегодняшнего треда.
 */
import { and, eq, gte, like, sql } from 'drizzle-orm';
import type { Logger } from 'pino';
import { comments, posts, skyCheckins, skyDays, type Db } from '@stassist/db';
import { ASTRA_USER_ID, addDays, mskNow, toDateKeyDay } from '@stassist/shared';

export interface AstraDigestDeps {
  db: Db;
  logger: Logger;
}

const DIGEST_MARKER = 'Итоги недели под этим небом';

function pluralRu(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/** @returns true — дайджест опубликован этим прогоном (false — не воскресный контекст/уже есть/нет треда). */
export async function publishAstraWeeklyDigest(deps: AstraDigestDeps, now = new Date()): Promise<boolean> {
  const msk = mskNow(now);
  const todayKey = toDateKeyDay(msk);
  const weekAgoKey = toDateKeyDay(addDays(msk, -6));

  const dayRows = await deps.db.select().from(skyDays).where(eq(skyDays.dayKey, todayKey)).limit(1);
  const today = dayRows[0];
  if (!today?.threadPostId) {
    deps.logger.warn({ todayKey }, 'astra-digest: нет треда сегодняшнего дня — дайджест пропущен');
    return false;
  }

  const already = await deps.db
    .select({ id: comments.id })
    .from(comments)
    .where(
      and(
        eq(comments.postId, today.threadPostId),
        eq(comments.authorId, ASTRA_USER_ID),
        like(comments.bodyMd, `${DIGEST_MARKER}%`),
      ),
    )
    .limit(1);
  if (already.length > 0) return false;

  const weekCheckins = await deps.db
    .select({ verdict: skyCheckins.verdict, note: skyCheckins.note })
    .from(skyCheckins)
    .where(gte(skyCheckins.dayKey, weekAgoKey));

  const total = weekCheckins.length;
  const hit = weekCheckins.filter((c) => c.verdict === 'hit').length;
  const notes = weekCheckins.filter((c) => c.note !== null).length;

  const body =
    total === 0
      ? `${DIGEST_MARKER}: неделя прошла тихо — ни одного отклика. Станьте первым, кто отметит, как небо отзывается лично у вас: чек-ин занимает три секунды.`
      : `${DIGEST_MARKER}: за неделю ${total} ${pluralRu(total, 'отклик', 'отклика', 'откликов')}, ` +
        `${Math.round((hit / total) * 100)}% — «в точку», заметок — ${notes}. ` +
        'Спасибо всем, кто живёт по небу вместе с нами. Новая неделя — новые транзиты.';

  await deps.db.insert(comments).values({
    postId: today.threadPostId,
    authorId: ASTRA_USER_ID,
    authorKind: 'ai',
    bodyMd: body,
    status: 'published',
    moderation: 'approved',
  });
  await deps.db
    .update(posts)
    .set({ commentsCount: sql`${posts.commentsCount} + 1`, updatedAt: new Date() })
    .where(eq(posts.id, today.threadPostId));

  deps.logger.info({ todayKey, total }, 'astra-digest: недельный дайджест опубликован');
  return true;
}
