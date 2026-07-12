import { Alert, Card, Typography } from 'antd';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import type { ArkanPageData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: ArkanPageData } }): React.JSX.Element {
  const { n, article } = pageContext.data;
  const prev = n > 1 ? n - 1 : null;
  const next = n < 22 ? n + 1 : null;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/matrica-sudby">← Матрица судьбы</a>
      </Paragraph>
      <Title level={1}>{article?.title ?? `Аркан ${n}`}</Title>
      <InfoDisclaimer />

      {!article ? (
        <Alert type="warning" showIcon message="Статья готовится" description="Разбор этого аркана появится в ближайшее время." />
      ) : (
        <Card>
          <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{article.bodyMd}</Paragraph>
        </Card>
      )}

      <Paragraph style={{ marginTop: 16 }}>
        {prev && <a href={`/arkan/${prev}`}>← Аркан {prev}</a>}
        {prev && next && ' · '}
        {next && <a href={`/arkan/${next}`}>Аркан {next} →</a>}
      </Paragraph>
      <Paragraph>
        <a href="/matrica-sudby">Рассчитать свою Матрицу судьбы →</a> · <a href="/kamni">Камни для этого аркана →</a>
      </Paragraph>
    </main>
  );
}
