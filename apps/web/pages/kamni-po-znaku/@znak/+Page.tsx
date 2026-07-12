import { Alert, Card, Col, Empty, Row, Tag, Typography } from 'antd';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import { STONE_PURPOSE_NAME_RU } from '../../../lib/kamni-labels.js';
import type { KamniPoZnakuData } from './+data.js';

const { Title, Paragraph, Text } = Typography;

export function Page({ pageContext }: { pageContext: { data: KamniPoZnakuData } }): React.JSX.Element {
  const { znakName, stones } = pageContext.data;

  if (!znakName) {
    return (
      <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
        <Alert type="warning" showIcon message="Знак зодиака не найден" />
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 880, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/kamni">← Все камни</a>
      </Paragraph>
      <Title level={1}>Камни для знака {znakName}</Title>
      <InfoDisclaimer />

      {stones.length === 0 ? (
        <Empty description="Для этого знака пока нет камней в каталоге." />
      ) : (
        <Row gutter={[16, 16]}>
          {stones.map((stone) => (
            <Col xs={24} sm={12} md={8} key={stone.slug}>
              <Card hoverable title={<a href={`/kamni/${stone.slug}`}>{stone.name}</a>}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {stone.colors.join(', ')}
                </Text>
                <div style={{ marginTop: 8 }}>
                  {stone.purposes.slice(0, 3).map((p) => (
                    <Tag key={p} color="gold">
                      {STONE_PURPOSE_NAME_RU[p]}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
}
