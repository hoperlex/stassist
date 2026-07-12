import { useEffect, useState } from 'react';
import { Alert, Button, Card, List, Space, Spin, Tag, Typography } from 'antd';
import type { ModerationQueueItem, ReportUgcResponse } from '@stassist/shared/schemas/community.js';
import { UGC_VIOLATION_REASON_NAME_RU } from '@stassist/shared/schemas/community.js';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Paragraph, Text } = Typography;

/**
 * `/app/moderaciya` — очередь модератора (req.5 промта Ф7): премодерация новичков +
 * автоклассификатор + жалобы. Роль moderator/admin — backend гейтит 403, здесь клиентски честно
 * показываем ошибку доступа, а не притворяемся, что страницы нет.
 */
export function Page(): React.JSX.Element {
  const [queue, setQueue] = useState<ModerationQueueItem[] | null>(null);
  const [reports, setReports] = useState<ReportUgcResponse[] | null>(null);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/app/moderaciya';
      return;
    }
    void refresh();
  }, []);

  async function refresh(): Promise<void> {
    try {
      const [q, r] = await Promise.all([
        api.get<{ items: ModerationQueueItem[] }>('/moderation/queue'),
        api.get<{ items: ReportUgcResponse[] }>('/moderation/reports'),
      ]);
      setQueue(q.items);
      setReports(r.items);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) setForbidden(true);
      else {
        setQueue([]);
        setReports([]);
      }
    }
  }

  async function onAction(item: ModerationQueueItem, action: 'approve' | 'reject'): Promise<void> {
    await api.patch(`/moderation/${item.entity === 'post' ? 'posts' : 'comments'}/${item.entityId}`, { action });
    void refresh();
  }

  async function onResolveReport(id: string, status: 'resolved' | 'dismissed'): Promise<void> {
    await api.patch(`/moderation/reports/${id}`, { status });
    void refresh();
  }

  if (forbidden) {
    return (
      <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
        <Alert type="error" showIcon message="Недостаточно прав" description="Эта страница доступна только модераторам и администраторам." />
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/app">← В кабинет</a>
      </Paragraph>
      <Title level={2}>Очередь модерации</Title>

      <Title level={4}>Публикации на проверке</Title>
      {queue === null ? (
        <Spin />
      ) : queue.length === 0 ? (
        <Text type="secondary">Очередь пуста.</Text>
      ) : (
        <List
          dataSource={queue}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: '100%' }} size="small">
                <Paragraph style={{ margin: 0 }}>
                  <Tag>{item.entity === 'post' ? 'пост' : 'комментарий'}</Tag>
                  {item.authorDisplayName ?? 'Аноним'} · {new Date(item.createdAt).toLocaleString('ru-RU')}
                  {item.reportsCount > 0 && <Tag color="red" style={{ marginLeft: 8 }}>{item.reportsCount} жалоб</Tag>}
                </Paragraph>
                {item.title && <Paragraph strong>{item.title}</Paragraph>}
                <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{item.bodyMd}</Paragraph>
                {item.autoFlags.length > 0 && (
                  <Space wrap style={{ marginBottom: 8 }}>
                    {item.autoFlags.map((f) => (
                      <Tag color="volcano" key={f}>
                        {UGC_VIOLATION_REASON_NAME_RU[f]}
                      </Tag>
                    ))}
                  </Space>
                )}
                <Space>
                  <Button type="primary" onClick={() => void onAction(item, 'approve')}>
                    Одобрить
                  </Button>
                  <Button danger onClick={() => void onAction(item, 'reject')}>
                    Отклонить
                  </Button>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Title level={4} style={{ marginTop: 24 }}>
        Жалобы
      </Title>
      {reports === null ? (
        <Spin />
      ) : reports.length === 0 ? (
        <Text type="secondary">Нет открытых жалоб.</Text>
      ) : (
        <List
          dataSource={reports}
          renderItem={(r) => (
            <List.Item>
              <Card style={{ width: '100%' }} size="small">
                <Paragraph style={{ margin: 0 }}>
                  <Tag>{r.entity === 'post' ? 'пост' : 'комментарий'}</Tag> {UGC_VIOLATION_REASON_NAME_RU[r.reason]} · {new Date(r.createdAt).toLocaleString('ru-RU')}
                </Paragraph>
                <Space style={{ marginTop: 8 }}>
                  <Button onClick={() => void onResolveReport(r.id, 'resolved')}>Подтвердить (скрыть)</Button>
                  <Button onClick={() => void onResolveReport(r.id, 'dismissed')}>Отклонить жалобу</Button>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      )}
    </main>
  );
}
