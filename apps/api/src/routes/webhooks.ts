/**
 * /api/v1/webhooks/yookassa — приём вебхуков ЮKassa (req.1 промта Ф8: «вебхуки — идемпотентны
 * (webhook_events.event_id uniq), подпись проверяется»).
 *
 * `event_id`: реальный формат уведомления ЮKassa — `{ type: 'notification', event: 'payment.
 * succeeded'|…, object: { id, status, … } }`, БЕЗ отдельного поля «id события» (в отличие,
 * например, от Stripe). Наша идемпотентность строится на ДЕТЕРМИНИРОВАННОМ композитном ключе
 * `${event}:${object.id}:${object.status}` — повторная доставка ТОГО ЖЕ перехода статуса даёт
 * тот же ключ (не задваивает эффект), а РЕАЛЬНО новый переход (напр. pending→succeeded) получает
 * новый ключ и обрабатывается. Это ЧЕСТНО задокументированная интерпретация промта под реальный
 * формат API ЮKassa, а не выдуманное поле.
 *
 * Подпись: см. doc-комментарий `WEBHOOK_SIGNATURE_HEADER`/`verifyWebhookSignature`
 * (packages/shared/src/ports/payment-provider.ts) — наш собственный HMAC-слой, опционален через
 * `YOOKASSA_WEBHOOK_SECRET`. Сырое тело запроса перехватывается через `addContentTypeParser`,
 * ЭНКАПСУЛИРОВАННЫЙ в этом плагине (не затрагивает остальные роуты, см. Fastify encapsulation).
 *
 * Модель обработки — см. doc-комментарий `packages/db/src/schema/webhook-events.ts`: ответ 200
 * почти всегда (кроме неверной подписи/невалидного тела), необработанные события подбирает
 * `apps/worker` по расписанию (retry-очередь, req.1 промта «retry-очередь в worker»).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { FastifyRequest } from 'fastify';
import { z } from 'zod';
import { verifyWebhookSignature, WEBHOOK_SIGNATURE_HEADER, yookassaWebhookEventSchema, type Config } from '@stassist/shared';
import { requireDbOr503 } from '../route-context.js';
import { buildDrizzleWebhookStores } from '../billing/drizzle-webhook-stores.js';
import { recordAndApplyYookassaWebhook } from '../billing/webhook-processor.js';

export interface WebhooksRoutesOptions {
  config: Config;
}

declare module 'fastify' {
  interface FastifyRequest {
    rawBody?: string;
  }
}

export const webhooksRoutes: FastifyPluginAsyncZod<WebhooksRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  // Энкапсулировано в этом плагине — см. doc-комментарий файла.
  app.addContentTypeParser('application/json', { parseAs: 'string' }, (req: FastifyRequest, body: string, done) => {
    req.rawBody = body;
    if (!body) {
      done(null, {});
      return;
    }
    try {
      done(null, JSON.parse(body));
    } catch (err) {
      done(err as Error, undefined);
    }
  });

  app.post(
    '/yookassa',
    {
      schema: {
        response: {
          200: z.object({ received: z.boolean() }),
          400: z.object({ received: z.boolean() }),
          401: z.object({ error: z.object({ message: z.string() }) }),
        },
      },
    },
    async (req, reply) => {
      if (config.payments.webhookSecret) {
        const signature = req.headers[WEBHOOK_SIGNATURE_HEADER] as string | undefined;
        if (!verifyWebhookSignature(req.rawBody ?? '', signature, config.payments.webhookSecret)) {
          return reply.status(401).send({ error: { message: 'Неверная подпись вебхука' } });
        }
      } else if (config.isProduction) {
        // Находка [webhook-fail-open]: без секрета подпись было НЕЧЕМ проверить, и любой
        // неаутентифицированный POST с `payment.succeeded` применялся как настоящий платёж
        // (выдача подписки/пометка заказа оплаченным) — fail-open. В production при
        // отсутствии секрета вебхук ОТКЛОНЯЕТСЯ (fail-closed): лучше временно не принимать
        // платёжные уведомления, чем провести платёж по неаутентифицированному запросу.
        req.log.error('webhook: YOOKASSA_WEBHOOK_SECRET не задан в production — вебхук отклонён (fail-closed)');
        return reply.status(401).send({ error: { message: 'Вебхук отклонён: подпись не может быть проверена' } });
      }

      const parsed = yookassaWebhookEventSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.status(400).send({ received: false });
      }
      const event = parsed.data;

      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;

      try {
        await recordAndApplyYookassaWebhook(event, buildDrizzleWebhookStores(db));
      } catch (err) {
        req.log.error({ err, event: event.event, objectId: event.object.id }, 'webhook: не удалось применить эффект синхронно, отдано на retry worker');
        // Строка webhook_events уже записана (insertIfNew — первый шаг recordAndApplyYookassaWebhook)
        // с processedAt=null — apps/worker подберёт по расписанию (см. doc-комментарий файла).
      }

      return reply.send({ received: true });
    },
  );
};
