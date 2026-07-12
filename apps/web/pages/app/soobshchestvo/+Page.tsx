import { useEffect } from 'react';
import { Spin, Typography } from 'antd';

/**
 * Ф9: сообщество стало публичным разделом — лента переехала с приватного `/app/soobshchestvo`
 * на `/soobshchestvo` (решение заказчика: чтение без логина, SEO-актив, см. docs/strategy/
 * 11-соцраздел-созвездие.md §1). Старый URL остаётся тонким клиентским редиректом (страница под
 * /app/* и так не индексируется — SEO-дубля нет), чтобы не ломать сохранённые ссылки/закладки.
 */
export function Page(): React.JSX.Element {
  useEffect(() => {
    window.location.replace('/soobshchestvo');
  }, []);
  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
      <Spin />
      <Typography.Paragraph style={{ marginTop: 16 }}>
        Сообщество переехало: <a href="/soobshchestvo">/soobshchestvo</a>
      </Typography.Paragraph>
    </main>
  );
}
