/**
 * Ф7 M8 — сквозные интеграционные проверки промта («Верификация»):
 *  - пост с картой → комментарий-разбор → отметка «полезно» → репутация выросла;
 *  - тест анонимизации: JSON опубликованной карты не содержит ПД (дублирует unit-тест calc.test.ts
 *    целостным сквозным потоком через реальную БД — «дважды проверено», см. корневой CLAUDE.md);
 *  - жалоба → пост в очереди модератора → решение;
 *  - премодерация первых 3 постов новичка;
 *  - друзья: односторонний шеринг карты → синастрия НЕДОСТУПНА; взаимный → доступна.
 * Требует DATABASE_URL — авто-skip. Предпосылка: миграции + calc_presets + db:seed применены.
 */
import { describe, expect, it, afterAll } from 'vitest';
import { Pool } from 'pg';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig, randomTestEmail } from '../test-helpers/integration.js';

describe.skipIf(!process.env.DATABASE_URL)('коммьюнити Ф7 (integration)', () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  afterAll(async () => {
    await pool.end();
    await closeDb();
  });

  async function registerAndLogin(app: Awaited<ReturnType<typeof buildApp>>) {
    const email = randomTestEmail();
    const password = 'correct-horse-3';
    await app.inject({ method: 'POST', url: '/api/v1/auth/register', payload: { email, password } });
    const loginRes = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password } });
    const { accessToken, user } = loginRes.json() as { accessToken: string; user: { id: string } };
    return { accessToken, userId: user.id, email, password };
  }

  /** JWT несёт роль КАК СНИМОК на момент логина (см. auth/jwt.ts) — смена роли в БД не обновляет
   *  уже выданный access-токен. Для тестов, где роль меняется ПОСЛЕ первого логина (типичный кейс
   *  «сделать пользователя модератором»), нужен повторный логин, чтобы токен подхватил новую роль. */
  async function reLogin(app: Awaited<ReturnType<typeof buildApp>>, email: string, password: string): Promise<string> {
    const res = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password } });
    return (res.json() as { accessToken: string }).accessToken;
  }

  async function createProfileWithChart(app: Awaited<ReturnType<typeof buildApp>>, accessToken: string) {
    await app.inject({ method: 'POST', url: '/api/v1/consents', headers: { authorization: `Bearer ${accessToken}` }, payload: { kind: 'pd_processing' } });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/birth-profiles',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: {
        label: 'Я',
        birthDate: '1990-05-17',
        birthTime: '14:30',
        timeUnknown: false,
        place: { placeName: 'Москва, Россия', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
      },
    });
    expect(res.statusCode).toBe(200);
    return (res.json() as { id: string }).id;
  }

  it('пост с картой не содержит ПД, комментарий-разбор → «полезно» → репутация растёт', async () => {
    const config = buildTestConfig();
    const appAuthor = await buildApp({ config });
    const appReviewer = await buildApp({ config });
    const author = await registerAndLogin(appAuthor);
    const reviewer = await registerAndLogin(appReviewer);
    const profileId = await createProfileWithChart(appAuthor, author.accessToken);

    const postRes = await appAuthor.inject({
      method: 'POST',
      url: '/api/v1/posts',
      headers: { authorization: `Bearer ${author.accessToken}` },
      payload: { kind: 'chart_review_request', title: 'Разберите мою карту', bodyMd: 'Что скажете про Солнце в 3 доме?', birthProfileId: profileId },
    });
    expect(postRes.statusCode).toBe(200);
    const post = postRes.json() as { id: string; chart: unknown; moderation: string };
    expect(post.moderation).toBe('pending'); // первый пост новичка — премодерация

    // Тест анонимизации (сквозной, через реальную БД): в JSON карты нет ПД — ни исходной даты/
    // места/времени рождения, ни ключей input/kind вообще.
    const chartJson = JSON.stringify(post.chart);
    expect(chartJson).not.toContain('1990-05-17');
    expect(chartJson).not.toContain('55.7558');
    expect(chartJson).not.toContain('37.6173');
    expect(chartJson).not.toContain('Europe/Moscow');
    expect(chartJson).not.toContain('Москва');
    expect(post.chart).not.toHaveProperty('input');
    expect(post.chart).toHaveProperty('bodies');

    // Модератор одобряет пост, чтобы дальнейший поток (комментарии/репутация) шёл по «обычному» пути.
    await pool.query("UPDATE users SET role = 'moderator' WHERE id = $1", [reviewer.userId]);
    const moderatorToken = await reLogin(appReviewer, reviewer.email, reviewer.password);
    const approveRes = await appReviewer.inject({
      method: 'PATCH',
      url: `/api/v1/moderation/posts/${post.id}`,
      headers: { authorization: `Bearer ${moderatorToken}` },
      payload: { action: 'approve' },
    });
    expect(approveRes.statusCode).toBe(200);

    const commentRes = await appReviewer.inject({
      method: 'POST',
      url: `/api/v1/posts/${post.id}/comments`,
      headers: { authorization: `Bearer ${reviewer.accessToken}` },
      payload: { bodyMd: 'Солнце в 3 доме — общительность и живой ум, разбор...' },
    });
    expect(commentRes.statusCode).toBe(200);
    const comment = commentRes.json() as { id: string };

    // Уведомление автору поста создано.
    const notifRes = await appAuthor.inject({ method: 'GET', url: '/api/v1/notifications', headers: { authorization: `Bearer ${author.accessToken}` } });
    const notifs = (notifRes.json() as { items: Array<{ kind: string }> }).items;
    expect(notifs.some((n) => n.kind === 'comment_reply')).toBe(true);

    const repBefore = await appReviewer.inject({ method: 'GET', url: '/api/v1/reputation/mine', headers: { authorization: `Bearer ${reviewer.accessToken}` } });
    expect((repBefore.json() as { score: number }).score).toBe(0);

    const usefulRes = await appAuthor.inject({
      method: 'PATCH',
      url: `/api/v1/posts/${post.id}/comments/${comment.id}/mark-useful`,
      headers: { authorization: `Bearer ${author.accessToken}` },
    });
    expect(usefulRes.statusCode).toBe(200);

    const repAfter = await appReviewer.inject({ method: 'GET', url: '/api/v1/reputation/mine', headers: { authorization: `Bearer ${reviewer.accessToken}` } });
    expect((repAfter.json() as { score: number }).score).toBeGreaterThan(0);

    await appAuthor.close();
    await appReviewer.close();
  });

  it('жалоба на пост → появляется в очереди модератора → решение снимает её из очереди', async () => {
    const config = buildTestConfig();
    const appPoster = await buildApp({ config });
    const appReporter = await buildApp({ config });
    const appModerator = await buildApp({ config });
    const poster = await registerAndLogin(appPoster);
    const reporter = await registerAndLogin(appReporter);
    const moderator = await registerAndLogin(appModerator);
    await pool.query("UPDATE users SET role = 'moderator' WHERE id = $1", [moderator.userId]);
    moderator.accessToken = await reLogin(appModerator, moderator.email, moderator.password);

    const postRes = await appPoster.inject({
      method: 'POST',
      url: '/api/v1/posts',
      headers: { authorization: `Bearer ${poster.accessToken}` },
      payload: { kind: 'discussion', title: 'Обсуждение', bodyMd: 'Просто текст без нарушений.' },
    });
    const post = postRes.json() as { id: string };

    const reportRes = await appReporter.inject({
      method: 'POST',
      url: '/api/v1/reports-ugc',
      headers: { authorization: `Bearer ${reporter.accessToken}` },
      payload: { entity: 'post', entityId: post.id, reason: 'insult' },
    });
    expect(reportRes.statusCode).toBe(200);

    const reportsRes = await appModerator.inject({ method: 'GET', url: '/api/v1/moderation/reports', headers: { authorization: `Bearer ${moderator.accessToken}` } });
    const reportItems = (reportsRes.json() as { items: Array<{ id: string; entityId: string }> }).items;
    const found = reportItems.find((r) => r.entityId === post.id);
    expect(found).toBeTruthy();

    const resolveRes = await appModerator.inject({
      method: 'PATCH',
      url: `/api/v1/moderation/reports/${found!.id}`,
      headers: { authorization: `Bearer ${moderator.accessToken}` },
      payload: { status: 'dismissed' },
    });
    expect(resolveRes.statusCode).toBe(200);

    const reportsAfter = await appModerator.inject({ method: 'GET', url: '/api/v1/moderation/reports', headers: { authorization: `Bearer ${moderator.accessToken}` } });
    const itemsAfter = (reportsAfter.json() as { items: Array<{ id: string }> }).items;
    expect(itemsAfter.some((r) => r.id === found!.id)).toBe(false);

    // Обычный пользователь НЕ может открыть очередь модератора.
    const forbidden = await appReporter.inject({ method: 'GET', url: '/api/v1/moderation/reports', headers: { authorization: `Bearer ${reporter.accessToken}` } });
    expect(forbidden.statusCode).toBe(403);

    await appPoster.close();
    await appReporter.close();
    await appModerator.close();
  });

  it('премодерация: первые 3 поста новичка pending, дальше — approved (без нарушений)', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const user = await registerAndLogin(app);

    const moderations: string[] = [];
    for (let i = 0; i < 4; i++) {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/posts',
        headers: { authorization: `Bearer ${user.accessToken}` },
        payload: { kind: 'discussion', title: `Пост ${i}`, bodyMd: 'Обычный текст без нарушений правил.' },
      });
      const post = res.json() as { id: string; moderation: string };
      moderations.push(post.moderation);
      if (post.moderation === 'pending') {
        await pool.query("UPDATE posts SET moderation = 'approved' WHERE id = $1", [post.id]);
      }
    }
    expect(moderations.slice(0, 3)).toEqual(['pending', 'pending', 'pending']);
    expect(moderations[3]).toBe('approved');

    await app.close();
  });

  it('друзья: односторонний шеринг → синастрия недоступна; взаимный → доступна', async () => {
    const config = buildTestConfig();
    const appA = await buildApp({ config });
    const appB = await buildApp({ config });
    const a = await registerAndLogin(appA);
    const b = await registerAndLogin(appB);
    await createProfileWithChart(appA, a.accessToken);
    await createProfileWithChart(appB, b.accessToken);

    const reqRes = await appA.inject({ method: 'POST', url: '/api/v1/friendships', headers: { authorization: `Bearer ${a.accessToken}` }, payload: { friendId: b.userId } });
    const friendship = reqRes.json() as { id: string };

    await appB.inject({ method: 'PATCH', url: `/api/v1/friendships/${friendship.id}/accept`, headers: { authorization: `Bearer ${b.accessToken}` } });

    await appA.inject({ method: 'PATCH', url: `/api/v1/friendships/${friendship.id}/share`, headers: { authorization: `Bearer ${a.accessToken}` }, payload: { shared: true } });

    const oneSided = await appA.inject({ method: 'GET', url: `/api/v1/friendships/${friendship.id}/synastry`, headers: { authorization: `Bearer ${a.accessToken}` } });
    expect((oneSided.json() as { computed: boolean; reason: string }).computed).toBe(false);
    expect((oneSided.json() as { computed: boolean; reason: string }).reason).toBe('not_mutually_shared');

    await appB.inject({ method: 'PATCH', url: `/api/v1/friendships/${friendship.id}/share`, headers: { authorization: `Bearer ${b.accessToken}` }, payload: { shared: true } });

    const mutual = await appA.inject({ method: 'GET', url: `/api/v1/friendships/${friendship.id}/synastry`, headers: { authorization: `Bearer ${a.accessToken}` } });
    const mutualBody = mutual.json() as { computed: boolean; crossAspects: unknown[] };
    expect(mutualBody.computed).toBe(true);
    expect(Array.isArray(mutualBody.crossAspects)).toBe(true);

    await appA.close();
    await appB.close();
  });
});
