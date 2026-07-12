/**
 * preHandler: гейтит роут по роли (см. `packages/db/src/schema/users.ts` `userRoleEnum`).
 * Используется ПОСЛЕ `requireAuth` (см. require-auth.ts) — тот кладёт `req.authUser`, этот
 * проверяет `req.authUser.role`. Ф7: editor (правки вики), moderator (очередь модерации), admin
 * (импорт celebrities).
 */
import type { FastifyReply, FastifyRequest } from 'fastify';

export function buildRequireRole(allowedRoles: readonly string[]) {
  return async function requireRole(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const role = req.authUser?.role;
    if (!role || !allowedRoles.includes(role)) {
      void reply.status(403).send({ error: { message: 'Недостаточно прав для этого действия', requestId: req.id } });
    }
  };
}
