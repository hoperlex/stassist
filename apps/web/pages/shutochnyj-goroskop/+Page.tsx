import { Card, Col, Row, Tag, Typography } from 'antd';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import type { ShutochnyjHubData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: ShutochnyjHubData } }): React.JSX.Element {
  const { signs, professions } = pageContext.data;
  return (
    <main style={{ maxWidth: 880, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>
        Шуточные гороскопы <Tag color="magenta">шуточный</Tag>
      </Title>
      <Paragraph>Антигороскоп по знакам зодиака и гороскопы по профессиям — литературная ирония, не реальный прогноз.</Paragraph>
      <InfoDisclaimer />

      <Title level={3}>Антигороскоп по знакам</Title>
      <Row gutter={[16, 16]}>
        {signs.map((sign) => (
          <Col xs={12} sm={8} md={6} key={sign.slug}>
            <a href={`/shutochnyj-goroskop/${sign.slug}`}>
              <Card size="small" hoverable style={{ textAlign: 'center' }}>
                {sign.glyph} {sign.nameRu}
              </Card>
            </a>
          </Col>
        ))}
      </Row>

      <Title level={3} style={{ marginTop: 32 }}>
        По профессиям
      </Title>
      <Row gutter={[16, 16]}>
        {professions.map((p) => (
          <Col xs={12} sm={8} key={p.slug}>
            <a href={`/shutochnyj-goroskop/professiya/${p.slug}`}>
              <Card size="small" hoverable style={{ textAlign: 'center' }}>
                Гороскоп {p.nameRu}
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </main>
  );
}
