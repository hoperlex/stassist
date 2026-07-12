import { useState } from 'react';
import { Button, Card, Space, Typography } from 'antd';

const { Title, Text } = Typography;

/**
 * SPA-страница «/app»: заготовка кабинета. Счётчик на useState — простой, наглядный способ
 * подтвердить, что клиентская гидратация действительно отработала (см. верификацию Ф0).
 */
export function Page(): React.JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <main style={{ maxWidth: 480, margin: '96px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Личный кабинет — заготовка</Title>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Text data-testid="hydration-counter">Счётчик (проверка гидратации): {count}</Text>
          <Button type="primary" onClick={() => setCount((c) => c + 1)}>
            Нажми меня
          </Button>
        </Space>
      </Card>
    </main>
  );
}
