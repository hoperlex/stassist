/**
 * Письмо о готовности индивидуального прогноза (Ф8, тот же стиль, что
 * `apps/worker/src/pdf/mail-templates.ts` `buildOrderReadyMail`, продублировано — заказы разного
 * типа продукта, см. заголовок generate-custom-forecast-job.ts).
 */
import type { MailMessage } from '@stassist/shared';

export function buildCustomForecastReadyMail(params: { to: string; titleRu: string; pdfUrl: string; cabinetUrl: string }): MailMessage {
  return {
    to: params.to,
    subject: `Ваш индивидуальный прогноз готов — Зодиакум`,
    text:
      `Здравствуйте!\n\n` +
      `Ваш прогноз «${params.titleRu}» готов. Скачать PDF можно по ссылке:\n${params.pdfUrl}\n\n` +
      `Прогноз также доступен онлайн в личном кабинете: ${params.cabinetUrl}\n\n` +
      `Материалы носят информационно-развлекательный характер (см. дисклеймер внутри PDF).`,
    html:
      `<p>Здравствуйте!</p>` +
      `<p>Ваш прогноз «${params.titleRu}» готов. Скачать PDF можно по ссылке:</p>` +
      `<p><a href="${params.pdfUrl}">${params.pdfUrl}</a></p>` +
      `<p>Прогноз также доступен онлайн в <a href="${params.cabinetUrl}">личном кабинете</a>.</p>` +
      `<p>Материалы носят информационно-развлекательный характер (см. дисклеймер внутри PDF).</p>`,
  };
}
