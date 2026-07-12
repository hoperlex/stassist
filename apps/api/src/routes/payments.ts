/**
 * /api/v1/payments — список платежей пользователя, минимальная админ-поверхность возвратов (req.1
 * промта Ф8 «возвраты из админки», закрывает MINOR-находку f8.md: полноценной админ-панели нет ни
 * в одной фазе — вместо неё endpoint под ролью admin), вебхук провайдера — см. webhooks.ts (отдельный
 * файл: вебхук НЕ требует авторизации пользователя, вынесен, чтобы не путать preHandler-цепочки).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  paymentListResponseSchema,
  paymentRefundRequestSchema,
  paymentResponseSchema,
  type Config,
  type PaymentResponse,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { buildRequireRole } from '../auth/require-role.js';
import { getPorts, requireDbOr503 } from '../route-context.js';
import { getPaymentById, listPaymentsForUser, updatePaymentStatus, type PaymentRow } from '../repositories/payments-repository.js';
import { writeAuditLog } from '../repositories/audit-log-repository.js';

export interface PaymentsRoutesOptions {
  config: Config;
}

function toDto(row: PaymentRow): PaymentResponse {
  return {
    id: row.id,
    provider: row.provider,
    amountKop: row.amountKop,
    currency: row.currency,
    status: row.status,
    receiptStatus: row.receiptStatus,
    createdAt: row.createdAt.toISOString(),
  };
}

export const paymentsRoutes: FastifyPluginAsyncZod<PaymentsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);

  app.get('/', { preHandler: requireAuth, schema: { response: { 200: paymentListResponseSchema } } }, async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const rows = await listPaymentsForUser(db, req.authUser!.id);
    return reply.send({ items: rows.map(toDto) });
  });

  const requireAdmin = buildRequireRole(['admin']);

  app.post(
    '/:id/refund',
    {
      preHandler: [requireAuth, requireAdmin],
      schema: {
        params: z.object({ id: z.string().uuid() }),
        body: paymentRefundRequestSchema,
        response: { 200: paymentResponseSchema, 404: apiErrorSchema },
      },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const payment = await getPaymentById(db, req.params.id);
      if (!payment) return reply.status(404).send({ error: { message: 'Платёж не найден', requestId: req.id } });

      const ports = getPorts(config, db);
      await ports.payments.refundPayment({ paymentId: payment.providerPaymentId, amountKop: req.body.amountKop });
      const updated = await updatePaymentStatus(db, payment.id, 'refunded');

      await writeAuditLog(db, {
        actorId: req.authUser!.id,
        action: 'payment.refunded',
        entity: 'payment',
        entityId: payment.id,
        payload: { amountKop: req.body.amountKop ?? payment.amountKop, reason: req.body.reason ?? null },
        requestId: req.id,
      });

      return reply.send(toDto(updated ?? payment));
    },
  );
};
