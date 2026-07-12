/**
 * /api/v1/friendships — заявки в друзья + синастрия по явному взаимному согласию (req.3 промта
 * Ф7). Виджет синастрии доступен ТОЛЬКО когда ОБЕ стороны открыли карту (`sharedByUser &&
 * sharedByFriend`, см. doc-комментарий packages/db/src/schema/friendships.ts) — без этого 403/
 * честный `computed:false` (НЕ 500), закрывает находку f7.md [data-model-gap] «взаимность
 * согласия».
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { detectSynastryAspects, type AspectableBody } from '@stassist/astro-core';
import {
  apiErrorSchema,
  friendshipCreateRequestSchema,
  friendshipListResponseSchema,
  friendshipResponseSchema,
  friendshipShareChartRequestSchema,
  friendshipSynastryResponseSchema,
  type Config,
  type FriendshipResponse,
  type SharePositions,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getDb } from '../db.js';
import { findNatalChartByProfile } from '../repositories/charts-repository.js';
import { listBirthProfiles } from '../repositories/birth-profiles-repository.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import {
  acceptFriendRequest,
  createFriendRequest,
  findFriendshipBetween,
  getDisplayNames,
  getFriendshipById,
  listFriendships,
  setChartShared,
  type FriendshipRow,
} from '../repositories/friendships-repository.js';
import { insertNotification } from '../repositories/notifications-repository.js';

export interface FriendshipsRoutesOptions {
  config: Config;
}

const idParamsSchema = z.object({ id: z.string().uuid() });

function toResponse(row: FriendshipRow, viewerId: string, names: Map<string, string | null>): FriendshipResponse {
  const iAmUser = row.userId === viewerId;
  const friendId = iAmUser ? row.friendId : row.userId;
  return {
    id: row.id,
    userId: row.userId,
    friendId,
    friendDisplayName: names.get(friendId) ?? null,
    status: row.status,
    iShared: iAmUser ? row.sharedByUser : row.sharedByFriend,
    friendShared: iAmUser ? row.sharedByFriend : row.sharedByUser,
    createdAt: row.createdAt.toISOString(),
  };
}

function toAspectableBodies(positions: SharePositions): AspectableBody[] {
  const out: AspectableBody[] = [];
  for (const [key, pos] of Object.entries(positions.bodies)) {
    if (pos) out.push({ key, longitudeDeg: pos.longitudeDeg, speedLongDegPerDay: pos.speedLongDegPerDay });
  }
  for (const [key, pos] of Object.entries(positions.points)) {
    if (pos) out.push({ key, longitudeDeg: pos.longitudeDeg, speedLongDegPerDay: pos.speedLongDegPerDay });
  }
  return out;
}

export const friendshipsRoutes: FastifyPluginAsyncZod<FriendshipsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.get('/', { schema: { response: { 200: friendshipListResponseSchema } } }, async (req, reply) => {
    const db = getDb(config);
    if (!db) return reply.send({ items: [] });
    const userId = req.authUser!.id;
    const rows = await listFriendships(db, userId);
    const names = await getDisplayNames(db, rows.map((r) => (r.userId === userId ? r.friendId : r.userId)));
    return reply.send({ items: rows.map((r) => toResponse(r, userId, names)) });
  });

  app.post(
    '/',
    { schema: { body: friendshipCreateRequestSchema, response: { 200: friendshipResponseSchema, 400: apiErrorSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;
      if (req.body.friendId === userId) {
        return reply.status(400).send({ error: { message: 'Нельзя добавить в друзья самого себя', requestId: req.id } });
      }
      const existing = await findFriendshipBetween(db, userId, req.body.friendId);
      if (existing) {
        const names = await getDisplayNames(db, [req.body.friendId]);
        return reply.send(toResponse(existing, userId, names));
      }
      const row = await createFriendRequest(db, userId, req.body.friendId);
      await insertNotification(db, {
        userId: req.body.friendId,
        kind: 'friend_request',
        text: 'Вам пришла заявка в друзья.',
        payload: { friendshipId: row.id },
      });
      const names = await getDisplayNames(db, [req.body.friendId]);
      return reply.send(toResponse(row, userId, names));
    },
  );

  app.patch(
    '/:id/accept',
    { schema: { params: idParamsSchema, response: { 200: friendshipResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;
      const row = await acceptFriendRequest(db, req.params.id, userId);
      if (!row) return reply.status(404).send({ error: { message: 'Заявка не найдена', requestId: req.id } });
      const names = await getDisplayNames(db, [row.userId]);
      return reply.send(toResponse(row, userId, names));
    },
  );

  app.patch(
    '/:id/share',
    { schema: { params: idParamsSchema, body: friendshipShareChartRequestSchema, response: { 200: friendshipResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;
      const row = await setChartShared(db, req.params.id, userId, req.body.shared);
      if (!row) return reply.status(404).send({ error: { message: 'Дружба не найдена', requestId: req.id } });
      const friendId = row.userId === userId ? row.friendId : row.userId;
      const names = await getDisplayNames(db, [friendId]);
      return reply.send(toResponse(row, userId, names));
    },
  );

  app.get(
    '/:id/synastry',
    { schema: { params: idParamsSchema, response: { 200: friendshipSynastryResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.send({ computed: false, reason: 'no_chart', a: null, b: null, crossAspects: [] });
      const userId = req.authUser!.id;
      const friendship = await getFriendshipById(db, req.params.id);
      if (!friendship || (friendship.userId !== userId && friendship.friendId !== userId) || friendship.status !== 'accepted') {
        return reply.send({ computed: false, reason: 'not_friends', a: null, b: null, crossAspects: [] });
      }
      if (!friendship.sharedByUser || !friendship.sharedByFriend) {
        return reply.send({ computed: false, reason: 'not_mutually_shared', a: null, b: null, crossAspects: [] });
      }

      const friendId = friendship.userId === userId ? friendship.friendId : friendship.userId;
      const keyring = getPdKeyring(config);
      const [myProfiles, friendProfiles] = await Promise.all([listBirthProfiles(db, userId, keyring), listBirthProfiles(db, friendId, keyring)]);
      const mySelf = myProfiles.find((p) => p.kind === 'self');
      const friendSelf = friendProfiles.find((p) => p.kind === 'self');
      if (!mySelf || !friendSelf) return reply.send({ computed: false, reason: 'no_chart', a: null, b: null, crossAspects: [] });

      const [myChart, friendChart] = await Promise.all([findNatalChartByProfile(db, mySelf.id), findNatalChartByProfile(db, friendSelf.id)]);
      if (!myChart || !friendChart) return reply.send({ computed: false, reason: 'no_chart', a: null, b: null, crossAspects: [] });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb на границе БД
      const a = myChart.data as any as SharePositions;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const b = friendChart.data as any as SharePositions;
      const crossAspects = detectSynastryAspects(toAspectableBodies(a), toAspectableBodies(b), { aspectSet: 'major_minor' });
      return reply.send({ computed: true, reason: 'ok', a, b, crossAspects });
    },
  );
};
