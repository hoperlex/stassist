/**
 * /api/v1/sky — «Небо дня» (Ф9 «Созвездие», см. docs/strategy/11-соцраздел-созвездие.md §3, §7).
 *
 *  - `GET /today`, `GET /days/:dayKey` — ПУБЛИЧНО: событие дня (пишет worker, см. apps/worker/
 *    src/sky) + агрегаты чек-инов. 404 — честный empty-state (SSR-страница показывает заглушку
 *    с noindex, см. apps/web/pages/nebo-dnya).
 *  - `GET /days/:dayKey/me` — авторизованный: персональная проекция события на натальную карту.
 *    Паттерн приватности — routes/personal-horoscope.ts: self-профиль расшифровывается НА ЛЕТУ
 *    (getPdKeyring), наружу уходят ТОЛЬКО аспекты (без даты/времени/места рождения), ничего не
 *    сохраняется.
 *  - `POST /checkins` — чек-ин «в точку/частично/мимо» + опциональная заметка. Заметка публикуется
 *    ОБЫЧНЫМ комментарием в треде дня и проходит штатную модерацию UGC (classifyUgcText →
 *    pending при флаге) — соцконтур переиспользуется, а не дублируется. Чек-ин принимается
 *    ТОЛЬКО за «сегодня» по МСК (правило стрика, см. advanceStreak).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  mskNow,
  skyCheckinCreateRequestSchema,
  skyCheckinCreateResponseSchema,
  skyDayKeySchema,
  skyDayMeResponseSchema,
  skyDayPayloadSchema,
  skyDayResponseSchema,
  sharePositionsSchema,
  toDateKeyDay,
  type Config,
  type SharePositions,
  type SkyCheckinResponse,
  type SkyDayMeResponse,
  type SkyProjectionAspect,
} from '@stassist/shared';
import type { Bodies } from '@stassist/shared';
import {
  aspectNameRu,
  classifyUgcText,
  computeTransitToNatalAspects,
  objectNameRu,
  prioritizeTransitAspects,
  type TransitBodyPosition,
} from '@stassist/llm';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { getDb } from '../db.js';
import { listBirthProfiles } from '../repositories/birth-profiles-repository.js';
import { findNatalChartByProfile } from '../repositories/charts-repository.js';
import { getCommentById, insertComment } from '../repositories/comments-repository.js';
import { getPostById, incrementCommentsCount } from '../repositories/posts-repository.js';
import {
  countCheckinsByVerdict,
  findCheckin,
  findSkyDay,
  getStreak,
  upsertCheckinWithStreak,
  type SkyCheckinRow,
  type SkyDayRow,
} from '../repositories/sky-repository.js';

export interface SkyRoutesOptions {
  config: Config;
}

/** Тот же класс лимита, что у шеринга (SHARE_RATE_LIMIT): дешёвый POST, но пишет в БД/тред. */
const CHECKIN_RATE_LIMIT = { max: 20, timeWindow: '1 minute' } as const;

const dayParamsSchema = z.object({ dayKey: skyDayKeySchema });

/** Топ-N транзитных аспектов дня к наталу — первый и есть «аспект дня» в UI. */
const PROJECTION_ASPECT_LIMIT = 3;

function toSkyDayResponsePayload(row: SkyDayRow): {
  dayKey: string;
  title: string;
  summaryMd: string;
  payload: z.infer<typeof skyDayPayloadSchema>;
  transitPositions: SharePositions;
  threadPostId: string | null;
} {
  return {
    dayKey: row.dayKey,
    title: row.title,
    summaryMd: row.summaryMd,
    payload: skyDayPayloadSchema.parse(row.payload),
    // .parse — активная защита от ПД (strip нераспознанных ключей), как anonymizeChartData.
    transitPositions: sharePositionsSchema.parse(row.transitPositions),
    threadPostId: row.threadPostId,
  };
}

function toCheckinResponse(row: SkyCheckinRow): SkyCheckinResponse {
  return {
    dayKey: row.dayKey,
    verdict: row.verdict,
    note: row.note,
    noteCommentId: row.noteCommentId,
    createdAt: row.createdAt.toISOString(),
  };
}

/** Транзитный снапшот дня (SharePositions) → вход `computeTransitToNatalAspects`. */
function transitPositionsFromSnapshot(snapshot: SharePositions): TransitBodyPosition[] {
  return Object.entries(snapshot.bodies)
    .filter((entry): entry is [string, NonNullable<(typeof entry)[1]>] => entry[1] !== undefined)
    .map(([key, pos]) => ({ key, longitudeDeg: pos.longitudeDeg, speedLongDegPerDay: pos.speedLongDegPerDay }));
}

/** Детерминированная строка тона (бесплатная часть — без LLM, паттерн personal-horoscope). */
function buildProjectionSummary(aspects: readonly SkyProjectionAspect[]): string {
  if (aspects.length === 0) {
    return 'Сегодняшнее небо не образует точных аспектов к вашей карте — ровный день, событие дня проходит для вас фоном.';
  }
  const top = aspects[0]!;
  return `Событие дня касается вас напрямую: транзитный ${objectNameRu(top.transitBody)} образует ${aspectNameRu(top.angleName)} к вашему натальному ${objectNameRu(top.natalBody)} (орбис ${top.orbDeg.toFixed(1)}°).`;
}

