import { useState } from 'react';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import type { WikiHubData } from './+data.js';

const { Title, Paragraph } = Typography;

/** `/wiki` — хаб базы знаний (req.3 промта Ф7): 10 разделов + строка поиска (req.4, ведёт на
 *  `/wiki/poisk?q=...`). */
export function Page({ pageContext }: { pageContext: { data: WikiHubData } }): React.JSX.Element {
  const { sections } = pageContext.data;
  const [q, setQ] = useState('');

  return (
    <main style={{ maxWidth: 960, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>База знаний</Title>
      <Paragraph>
        Справочник по западной астрологии, Матрице судьбы и нумерологии: планеты, знаки, дома, аспекты,
        школы и традиции, лунные дни, камни, глоссарий терминов.
      </Paragraph>

      <form
        style={{ display: 'flex', gap: 8, marginBottom: 32, maxWidth: 480 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim().length >= 2) window.location.href = `/wiki/poisk?q=${encodeURIComponent(q.trim())}`;
        }}
      >
        <Input placeholder="Например: Венера в Скорпионе" value={q} onChange={(e) => setQ(e.target.value)} />
        <Button type="primary" htmlType="submit">
          Найти
        </Button>
      </form>

      <Row gutter={[16, 16]}>
        {sections.map((s) => (
          <Col xs={24} sm={12} md={8} key={s.section}>
            <Card hoverable title={<a href={`/wiki/${s.section}`}>{s.nameRu}</a>} />
          </Col>
        ))}
      </Row>

      <Paragraph style={{ marginTop: 32 }}>
        Хотите разобрать конкретную позицию в своей карте? <a href="/planety">Планеты в знаках и домах →</a> ·{' '}
        <a href="/natalnaya-karta">Рассчитать натальную карту →</a>
      </Paragraph>
    </main>
  );
}
