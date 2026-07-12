import { Typography } from 'antd';
// Импорт напрямую из подмодуля (а НЕ `from '@stassist/shared'`) — баррель тянет node:crypto в
// клиентский бандл, см. doc-комментарий apps/web/lib/goroskop-nav-links.ts.
import { COMMUNITY_RULES_TEXT_RU } from '@stassist/shared/legal/community-rules.js';

const { Paragraph } = Typography;

/** `/pravila-soobshchestva` — этический кодекс сообщества (req.5 промта Ф7, публичная страница). */
export function Page(): React.JSX.Element {
  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      {COMMUNITY_RULES_TEXT_RU.split('\n\n').map((paragraph, i) => (
        <Paragraph key={i} style={{ whiteSpace: 'pre-wrap' }}>
          {paragraph}
        </Paragraph>
      ))}
    </main>
  );
}