export const skyRoutes: FastifyPluginAsyncZod<SkyRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  const keyring = getPdKeyring(config);

  /** Общая загрузка дня для /today и /days/:dayKey — null, если день ещё не рассчитан worker'ом. */
  async function loadDayResponse(dayKey: string): Promise<z.infer<typeof skyDayResponseSchema> | null> {
    const db = getDb(config);
    const row = db ? await findSkyDay(db, dayKey) : null;
    if (!db || !row) return null;
    const aggregates = await countCheckinsByVerdict(db, dayKey);
    return { ...toSkyDayResponsePayload(row), aggregates };
  }

  app.get(
    '/today',
    { schema: { response: { 200: skyDayResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const body = await loadDayResponse(toDateKeyDay(mskNow(new Date())));
      if (!body) return reply.status(404).send({ error: { message: 'Небо этого дня ещё не рассчитано', requestId: req.id } });
      return reply.send(body);
    },
  );

  app.get(
    '/days/:dayKey',
    { schema: { params: dayParamsSchema, response: { 200: skyDayResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const body = await loadDayResponse(req.params.dayKey);
      if (!body) return reply.status(404).send({ error: { message: 'Небо этого дня ещё не рассчитано', requestId: req.id } });
      return reply.send(body);
    },
  );

  app.get(
    '/days/:dayKey/me',
    { preHandler: requireAuth, schema: { params: dayParamsSchema, response: { 200: skyDayMeResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;
      const { dayKey } = req.params;

      const skyDay = await findSkyDay(db, dayKey);
      const [checkin, streakRow] = await Promise.all([findCheckin(db, userId, dayKey), getStreak(db, userId)]);
      const streak = { current: streakRow?.current ?? 0, best: streakRow?.best ?? 0 };

      const empty = (reason: 'no_profile' | 'no_day'): SkyDayMeResponse => ({
        computed: false,
        reason,
        aspects: [],
        summary: null,
        myCheckin: checkin ? toCheckinResponse(checkin) : null,
        streak,
      });
      if (!skyDay) return reply.send(empty('no_day'));

      const profiles = await listBirthProfiles(db, userId, keyring);
      const selfProfile = profiles.find((p) => p.kind === 'self');
      const chart = selfProfile ? await findNatalChartByProfile(db, selfProfile.id, keyring) : null;
      if (!chart) return reply.send(empty('no_profile'));

      const snapshot = sharePositionsSchema.parse(skyDay.transitPositions);
      const natalBodies = (chart.data as { bodies: Partial<Bodies> }).bodies;
      const aspects = computeTransitToNatalAspects(natalBodies, transitPositionsFromSnapshot(snapshot));
      const prioritized = prioritizeTransitAspects(aspects, PROJECTION_ASPECT_LIMIT).map((t) => ({
        natalBody: t.natalBody,
        transitBody: t.transitBody,
        angleName: t.angleName,
        orbDeg: t.orbDeg,
        applying: t.applying,
      }));

      return reply.send({
        computed: true,
        reason: 'ok',
        aspects: prioritized,
        summary: buildProjectionSummary(prioritized),
        myCheckin: checkin ? toCheckinResponse(checkin) : null,
        streak,
      });
    },
  );

  app.post(
    '/checkins',
    {
      preHandler: requireAuth,
      schema: {
        body: skyCheckinCreateRequestSchema,
        response: { 200: skyCheckinCreateResponseSchema, 400: apiErrorSchema, 404: apiErrorSchema },
      },
      config: { rateLimit: CHECKIN_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;
      const { dayKey, verdict, note } = req.body;

      const todayKey = toDateKeyDay(mskNow(new Date()));
      if (dayKey !== todayKey) {
        return reply.status(400).send({
          error: { message: 'Чек-ин принимается только за сегодняшний день (по московскому времени)', requestId: req.id },
        });
      }
      const skyDay = await findSkyDay(db, dayKey);
      if (!skyDay) {
        return reply.status(404).send({ error: { message: 'Небо этого дня ещё не рассчитано', requestId: req.id } });
      }

      // Заметка публикуется комментарием в треде дня ОДИН раз (повторный чек-ин её не меняет —
      // комментарий уже живёт своей жизнью в треде: ответы, реакции, модерация).
      const existing = await findCheckin(db, userId, dayKey);
      let noteCommentId: string | null = null;
      let noteModerationPending = false;
      let noteToStore: string | null = null;
      if (note && !existing?.noteCommentId) {
        const thread = skyDay.threadPostId ? await getPostById(db, skyDay.threadPostId) : null;
        if (thread) {
          const classification = classifyUgcText(note);
          const comment = await insertComment(db, {
            postId: thread.id,
            authorId: userId,
            bodyMd: note,
            moderation: classification.flagged ? 'pending' : 'approved',
          });
          await incrementCommentsCount(db, thread.id, 1);
          noteCommentId = comment.id;
          noteModerationPending = classification.flagged;
          noteToStore = note;
        }
      }

      const { checkin, streak } = await upsertCheckinWithStreak(db, {
        userId,
        dayKey,
        verdict,
        note: noteToStore,
        noteCommentId,
      });

      // Повторный чек-ин с уже опубликованной заметкой: сообщаем актуальный статус её модерации.
      if (!noteModerationPending && checkin.noteCommentId && !noteCommentId) {
        const comment = await getCommentById(db, checkin.noteCommentId);
        noteModerationPending = comment?.moderation === 'pending';
      }

      return reply.send({
        checkin: toCheckinResponse(checkin),
        streak: { current: streak.current, best: streak.best },
        noteModerationPending,
      });
    },
  );
};
