/**
 * Письмо о готовности PDF-заказа (см. находку [verification-gap] в _work/build/findings/f6.md:
 * «E2E требует доставку PDF по ссылке из письма, но ни одно требование не создаёт письмо» — этот
 * модуль закрывает пробел). Тот же стиль, что `apps/api/src/mail/templates.ts` (русский,
 * text+html). Отправляется через `Mailer`-порт из worker (см. `generate-pdf-order-job.ts`).
 */
import type { MailMessage } from '@stassist/shared';
import type { PdfProductType } from '@stassist/shared';
import { PDF_PRODUCT_CATALOG } from '@stassist/shared';

export function buildOrderReadyMail(params: { to: string; productType: PdfProductType; pdfUrl: string; cabinetUrl: string }): MailMessage {
  const title = PDF_PRODUCT_CATALOG[params.productType].titleRu;
  return {
    to: params.to,
    subject: `Ваш PDF-отчёт «${title}» готов — Stassist`,
    text:
      `Здравствуйте!\n\n` +
      `Ваш PDF-отчёт «${title}» готов. Скачать его можно по ссылке:\n${params.pdfUrl}\n\n` +
      `Отчёт также всегда доступен в личном кабинете: ${params.cabinetUrl}\n\n` +
      `Материалы отчёта носят информационно-развлекательный характер (см. дисклеймер внутри PDF).`,
    html:
      `<p>Здравствуйте!</p>` +
      `<p>Ваш PDF-отчёт «${title}» готов. Скачать его можно по ссылке:</p>` +
      `<p><a href="${params.pdfUrl}">${params.pdfUrl}</a></p>` +
      `<p>Отчёт также всегда доступен в <a href="${params.cabinetUrl}">личном кабинете</a>.</p>` +
      `<p>Материалы отчёта носят информационно-развлекательный характер (см. дисклеймер внутри PDF).</p>`,
  };
}
