/**
 * Ф9 «Созвездие» — сквозные интеграционные проверки «Неба дня» (см. docs/strategy/
 * 11-соцраздел-созвездие.md, раздел «Верификация» плана):
 *  - публичный день + агрегаты; чек-ин с заметкой → комментарий в треде → стрик=1 →
 *    повторный чек-ин идемпотентен (смена вердикта, стрик не растёт);
 *  - заметка с запрещённым текстом → комментарий уходит в премодерацию;
 *  - GET /me: проекция посчитана, ответ не содержит ПД;
 *  - чек-ин за «не сегодня» → 400; POST /posts kind='sky_day' → 400;
 *  - share transit_day с caption: roundtrip + флаг классификатора → 400.
 * Требует DATABASE_URL — авто-skip. Предпосылка: миграции применены (0009 + сид Астры 0016 —
 * тест сам страхует наличие Астры идемпотентным INSERT).
 */
import { describe, expect, it, afterAll, beforeAll } from 'vitest';
import { Pool } from 'pg';
import { ASTRA_USER_ID, mskNow, toDateKeyDay, type SharePositions } from '@stassist/shared';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig, randomTestEmail } from '../test-helpers/integration.js';

function pos(longitudeDeg: number) {
  return {
    longitudeDeg,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex: Math.floor(longitudeDeg / 30),
    signDegree: longitudeDeg % 30,
    houseNumber: null,
  };
}

const transitPositions: SharePositions = {
  bodies: {
    sun: pos(10), moon: pos(100), mercury: pos(15), venus: pos(200), mars: pos(280),
    jupiter: pos(340), saturn: pos(60), uranus: pos(130), neptune: pos(150), pluto: pos(170),
  },
  points: {},
  angles: { ascDeg: 0, mcDeg: 0, dscDeg: 0, icDeg: 0, armcDeg: 0, vertexDeg: null },
  houses: [],
  aspects: [],
  meta: { houseSystem: 'placidus', zodiac: 'tropical', noHouses: true },
};

const payload = {
  event: { kind: 'ingress', body: 'mars', signIndex: 6 },
  notableAspects: [],
  moonSignIndex: 4,
  lunarDay: 12,
  phaseName: 'waxing_gibbous',
  retrogradeBodies: [],
};

