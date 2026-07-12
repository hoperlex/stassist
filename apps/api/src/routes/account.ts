/**
 * /api/v1/account — субъект ПД: экспорт своих данных (JSON) и удаление аккаунта (152-ФЗ, право
 * на забвение). Удаление = жёсткое стирание ПД + status='deleted' + аудит-запись (в Ф2
 * анонимизация UGC-ссылок — задокументированный no-op-хук, реальных UGC-таблиц ещё нет до Ф7,
 * см. findings f2.md [forward-reference]).
 */
import type { FastifyPluginAsync, RawServerDefault } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { accountDeleteRequestSchema, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { requireDbOr503 } from '../route-context.js';
import { findUserById, anonymizeAndDeleteUser } from '../repositories/users-repository.js';
import { listBirthProfiles, deleteAllBirthProfilesForUser } from '../repositories/birth-profiles-repository.js';
import { listConsents } from '../repositories/consents-repository.js';
import { verifyPassword } from '../auth/password.js';
import { PgRefreshTokenRepository } from '../repositories/refresh-tokens-repository.pg.js';
import { writeAuditLog } from '../repositories/audit-log-repository.js';

export interface AccountRoutesOptions {
  config: Config;
}

/**
 * Ф7-хук (no-op в Ф2): когда появятся UGC-таблицы (posts/comments), сюда добавится
 * анонимизация ссылок автора на удалённый аккаунт вместо каскадного удаления контента.
 */
function anonymizeUgcReferencesHook(_userId: string): void {
  // Намеренно пусто — см. комментарий выше.
}

export const accountRoutes: FastifyPluginAsync<AccountRoutesOptions, RawServerDefault, ZodTypeProvider> = async (
  app,
  opts,
) => {
  const { config } = opts;
  app.addHook('preHandler', buildRequireAuth(config));

  app.get('/export', async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const userId = req.authUser!.id;
    const user = await findUserById(db, userId);
    if (!user) {
      return reply.status(404).send({ error: { message: 'Учётная запись не найдена', requestId: req.id } });
    }
    const keyring = getPdKeyring(config);
    const [profiles, consents] = await Promise.all([
      listBirthProfiles(db, userId, keyring),
      listConsents(db, userId),
    ]);

    await writeAuditLog(db, {
      actorId: userId,
      action: 'account.exported',
      entity: 'user',
      entityId: userId,
      requestId: req.id,
    });

    return reply.send({
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        emailVerifiedAt: user.emailVerifiedAt,
        displayName: user.displayName,
        role: user.role,
        tz: user.tz,
        locale: user.locale,
        createdAt: user.createdAt,
      },
      birthProfiles: profiles,
      consents: consents.map((c) => ({
        kind: c.kind,
        docVersion: c.docVersion,
        grantedAt: c.grantedAt,
        revokedAt: c.revokedAt,
      })),
    });
  });

  app.delete(
    '/',
    { schema: { body: accountDeleteRequestSchema } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const userId = req.authUser!.id;
      const user = await findUserById(db, userId);
      if (!user) {
        return reply.status(404).send({ error: { message: 'Учётная запись не найдена', requestId: req.id } });
      }
      const ok = await verifyPassword(req.body.password, user.passwordHash);
      if (!ok) {
        return reply.status(403).send({ error: { message: 'Неверный пароль', requestId: req.id } });
      }

      await deleteAllBirthProfilesForUser(db, userId); // charts удаляются каскадно по FK
      await anonymizeAndDeleteUser(db, userId);
      await new PgRefreshTokenRepository(db).revokeAllForUser(userId, new Date());
      anonymizeUgcReferencesHook(userId);

      await writeAuditLog(db, {
        actorId: userId,
        action: 'user.account_deleted',
        entity: 'user',
        entityId: userId,
        requestId: req.id,
      });

      return reply.send({ message: 'Аккаунт и персональные данные удалены.' });
    },
  );
};
