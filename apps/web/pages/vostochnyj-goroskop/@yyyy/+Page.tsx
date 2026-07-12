import { Card, Col, Row, Typography } from 'antd';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import type { VostochnyjGoroskopYearHubData } from './+data.js';

const { Title, Paragraph } = Typography;

/** `/vostochnyj-goroskop/{yyyy}` — хаб восточного гороскопа: 12 животных (requirement 3 промта Ф5). */
export function Page({ pageContext }: { pageContext: { data: VostochnyjGoroskopYearHubData } }): React.JSX.Element {
  const { yyyy, animals } = pageContext.data;
  return (
    <main style={{ maxWidth: 880, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/goroskop">← Гороскопы</a>
      </Paragraph>
      <Title level={1}>Восточный гороскоп на {yyyy} год</Title>
      <Paragraph>Прогноз для каждого из 12 животных китайского календаря на {yyyy} год.</Paragraph>
      <InfoDisclaimer />
      <Row gutter={[16, 16]}>
        {animals.map((a) => (
          <Col xs={12} sm={8} md={6} key={a.slug}>
            <a href={`/vostochnyj-goroskop/${yyyy}/${a.ruSlug}`}>
              <Card size="small" hoverable style={{ textAlign: 'center' }}>
                {a.nameRu}
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </main>
  );
}
