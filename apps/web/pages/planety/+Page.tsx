import { useState } from 'react';
import { Card, Collapse, Space, Tag, Typography } from 'antd';
import type { PlanetyHubData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: PlanetyHubData } }): React.JSX.Element {
  const { planets, signs, houses } = pageContext.data;
  const [expanded, setExpanded] = useState<string | string[]>([]);

  return (
    <main style={{ maxWidth: 900, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Планеты в знаках и домах</Title>
      <Paragraph>
        10 планет × 12 знаков + 10 планет × 12 домов — 240 страниц с разбором каждого сочетания.
        Хотите узнать своё расположение планет? <a href="/natalnaya-karta">Рассчитайте натальную карту →</a>
      </Paragraph>

      <Collapse
        activeKey={expanded}
        onChange={setExpanded}
        items={planets.map((p) => ({
          key: p.ruSlug,
          label: p.nameRu,
          children: (
            <Card size="small">
              <Paragraph strong>В знаках:</Paragraph>
              <Space wrap style={{ marginBottom: 16 }}>
                {signs.map((s) => (
                  <a key={s.slugPrepositional} href={`/planety/${p.ruSlug}-v-${s.slugPrepositional}`}>
                    <Tag>{p.nameRu} в {s.nameRu.toLowerCase()}</Tag>
                  </a>
                ))}
              </Space>
              <Paragraph strong>В домах:</Paragraph>
              <Space wrap>
                {houses.map((h) => (
                  <a key={h} href={`/planety/${p.ruSlug}-v-${h}-dome`}>
                    <Tag>{h}-й дом</Tag>
                  </a>
                ))}
              </Space>
            </Card>
          ),
        }))}
      />

      <Paragraph style={{ marginTop: 24 }}>
        См. также: <a href="/wiki/planets">статьи о планетах</a> · <a href="/wiki/signs">статьи о знаках зодиака</a> · <a href="/wiki/houses">статьи о домах</a>
      </Paragraph>
    </main>
  );
}
