/**
 * notifications — служебные уведомления кабинета (Ф6, см. docs/architecture/22-модель-данных.md
 * §7б). Первый потребитель — `kind='order_ready'` (готовность PDF-заказа, письмо+уведомление, см.
 * находку [verification-gap] в _work/build/findings/f6.md); остальные значения — задел Ф7+.
 */
import { z } from 'zod';

export const notificationKindSchema = z.enum([
  'comment_reply',
  'friend_request',
  'order_ready',
  'moderation',
  'system',
]);
export type NotificationKind = z.infer<typeof notificationKindSchema>;

export const orderReadyPayloadSchema = z.object({
  orderId: z.string().uuid(),
  reportId: z.string().uuid(),
});
export type OrderReadyPayload = z.infer<typeof orderReadyPayloadSchema>;

export const notificationResponseSchema = z.object({
  id: z.string().uuid(),
  kind: notificationKindSchema,
  text: z.string(),
  payload: z.record(z.string(), z.unknown()),
  readAt: z.string().nullable(),
  createdAt: z.string(),
});
export type NotificationResponse = z.infer<typeof notificationResponseSchema>;

export const notificationListResponseSchema = z.object({ items: z.array(notificationResponseSchema) });
export type NotificationListResponse = z.infer<typeof notificationListResponseSchema>;
