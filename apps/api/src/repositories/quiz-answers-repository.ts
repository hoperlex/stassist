/**
 * quiz_answers — см. packages/db/src/schema/quiz-answers.ts. Один пользователь может пройти квиз
 * повторно (пере-пройти) — upsert по (userId, quizCode) через ручной select+insert/update
 * (составного уникального констрейнта в схеме нет намеренно — квиз редко проходят повторно,
 * простая проверка «на глаз» не оправдывает миграцию с доп. constraint).
 */
import { and, desc, eq } from 'drizzle-orm';
import { quizAnswers, type Db } from '@stassist/db';

export type QuizAnswersRow = typeof quizAnswers.$inferSelect;

export async function findLatestQuizAnswers(db: Db, userId: string, quizCode: string): Promise<QuizAnswersRow | null> {
  const rows = await db
    .select()
    .from(quizAnswers)
    .where(and(eq(quizAnswers.userId, userId), eq(quizAnswers.quizCode, quizCode)))
    .orderBy(desc(quizAnswers.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

export interface UpsertQuizAnswersInput {
  userId: string;
  quizCode: string;
  answers: Record<string, string>;
}

/** Пере-прохождение квиза обновляет существующую строку (если есть), иначе создаёт новую —
 *  избегаем накопления мусора при повторных отправках формы. */
export async function upsertQuizAnswers(db: Db, input: UpsertQuizAnswersInput): Promise<QuizAnswersRow> {
  const existing = await findLatestQuizAnswers(db, input.userId, input.quizCode);
  if (existing) {
    const [row] = await db
      .update(quizAnswers)
      .set({ answers: input.answers, completedAt: new Date(), updatedAt: new Date() })
      .where(eq(quizAnswers.id, existing.id))
      .returning();
    if (!row) throw new Error('upsertQuizAnswers: UPDATE не вернул строку');
    return row;
  }
  const [row] = await db
    .insert(quizAnswers)
    .values({ userId: input.userId, quizCode: input.quizCode, answers: input.answers, completedAt: new Date() })
    .returning();
  if (!row) throw new Error('upsertQuizAnswers: INSERT не вернул строку');
  return row;
}
