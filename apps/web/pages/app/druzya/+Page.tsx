import { useEffect, useState } from 'react';
import { Alert, Button, Card, Input, List, Space, Spin, Switch, Tag, Typography } from 'antd';
import type { FriendshipResponse, FriendshipSynastryResponse } from '@stassist/shared/schemas/community.js';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Paragraph, Text } = Typography;

/**
 * `/app/druzya` — заявки в друзья + синастрия по явному взаимному согласию (req.3 промта Ф7).
 * Виджет синастрии показывается ТОЛЬКО когда обе стороны открыли карту (см. apps/api/src/routes/
 * friendships.ts — честный `computed:false` иначе, а не 403/500).
 */
export function Page(): React.JSX.Element {
  const [friendships, setFriendships] = useState<FriendshipResponse[] | null>(null);
  const [friendId, setFriendId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [synastry, setSynastry] = useState<Record<string, FriendshipSynastryResponse>>({});

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/app/druzya';
      return;
    }
    void refresh();
  }, []);

  async function refresh(): Promise<void> {
    try {
      const res = await api.get<{ items: FriendshipResponse[] }>('/friendships');
      setFriendships(res.items);
    } catch {
      setFriendships([]);
    }
  }

  async function onAddFriend(): Promise<void> {
    setError(null);
    try {
      await api.post('/friendships', { friendId });
      setFriendId('');
      void refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось отправить заявку.');
    }
  }

  async function onAccept(id: string): Promise<void> {
    await api.patch(`/friendships/${id}/accept`);
    void refresh();
  }

  async function onToggleShare(id: string, shared: boolean): Promise<void> {
    await api.patch(`/friendships/${id}/share`, { shared });
    void refresh();
  }

  async function onLoadSynastry(id: string): Promise<void> {
    const res = await api.get<FriendshipSynastryResponse>(`/friendships/${id}/synastry`);
    setSynastry((prev) => ({ ...prev, [id]: res }));
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/app">← В кабинет</a> · <a href="/app/soobshchestvo">Лента</a>
      </Paragraph>
      <Title level={2}>Друзья и синастрия</Title>
      <Paragraph type="secondary">
        Добавьте друга по его ID пользователя. После принятия заявки каждая сторона может отдельно открыть свою
        карту — виджет синастрии появится, только когда ОБЕ стороны это сделают.
      </Paragraph>

      <Card style={{ marginBottom: 24 }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input value={friendId} onChange={(e) => setFriendId(e.target.value)} placeholder="ID пользователя друга" />
          <Button type="primary" disabled={!friendId.trim()} onClick={() => void onAddFriend()}>
            Отправить заявку
          </Button>
        </Space.Compact>
        {error && <Alert type="error" showIcon message={error} style={{ marginTop: 8 }} />}
      </Card>

      {friendships === null ? (
        <Spin />
      ) : friendships.length === 0 ? (
        <Text type="secondary">У вас пока нет друзей на портале — отправьте первую заявку.</Text>
      ) : (
        <List
          dataSource={friendships}
          renderItem={(f) => (
            <List.Item>
              <Card style={{ width: '100%' }} size="small">
                <Paragraph style={{ margin: 0 }}>
                  <b>{f.friendDisplayName ?? f.friendId}</b>{' '}
                  <Tag color={f.status === 'accepted' ? 'green' : 'gold'}>{f.status === 'accepted' ? 'друзья' : 'заявка ожидает'}</Tag>
                </Paragraph>
                {f.status === 'pending' && (
                  <Button size="small" onClick={() => void onAccept(f.id)}>
                    Принять заявку
                  </Button>
                )}
                {f.status === 'accepted' && (
                  <>
                    <Space style={{ marginTop: 8 }}>
                      <Text>Открыть мою карту этому другу:</Text>
                      <Switch checked={f.iShared} onChange={(checked) => void onToggleShare(f.id, checked)} />
                      <Text type="secondary">{f.friendShared ? 'друг открыл свою карту' : 'друг ещё не открыл карту'}</Text>
                    </Space>
                    <div style={{ marginTop: 8 }}>
                      <Button size="small" onClick={() => void onLoadSynastry(f.id)}>
                        Показать синастрию
                      </Button>
                      {synastry[f.id] && !synastry[f.id]!.computed && (
                        <Alert style={{ marginTop: 8 }} type="info" showIcon message="Синастрия недоступна" description="Обе стороны должны открыть карту друг другу." />
                      )}
                      {synastry[f.id]?.computed && (
                        <Alert style={{ marginTop: 8 }} type="success" showIcon message={`Найдено межкартовых аспектов: ${synastry[f.id]!.crossAspects.length}`} />
                      )}
                    </div>
                  </>
                )}
              </Card>
            </List.Item>
          )}
        />
      )}
    </main>
  );
}
