import { OFFER_TEXT_RU } from '@stassist/shared/legal/doc-versions.js';
import { LegalDocPage } from '../../lib/LegalDocPage.js';

export function Page(): React.JSX.Element {
  return <LegalDocPage title="Публичная оферта" text={OFFER_TEXT_RU} />;
}
