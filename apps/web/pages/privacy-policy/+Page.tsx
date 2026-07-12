// Импорт напрямую из модуля с константами — см. пояснение в pages/consent/+Page.tsx
// (баррель `@stassist/shared` тянет серверные порты/node:crypto в клиентский бандл).
import { PRIVACY_POLICY_TEXT_RU } from '@stassist/shared/legal/doc-versions.js';
import { LegalDocPage } from '../../lib/LegalDocPage.js';

export function Page(): React.JSX.Element {
  return <LegalDocPage title="Политика обработки персональных данных" text={PRIVACY_POLICY_TEXT_RU} />;
}
