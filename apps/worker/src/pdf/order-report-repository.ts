/**
 * Создаёт строку `ai_reports` (kind='order') для готового PDF-заказа — см. doc-комментарий
 * `packages/db/src/schema/orders.ts` (`orders.report_id → ai_reports.id`) и решение по
 * неоднозначности [ambiguity] в `packages/shared/src/schemas/order.ts` (ОТДЕЛЬНАЯ строка от
 * `ai_reports` kind='matrix_full', не переиспользует её).
 *
 * `cacheKey` для kind='order' НЕ используется для повторного использования между заказами (каждый
 * заказ уникален — платный продукт, не бесплатный кэшируемый разбор) — формируется как
 * `order:<orderId>` просто чтобы удовлетворить NOT NULL и быть человекочитаемым в аудите.
 */
import { aiReports, type Db } from '@stassist/db';
import { PROMPT_VERSION, CORPUS_VERSION } from '@stassist/llm';

export interface InsertOrderReportInput {
  userId: string;
  birthProfileId: string;
  contentMd: string;
  calcBlock: Record<string, unknown>;
  pdfKey: string;
  orderId: string;
  provider: string;
  tokensIn: number;
  tokensOut: number;
}

export async function insertOrderReport(db: Db, input: InsertOrderReportInput): Promise<string> {
  const [row] = await db
    .insert(aiReports)
    .values({
      userId: input.userId,
      birthProfileId: input.birthProfileId,
      kind: 'order',
      status: 'done',
      input: { orderId: input.orderId },
      contentMd: input.contentMd,
      calcBlock: input.calcBlock,
      promptVersion: PROMPT_VERSION,
      corpusVersion: CORPUS_VERSION,
      provider: input.provider,
      tokensIn: input.tokensIn,
      tokensOut: input.tokensOut,
      costMicros: 0,
      pdfKey: input.pdfKey,
      cacheKey: `order:${input.orderId}`,
      completedAt: new Date(),
    })
    .returning({ id: aiReports.id });
  if (!row) throw new Error('insertOrderReport: INSERT не вернул строку');
  return row.id;
}
