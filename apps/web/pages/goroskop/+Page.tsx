import { Card, Col, Row, Typography } from 'antd';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { AstroWeatherWidget } from '../../lib/AstroWeatherWidget.js';
import type { GoroskopHubData } from './+data.js';

const { Title, Paragraph } = Typography;

/** `/goroskop` — хаб гороскопов: 12 знаков + ссылки на восточный/лунный/шуточный контуры
 *  (requirement 3 промта Ф5, перелинковка по doc 23). */
export function Page({ pageContext }: { pageContext: { data: GoroskopHubData } }): React.JSX.Element {
  const { signs } = pageContext.data;

  return (
    <main style={{ maxWidth: 880, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Гороскопы по знакам зодиака</Title>
      <Paragraph>
        Ежедневно обновляемые гороскопы для всех 12 знаков зодиака: общий, любовный, финансовый,
        карьерный и гороскоп здоровья — на сегодня, завтра, неделю, месяц и год.
      </Paragraph>
      <AstroWeatherWidget />
      <InfoDisclaimer />

      <Row gutter={[16, 16]}>
        {signs.map((sign) => (
          <Col xs={12} sm={8} md={6} key={sign.slug}>
            <a href={`/goroskop/${sign.slug}`}>
              <Card size="small" hoverable style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>{sign.glyph}</div>
                <div>{sign.nameRu}</div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>

      <Paragraph style={{ marginTop: 32 }}>
        Также на портале: <a href="/vostochnyj-goroskop">восточный (годовой) гороскоп</a>,{' '}
        <a href="/lunnyj-den/1">лунные дни</a>, <a href="/shutochnyj-goroskop">шуточные гороскопы</a>,{' '}
        <a href="/sovmestimost">совместимость знаков</a> и <a href="/natalnaya-karta">натальная карта</a>.
      </Paragraph>
    </main>
  );
}
