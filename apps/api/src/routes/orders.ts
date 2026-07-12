/**
 * /api/v1/orders — заказы PDF-продуктов (req.3 промта Ф6: «до Ф8 оплата — тестовый провайдер-
 * заглушка за флагом (демо-режим)»). Тот же флаг-паттерн, что `PREMIUM_REPORTS_ENABLED` в
 * routes/ai-reports.ts — `DEMO_PAYMENTS_AUTO_CONFIRM` явный env-независимый флаг кода (реальный
 * `PaymentProvider` появится в Ф8 за `config.payments.driver`, см. §2 конвенций реализации;
 * `FakePaymentProvider` из `createPorts()` УЖЕ поддерживает интерфейс — переключение на живую
 * ЮKassa не потребует переписывать этот роут, только `config.payments.driver='yookassa'`).
 *
 * Генерация PDF — асинхронно в apps/worker (см. apps/worker/src/pdf/generate-pdf-order-job.ts):
 * этот роут только создаёт заказ и (в демо-режиме) сразу переводит его в `status='paid'` —
 * воркер подхватит по cron (тот же poll-по-статусу паттерн, что ai_reports/chart_shares).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  customForecastPriceKop,
  customForecastSubjectSchema,
  orderCreateRequestSchema,
  orderListResponseSchema,
  orderResponseSchema,
  orderSubjectSchema,
  PDF_PRODUCT_CATALOG,
  type Config,
  type OrderResponse,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { getPorts, requireDbOr503 } from '../route-context.js';
import { getBirthProfile } from '../repositories/birth-profiles-repository.js';
import {
  getOrderForUser,
  getReportPdfKey,
  insertOrder,
  listOrdersForUser,
  markOrderPaid,
  type OrderRow,
} from '../repositories/orders-repository.js';

export interface OrdersRoutesOptions {
  config: Config;
}

/** См. doc-комментарий файла. */
const DEMO_PAYMENTS_AUTO_CONFIRM = true;

const idParamsSchema = z.object({ id: z.string().uuid() });

/** Ф8: `row.subject` — форма зависит от `row.kind` (pdf_report → orderSubjectSchema,
 *  custom_forecast → customForecastSubjectSchema, см. doc-комментарий packages/shared/src/
 *  schemas/order.ts «orderCreateRequestSchema — union по kind»). */
function parseOrderSubjectByKind(kind: OrderRow['kind'], raw: unknown) {
  if (kind === 'custom_forecast') return customForecastSubjectSchema.parse(raw);
  return orderSubjectSchema.parse(raw);
}

async function toResponse(config: Config, db: NonNullable<ReturnType<typeof requireDbOr503>>, row: OrderRow): Promise<OrderResponse> {
  const subject = parseOrderSubjectByKind(row.kind, row.subject);
  let pdfUrl: string | null = null;
  if (row.status === 'delivered' && row.reportId) {
    const pdfKey = await getReportPdfKey(db, row.reportId);
    if (pdfKey) {
      const ports = getPorts(config, db);
      pdfUrl = await ports.storage.getSignedUrl(pdfKey, 60 * 60 * 24 * 7);
    }
  }
  return {
    id: row.id,
    kind: row.kind,
    subject,
    status: row.status,
    priceKop: row.priceKop,
    reportId: row.reportId,
    pdfUrl,
    errorMessage: row.errorMessage,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export const ordersRoutes: FastifyPluginAsyncZod<OrdersRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.post(
    '/',
    { schema: { body: orderCreateRequestSchema, response: { 201: orderResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const userId = req.authUser!.id;

      const keyring = getPdKeyring(config);
      const profile = await getBirthProfile(db, userId, req.body.subject.birthProfileId, keyring);
      if (!profile) {
        return reply.status(404).send({ error: { message: 'Профиль рождения не найден', requestId: req.id } });
      }

      let priceKop: number;
      let description: string;
      if (req.body.kind === 'pdf_report') {
        const { subject } = req.body;
        if (subject.variant === 'compat' && subject.partnerBirthProfileId) {
          const partner = await getBirthProfile(db, userId, subject.partnerBirthProfileId, keyring);
          if (!partner) {
            return reply.status(404).send({ error: { message: 'Профиль рождения партнёра не найден', requestId: req.id } });
          }
        }
        priceKop = PDF_PRODUCT_CATALOG[subject.productType].priceKop;
        description = PDF_PRODUCT_CATALOG[subject.productType].titleRu;
      } else {
        // custom_forecast (Ф8, req.4) — мастер заказа «событие/период/вопрос», см. doc-комментарий
        // customForecastSubjectSchema в packages/shared/src/schemas/order.ts. Конвейер генерации —
        // apps/worker/src/forecast/generate-custom-forecast-job.ts (тот же poll-по-статусу
        // паттерн, что PDF-заказы Ф6).
        priceKop = customForecastPriceKop(req.body.subject.type, req.body.subject.depth);
        description = `Индивидуальный прогноз — Зодиакум`;
      }

      let order = await insertOrder(db, { userId, kind: req.body.kind, subject: req.body.subject, priceKop });

      if (DEMO_PAYMENTS_AUTO_CONFIRM) {
        const ports = getPorts(config, db);
        await ports.payments.createPayment({
          amountKop: priceKop,
          description,
          idempotencyKey: order.id,
        });
        const paid = await markOrderPaid(db, order.id);
        if (paid) order = paid;
      }

      return reply.status(201).send(await toResponse(config, db, order));
    },
  );

  app.get('/', { schema: { response: { 200: orderListResponseSchema } } }, async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const rows = await listOrdersForUser(db, req.authUser!.id);
    return reply.send({ items: await Promise.all(rows.map((r) => toResponse(config, db, r))) });
  });

  app.get(
    '/:id',
    { schema: { params: idParamsSchema, response: { 200: orderResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const row = await getOrderForUser(db, req.authUser!.id, req.params.id);
      if (!row) return reply.status(404).send({ error: { message: 'Заказ не найден', requestId: req.id } });
      return reply.send(await toResponse(config, db, row));
    },
  );
};
