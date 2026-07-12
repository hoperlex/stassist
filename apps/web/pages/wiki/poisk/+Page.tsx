import { useState } from 'react';
import { Alert, Button, Card, Input, List, Typography } from 'antd';
import type { WikiSearchData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: WikiSearchData } }): React.JSX.Element {
  const { q, results } = pageContext.data;
  const [value, setValue] = useState(q);

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/wiki">← База знаний</a>
      </Paragraph>
      <Title level={1}>Поиск по базе знаний</Title>

      <form
        style={{ display: 'flex', gap: 8, marginBottom: 24, maxWidth: 480 }}
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = `/wiki/poisk?q=${encodeURIComponent(value.trim())}`;
        }}
      >
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Например: Венера в Скорпионе" />
        <Button type="primary" htmlType="submit">
          Найти
        </Button>
      </form>

      {q && results.length === 0 && (
        <Alert type="info" showIcon message="Ничего не найдено" description={`По запросу «${q}» статей не найдено — попробуйте другое ключевое слово.`} />
      )}

      {results.length > 0 && (
        <Card>
          <List
            dataSource={results}
            renderItem={(a) => (
              <List.Item>
                <a href={`/wiki/${a.section}/${a.slug}`}>{a.title}</a>
              </List.Item>
            )}
          />
        </Card>
      )}
    </main>
  );
}
