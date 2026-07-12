import { Alert, Card, Typography } from 'antd';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import type { PlanetInXData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: PlanetInXData } }): React.JSX.Element {
  const { planetNameRu, targetLabel, text } = pageContext.data;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/planety">← Все планеты</a>
      </Paragraph>
      <Title level={1}>
        {planetNameRu} {targetLabel}
      </Title>
      {text?.quality === 'draft' && (
        <Alert type="warning" showIcon style={{ marginBottom: 16 }} message="Черновик, требует редактуры" description="Текст — из корпуса интерпретаций, ещё не вычитан редактором." />
      )}
      <InfoDisclaimer />

      {!text ? (
        <Alert type="warning" showIcon message="Текст готовится" description="Разбор этого сочетания ещё не засеян в корпусе — загляните позже." />
      ) : (
        <Card>
          <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{text.text}</Paragraph>
        </Card>
      )}

      <Card size="small" style={{ marginTop: 16 }}>
        <Paragraph style={{ margin: 0 }}>
          Хотите узнать своё положение планет? <a href="/natalnaya-karta">Рассчитайте натальную карту →</a>
        </Paragraph>
      </Card>
    </main>
  );
}
