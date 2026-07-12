import { useState } from 'react';
import { Button, Card, Select, Table, Typography } from 'antd';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import type { SovmestimostIndexData } from './+data.js';

const { Title, Paragraph } = Typography;

/** `/sovmestimost` — каталог 78 пар совместимости знаков + быстрый выбор пары (см. docs/roadmap/
 *  prompts/f3-калькуляторы-и-карта.md требование 2, docs/architecture/23-seo-стратегия.md §2:
 *  внутренняя перелинковка на 78 канонических страниц-пар). */
export function Page({ pageContext }: { pageContext: { data: SovmestimostIndexData } }): React.JSX.Element {
  const { signs, pairs } = pageContext.data;
  const [signA, setSignA] = useState<string | undefined>(undefined);
  const [signB, setSignB] = useState<string | undefined>(undefined);

  function go(): void {
    if (!signA || !signB || typeof window === 'undefined') return;
    window.location.href = `/sovmestimost/${signA}-i-${signB}`;
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Совместимость знаков зодиака</Title>
      <Paragraph>
        Выберите два знака, чтобы посмотреть готовый разбор пары и рассчитать синастрию по датам
        рождения, либо откройте любую из 78 пар в таблице ниже.
      </Paragraph>
      <InfoDisclaimer />

      <Card>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Select
            placeholder="Первый знак"
            style={{ width: 200 }}
            value={signA}
            onChange={setSignA}
            options={signs.map((s) => ({ value: s.slug, label: s.nameRu }))}
          />
          <Select
            placeholder="Второй знак"
            style={{ width: 200 }}
            value={signB}
            onChange={setSignB}
            options={signs.map((s) => ({ value: s.slug, label: s.nameRu }))}
          />
          <Button type="primary" disabled={!signA || !signB} onClick={go}>
            Показать совместимость
          </Button>
        </div>
      </Card>

      <Title level={3} style={{ marginTop: 32 }}>
        Все 78 пар
      </Title>
      <Table
        size="small"
        pagination={{ pageSize: 20 }}
        rowKey="slug"
        dataSource={pairs}
        columns={[
          {
            title: 'Пара',
            key: 'pair',
            render: (_: unknown, row: SovmestimostIndexData['pairs'][number]) => (
              <a href={`/sovmestimost/${row.slug}`}>
                {row.nameA} и {row.nameB}
              </a>
            ),
          },
        ]}
      />
    </main>
  );
}
