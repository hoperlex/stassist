/**
 * /api/v1/birth-profiles — CRUD профилей рождения (несколько на пользователя). Создание профиля
 * ГЕЙТИТСЯ действующим согласием на обработку ПД (`consents.kind='pd_processing'`, текущая
 * версия документа) — находка f2.md [legal-versioning]. При создании также считается и
 * сохраняется натальная карта через astro-core (charts.kind='natal').
 */
import type { FastifyPluginAsync, RawServerDefault } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { birthProfileInputSchema, LEGAL_DOC_VERSIONS, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { requireDbOr503 } from '../route-context.js';
import {
  deleteBirthProfile,
  getBirthProfile,
  insertBirthProfile,
  listBirthProfiles,
  updateBirthProfile,
} from '../repositories/birth-profiles-repository.js';
import { hasActiveConsent } from '../repositories/consents-repository.js';
import { getCalcPresetById, getDefaultSystemPreset, rowToCalcPreset } from '../repositories/calc-presets-repository.js';
import { computeAndStoreNatalChart } from '../charts/natal-chart-service.js';
import { findNatalChartByProfile } from '../repositories/charts-repository.js';
import { writeAuditLog } from '../repositories/audit-log-repository.js';

export interface BirthProfilesRoutesOptions {
  config: Config;
}

const idParamsSchema = z.object({ id: z.string().uuid() });

export const birthProfilesRoutes: FastifyPluginAsync<
  BirthProfilesRoutesOptions,
  RawServerDefault,
  ZodTypeProvider
> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.get('/', async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const keyring = getPdKeyring(config);
    const profiles = await listBirthProfiles(db, req.authUser!.id, keyring);
    return reply.send(profiles);
  });

  app.post(
    '/',
    { schema: { body: birthProfileInputSchema } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const userId = req.authUser!.id;

      const consentOk = await hasActiveConsent(db, userId, 'pd_processing', LEGAL_DOC_VERSIONS.pdProcessing);
      if (!consentOk) {
        return reply.status(403).send({
          error: {
            message:
              'Нужно действующее согласие на обработку персональных данных, прежде чем создавать профиль рождения.',
            code: 'consent_required',
            requestId: req.id,
          },
        });
      }

      const keyring = getPdKeyring(config);
      const profile = await insertBirthProfile(db, userId, req.body, keyring);

      const presetRow = req.body.presetId
        ? await getCalcPresetById(db, req.body.presetId)
        : await getDefaultSystemPreset(db);
      if (presetRow) {
        await computeAndStoreNatalChart(db, profile, rowToCalcPreset(presetRow), presetRow.id, keyring);
      } else {
        req.log.warn('birth-profiles: не найден ни запрошенный, ни системный дефолтный calc_preset — карта не рассчитана');
      }

      await writeAuditLog(db, {
        actorId: userId,
        action: 'birth_profile.created',
        entity: 'birth_profile',
        entityId: profile.id,
        requestId: req.id,
      });

      return reply.send(profile);
    },
  );

  app.get(
    '/:id',
    { schema: { params: idParamsSchema } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const keyring = getPdKeyring(config);
      const profile = await getBirthProfile(db, req.authUser!.id, req.params.id, keyring);
      if (!profile) {
        return reply.status(404).send({ error: { message: 'Профиль не найден', requestId: req.id } });
      }
      return reply.send(profile);
    },
  );

  app.get(
    '/:id/chart',
    { schema: { params: idParamsSchema } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const keyring = getPdKeyring(config);
      const profile = await getBirthProfile(db, req.authUser!.id, req.params.id, keyring);
      if (!profile) {
        return reply.status(404).send({ error: { message: 'Профиль не найден', requestId: req.id } });
      }
      const chart = await findNatalChartByProfile(db, profile.id, keyring);
      if (!chart) {
        return reply.status(404).send({ error: { message: 'Натальная карта ещё не рассчитана', requestId: req.id } });
      }
      return reply.send(chart);
    },
  );

  app.patch(
    '/:id',
    { schema: { params: idParamsSchema, body: birthProfileInputSchema } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const keyring = getPdKeyring(config);
      const updated = await updateBirthProfile(db, req.authUser!.id, req.params.id, req.body, keyring);
      if (!updated) {
        return reply.status(404).send({ error: { message: 'Профиль не найден', requestId: req.id } });
      }
      await writeAuditLog(db, {
        actorId: req.authUser!.id,
        action: 'birth_profile.updated',
        entity: 'birth_profile',
        entityId: updated.id,
        requestId: req.id,
      });
      return reply.send(updated);
    },
  );

  app.delete(
    '/:id',
    { schema: { params: idParamsSchema } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const deleted = await deleteBirthProfile(db, req.authUser!.id, req.params.id);
      if (!deleted) {
        return reply.status(404).send({ error: { message: 'Профиль не найден', requestId: req.id } });
      }
      await writeAuditLog(db, {
        actorId: req.authUser!.id,
        action: 'birth_profile.deleted',
        entity: 'birth_profile',
        entityId: req.params.id,
        requestId: req.id,
      });
      return reply.status(204).send();
    },
  );
};
