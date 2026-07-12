/**
 * wiki_articles — чтение/поиск (публично) + правка редактором (роль editor/admin, версионирование
 * через `wiki_article_revisions`, см. doc-комментарий packages/db/src/schema/wiki-article-revisions.ts).
 */
import { and, desc, eq, sql } from 'drizzle-orm';
import { wikiArticleRevisions, wikiArticles, type Db } from '@stassist/db';
import type { WikiArticleSection, WikiArticleUpdateRequest } from '@stassist/shared';

export type WikiArticleRow = typeof wikiArticles.$inferSelect;
export type WikiArticleRevisionRow = typeof wikiArticleRevisions.$inferSelect;

export async function listArticles(
  db: Db,
  params: { section?: WikiArticleSection; limit: number },
): Promise<WikiArticleRow[]> {
  const where = params.section ? eq(wikiArticles.section, params.section) : undefined;
  return db
    .select()
    .from(wikiArticles)
    .where(where)
    .orderBy(wikiArticles.title)
    .limit(params.limit);
}

/**
 * pg_trgm-поиск (req.4 промта Ф7) по title+body_md — извлекает «значимые» слова запроса (длиной
 * ≥3, см. `extractSignificantWords` — ЧИСТАЯ функция, unit-тестируется отдельно) и ищет строки,
 * где title/body_md содержат хотя бы одно из них (ILIKE, регистронезависимо), сортируя по
 * триграммному сходству ЦЕЛОГО запроса (`similarity()`, использует GIN-индекс
 * `wiki_articles_search_trgm_idx`). Комбинация ILIKE (recall) + similarity-сортировка (ranking) —
 * находит статью даже когда пользователь ищет фразу вида «Венера в Скорпионе», которой нет
 * буквально ни в одном заголовке (см. doc-комментарий gen-wiki.ts — статьи описывают архетипы, не
 * все 240 сочетаний).
 */
export function extractSignificantWords(query: string): string[] {
  return [...new Set(query.toLowerCase().split(/[^a-zа-яё0-9]+/iu).filter((w) => w.length >= 3))];
}

export async function searchArticles(db: Db, params: { q: string; section?: WikiArticleSection; limit: number }): Promise<WikiArticleRow[]> {
  const words = extractSignificantWords(params.q);
  if (words.length === 0) return [];

  const wordConditions = words.map(
    (w) => sql`(${wikiArticles.title} ILIKE ${'%' + w + '%'} OR ${wikiArticles.bodyMd} ILIKE ${'%' + w + '%'})`,
  );
  const combined = sql.join(wordConditions, sql` OR `);
  const sectionFilter = params.section ? and(eq(wikiArticles.section, params.section), combined) : combined;

  return db
    .select()
    .from(wikiArticles)
    .where(sectionFilter)
    .orderBy(desc(sql`similarity(${wikiArticles.title} || ' ' || coalesce(${wikiArticles.bodyMd}, ''), ${params.q})`))
    .limit(params.limit);
}

export async function getArticleBySlug(db: Db, slug: string): Promise<WikiArticleRow | null> {
  const rows = await db.select().from(wikiArticles).where(eq(wikiArticles.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getArticleById(db: Db, id: string): Promise<WikiArticleRow | null> {
  const rows = await db.select().from(wikiArticles).where(eq(wikiArticles.id, id)).limit(1);
  return rows[0] ?? null;
}

/** Правка редактора: снимает снимок ПРЕДЫДУЩЕЙ версии в `wiki_article_revisions` ПЕРЕД
 *  обновлением строки (см. заголовок wiki-article-revisions.ts) — атомарно в транзакции. */
export async function updateArticle(
  db: Db,
  slug: string,
  editorId: string,
  input: WikiArticleUpdateRequest,
): Promise<WikiArticleRow | null> {
  return db.transaction(async (tx) => {
    const rows = await tx.select().from(wikiArticles).where(eq(wikiArticles.slug, slug)).limit(1);
    const current = rows[0];
    if (!current) return null;

    await tx.insert(wikiArticleRevisions).values({
      articleId: current.id,
      version: current.version,
      title: current.title,
      bodyMd: current.bodyMd,
      editorId: current.editorId,
    });

    const [updated] = await tx
      .update(wikiArticles)
      .set({
        title: input.title ?? current.title,
        bodyMd: input.bodyMd ?? current.bodyMd,
        status: input.status ?? current.status,
        editorId,
        version: current.version + 1,
        updatedAt: new Date(),
      })
      .where(eq(wikiArticles.id, current.id))
      .returning();
    return updated ?? null;
  });
}

export async function listRevisions(db: Db, articleId: string): Promise<WikiArticleRevisionRow[]> {
  return db
    .select()
    .from(wikiArticleRevisions)
    .where(eq(wikiArticleRevisions.articleId, articleId))
    .orderBy(desc(wikiArticleRevisions.version));
}
