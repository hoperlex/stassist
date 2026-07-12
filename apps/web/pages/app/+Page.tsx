import { useEffect, useState } from 'react';
import { Badge, Button, Card, List, Space, Typography } from 'antd';
import type { NotificationResponse } from '@stassist/shared';
import { api, getAccessToken } from '../../lib/api-client.js';
import { PersonalCyclesWidget } from '../../lib/PersonalCyclesWidget.js';

const { Title, Text } = Typography;

/**
 * SPA-страница «/app»: личный кабинет. Счётчик — оставлен как проверка гидратации (Ф0). Ф6
 * добавляет: виджет персональных циклов (req.6 промта Ф6), список уведомлений (order_ready и
 * т.п.) и переходы в профили/заказы PDF.
 */
export function Page(): React.JSX.Element {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationResponse[] | null>(null);

  useEffect(() => {
    if (!getAccessToken()) return;
    api
      .get<{ items: NotificationResponse[] }>('/notifications')
      .then((res) => setNotifications(res.items))
      .catch(() => setNotifications([]));
  }, []);

  const unreadCount = notifications?.filter((n) => !n.readAt).length ?? 0;

  return (
    <main style={{ maxWidth: 640, margin: '64px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Личный кабинет</Title>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Text data-testid="hydration-counter">Счётчик (проверка гидратации): {count}</Text>
          <Button type="primary" onClick={() => setCount((c) => c + 1)}>
            Нажми меня
          </Button>
          <Space wrap>
            <Button href="/profiles">Мои профили рождения</Button>
            <Button href="/app/zakazat-pdf">Заказать PDF-отчёт</Button>
            <Button href="/app/zakazat-prognoz">Индивидуальный прогноз</Button>
            <Button href="/app/podpiska">Подписка</Button>
            <Button href="/app/kviz">Квиз о себе</Button>
            <Button href="/soobshchestvo">Сообщество</Button>
            <Button href="/app/druzya">Друзья</Button>
            <Button href="/app/moderaciya">Модерация</Button>
          </Space>
        </Space>
      </Card>

      <PersonalCyclesWidget />

      {getAccessToken() && (
        <Card
          title={
            <span>
              Уведомления{' '}
              {unreadCount > 0 && <Badge count={unreadCount} style={{ marginLeft: 8 }} />}
            </span>
          }
          style={{ marginTop: 24 }}
        >
          {!notifications || notifications.length === 0 ? (
            <Text type="secondary">Пока нет уведомлений.</Text>
          ) : (
            <List
              size="small"
              dataSource={notifications.slice(0, 10)}
              renderItem={(n) => (
                <List.Item>
                  <Text type={n.readAt ? 'secondary' : undefined}>{n.text}</Text>
                </List.Item>
              )}
            />
          )}
        </Card>
      )}
    </main>
  );
}
