/**
 * /api/v1/consents — 152-ФЗ: отдельный экран/чекбокс на согласие (не часть оферты), версия
 * документа и момент согласия фиксируются (см. docs/architecture/22-модель-данных.md §1).
 */
import type { FastifyPluginAsync, RawServerDefault } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { consentGrantRequestSchema, consentKindSchema, LEGAL_DOC_VERSIONS, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { requireDbOr503 } from '../route-context.js';
import { grantConsent, listConsents, revokeConsent } from '../repositories/consents-repository.js';
import { writeAuditLog } from '../repositories/audit-log-repository.js';

export interface ConsentsRoutesOptions {
  config: Config;
}

const DOC_VERSION_BY_KIND: Record<string, string> = {
  pd_processing: LEGAL_DOC_VERSIONS.pdProcessing,
  marketing: LEGAL_DOC_VERSIONS.marketing,
};

function toDto(row: { id: string; kind: string; docVersion: string; grantedAt: Date; revokedAt: Date | null }) {
  return {
    id: row.id,
    kind: row.kind,
    docVersion: row.docVersion,
    grantedAt: row.grantedAt.toISOString(),
    revokedAt: row.revokedAt ? row.revokedAt.toISOString() : null,
  };
}

export const consentsRoutes: FastifyPluginAsync<ConsentsRoutesOptions, RawServerDefault, ZodTypeProvider> = async (
  app,
  opts,
) => {
  const { config } = opts;
  app.addHook('preHandler', buildRequireAuth(config));

  app.get('/', async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const rows = await listConsents(db, req.authUser!.id);
    return reply.send(rows.map(toDto));
  });

  app.post(
    '/',
    { schema: { body: consentGrantRequestSchema } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const docVersion = DOC_VERSION_BY_KIND[req.body.kind]!;
      const row = await grantConsent(db, { userId: req.authUser!.id, kind: req.body.kind, docVersion });
      await writeAuditLog(db, {
        actorId: req.authUser!.id,
        action: 'consent.granted',
        entity: 'consent',
        entityId: row.id,
        payload: { kind: req.body.kind, docVersion },
        requestId: req.id,
      });
      return reply.send(toDto(row));
    },
  );

  app.post(
    '/:kind/revoke',
    { schema: { params: z.object({ kind: consentKindSchema }) } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      await revokeConsent(db, req.authUser!.id, req.params.kind);
      await writeAuditLog(db, {
        actorId: req.authUser!.id,
        action: 'consent.revoked',
        entity: 'consent',
        payload: { kind: req.params.kind },
        requestId: req.id,
      });
      return reply.send({ message: 'Согласие отозвано.' });
    },
  );
};
