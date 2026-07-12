import { DISCLAIMER_TEXT_RU } from '@stassist/shared/legal/doc-versions.js';
import { LegalDocPage } from '../../lib/LegalDocPage.js';

export function Page(): React.JSX.Element {
  return <LegalDocPage title="Дисклеймер" text={DISCLAIMER_TEXT_RU} />;
}