describe.skipIf(!process.env.DATABASE_URL)('«Небо дня» Ф9 (integration)', () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const todayKey = toDateKeyDay(mskNow(new Date()));
  let threadPostId: string;

  beforeAll(async () => {
    // Страховка сидов: Астра (0016) может быть не применена в тестовой БД — идемпотентно.
    await pool.query(
      `INSERT INTO users (id, email, password_hash, display_name) VALUES ($1, 'astra@system.zodiacum.invalid', '!system-account-no-login', 'Астра')
       ON CONFLICT (id) DO NOTHING`,
      [ASTRA_USER_ID],
    );
    const postRes = await pool.query(
      `INSERT INTO posts (author_id, author_kind, kind, title, body_md, status, moderation)
       VALUES ($1, 'ai', 'sky_day', $2, 'Текст дня.', 'published', 'approved') RETURNING id`,
      [ASTRA_USER_ID, `Небо дня: интеграционный тест ${todayKey}`],
    );
    threadPostId = (postRes.rows[0] as { id: string }).id;
    // Фикстура дня: upsert на СЕГОДНЯ (повторный прогон теста перепривязывает тред).
    await pool.query(
      `INSERT INTO sky_days (day_key, title, summary_md, payload, transit_positions, thread_post_id)
       VALUES ($1, 'Марс входит в знак Весов', 'Сегодня Марс меняет знак.', $2, $3, $4)
       ON CONFLICT (day_key) DO UPDATE SET thread_post_id = EXCLUDED.thread_post_id, payload = EXCLUDED.payload, transit_positions = EXCLUDED.transit_positions`,
      [todayKey, JSON.stringify(payload), JSON.stringify(transitPositions), threadPostId],
    );
  });

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
    return { accessToken, userId: user.id };
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
  }

  it('публичный день → чек-ин с заметкой → комментарий в треде → стрик=1 → идемпотентность', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const user = await registerAndLogin(app);

    const dayRes = await app.inject({ method: 'GET', url: '/api/v1/sky/today' });
    expect(dayRes.statusCode).toBe(200);
    const day = dayRes.json() as { dayKey: string; title: string; threadPostId: string; aggregates: { total: number } };
    expect(day.dayKey).toBe(todayKey);
    expect(day.threadPostId).toBe(threadPostId);
    const totalBefore = day.aggregates.total;

    const checkinRes = await app.inject({
      method: 'POST',
      url: '/api/v1/sky/checkins',
      headers: { authorization: `Bearer ${user.accessToken}` },
      payload: { dayKey: todayKey, verdict: 'hit', note: 'Действительно день перемен — в точку.' },
    });
    expect(checkinRes.statusCode).toBe(200);
    const checkin = checkinRes.json() as {
      checkin: { verdict: string; noteCommentId: string | null };
      streak: { current: number; best: number };
      noteModerationPending: boolean;
    };
    expect(checkin.checkin.verdict).toBe('hit');
    expect(checkin.checkin.noteCommentId).not.toBeNull();
    expect(checkin.streak.current).toBe(1);
    expect(checkin.noteModerationPending).toBe(false);

    // Заметка видна в треде дня как обычный комментарий (публичный GET).
    const commentsRes = await app.inject({ method: 'GET', url: `/api/v1/posts/${threadPostId}/comments` });
    const comments = (commentsRes.json() as { items: Array<{ id: string; bodyMd: string }> }).items;
    expect(comments.some((c) => c.id === checkin.checkin.noteCommentId)).toBe(true);

    // Агрегаты выросли.
    const dayAfter = (await app.inject({ method: 'GET', url: '/api/v1/sky/today' })).json() as { aggregates: { total: number; hit: number } };
    expect(dayAfter.aggregates.total).toBe(totalBefore + 1);

    // Повторный чек-ин того же дня: вердикт меняется, стрик НЕ растёт, заметка не дублируется.
    const repeatRes = await app.inject({
      method: 'POST',
      url: '/api/v1/sky/checkins',
      headers: { authorization: `Bearer ${user.accessToken}` },
      payload: { dayKey: todayKey, verdict: 'partial' },
    });
    const repeat = repeatRes.json() as { checkin: { verdict: string; noteCommentId: string | null }; streak: { current: number } };
    expect(repeat.checkin.verdict).toBe('partial');
    expect(repeat.streak.current).toBe(1);
    expect(repeat.checkin.noteCommentId).toBe(checkin.checkin.noteCommentId);
    const dayAfterRepeat = (await app.inject({ method: 'GET', url: '/api/v1/sky/today' })).json() as { aggregates: { total: number } };
    expect(dayAfterRepeat.aggregates.total).toBe(totalBefore + 1);

    await app.close();
  });

  it('заметка с запрещённым текстом уходит в премодерацию (noteModerationPending)', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const user = await registerAndLogin(app);

    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/sky/checkins',
      headers: { authorization: `Bearer ${user.accessToken}` },
      payload: { dayKey: todayKey, verdict: 'miss', note: 'Вижу по карте: вы скоро умрёте от болезни.' },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json() as { noteModerationPending: boolean; checkin: { noteCommentId: string | null } };
    expect(body.noteModerationPending).toBe(true);
    // Публично комментарий НЕ виден (pending).
    const commentsRes = await app.inject({ method: 'GET', url: `/api/v1/posts/${threadPostId}/comments` });
    const comments = (commentsRes.json() as { items: Array<{ id: string }> }).items;
    expect(comments.some((c) => c.id === body.checkin.noteCommentId)).toBe(false);

    await app.close();
  });

  it('GET /me: проекция посчитана из snapshot, ответ без ПД; без профиля — честный no_profile', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const user = await registerAndLogin(app);

    const before = await app.inject({ method: 'GET', url: `/api/v1/sky/days/${todayKey}/me`, headers: { authorization: `Bearer ${user.accessToken}` } });
    expect((before.json() as { computed: boolean; reason: string }).computed).toBe(false);
    expect((before.json() as { reason: string }).reason).toBe('no_profile');

    await createProfileWithChart(app, user.accessToken);
    const after = await app.inject({ method: 'GET', url: `/api/v1/sky/days/${todayKey}/me`, headers: { authorization: `Bearer ${user.accessToken}` } });
    expect(after.statusCode).toBe(200);
    const me = after.json() as { computed: boolean; aspects: unknown[]; summary: string | null; streak: { current: number } };
    expect(me.computed).toBe(true);
    expect(me.aspects.length).toBeGreaterThan(0);
    expect(me.summary).toBeTruthy();
    // Тест отсутствия ПД: ни дата, ни координаты, ни место рождения не утекли в ответ.
    const json = JSON.stringify(me);
    expect(json).not.toContain('1990-05-17');
    expect(json).not.toContain('55.7558');
    expect(json).not.toContain('Москва');

    await app.close();
  });

  it('чек-ин за «не сегодня» → 400; POST /posts kind=sky_day → 400', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const user = await registerAndLogin(app);

    const wrongDay = await app.inject({
      method: 'POST',
      url: '/api/v1/sky/checkins',
      headers: { authorization: `Bearer ${user.accessToken}` },
      payload: { dayKey: '2020-01-01', verdict: 'hit' },
    });
    expect(wrongDay.statusCode).toBe(400);

    const forbiddenKind = await app.inject({
      method: 'POST',
      url: '/api/v1/posts',
      headers: { authorization: `Bearer ${user.accessToken}` },
      payload: { kind: 'sky_day', title: 'Подделка треда', bodyMd: 'Попытка создать системный пост.' },
    });
    expect(forbiddenKind.statusCode).toBe(400);

    // И системный тред не светится в общей ленте. limit=5 — щадим соединения: toPostResponse
    // делает 3 параллельных запроса НА ПОСТ (наследие Ф7), а session-pooler дев-Supabase
    // ограничен 15 клиентами (EMAXCONNSESSION при limit=20 на этой БД).
    const feed = await app.inject({ method: 'GET', url: '/api/v1/posts?limit=5' });
    expect(feed.statusCode).toBe(200);
    const items = (feed.json() as { items: Array<{ kind: string }> }).items;
    expect(items.every((p) => p.kind !== 'sky_day')).toBe(true);

    await app.close();
  });

  it('share transit_day: caption в roundtrip, флаг классификатора → 400', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });

    const ok = await app.inject({
      method: 'POST',
      url: '/api/v1/share',
      payload: {
        kind: 'transit_day',
        positions: transitPositions,
        positionsB: transitPositions,
        caption: 'В точку · Марс — квадрат — Солнце, орб 1.2°',
        theme: 'light',
      },
    });
    expect(ok.statusCode).toBe(200);
    const { slug } = ok.json() as { slug: string };

    const details = await app.inject({ method: 'GET', url: `/api/v1/share/${slug}` });
    expect(details.statusCode).toBe(200);
    const detailsBody = details.json() as { kind: string; caption: string | null };
    expect(detailsBody.kind).toBe('transit_day');
    expect(detailsBody.caption).toBe('В точку · Марс — квадрат — Солнце, орб 1.2°');

    const flagged = await app.inject({
      method: 'POST',
      url: '/api/v1/share',
      payload: {
        kind: 'transit_day',
        positions: transitPositions,
        caption: 'Сниму порчу и сделаю приворот по фото',
        theme: 'light',
      },
    });
    expect(flagged.statusCode).toBe(400);

    // caption на не-transit_day карточке отклоняется.
    const wrongKind = await app.inject({
      method: 'POST',
      url: '/api/v1/share',
      payload: { kind: 'natal', positions: transitPositions, caption: 'подпись', theme: 'light' },
    });
    expect(wrongKind.statusCode).toBe(400);

    await app.close();
  });
});
