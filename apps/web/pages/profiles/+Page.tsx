import { useEffect, useState } from 'react';
import { Alert, Button, Card, Empty, Input, List, Modal, Space, Spin, Typography } from 'antd';
import { api, ApiError, getAccessToken, setAccessToken } from '../../lib/api-client.js';

const { Title, Text, Paragraph } = Typography;

interface BirthProfileDto {
  id: string;
  label: string;
  kind: string;
  birthDate: string;
  birthTime: string | null;
  timeUnknown: boolean;
  placeName: string;
  tzId: string;
}

const KIND_LABEL_RU: Record<string, string> = { self: 'я', other: 'другой человек', celebrity: 'знаменитость' };

export function Page(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<BirthProfileDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/profiles';
      return;
    }
    api
      .get<BirthProfileDto[]>('/birth-profiles')
      .then(setProfiles)
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : 'Не удалось загрузить профили.'))
      .finally(() => setLoading(false));
  }, []);

  async function logout(): Promise<void> {
    await api.post('/auth/logout').catch(() => undefined);
    setAccessToken(null);
    window.location.href = '/login';
  }

  return (
    <main style={{ maxWidth: 720, margin: '64px auto', padding: '0 24px' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Мои профили рождения
        </Title>
        <Button onClick={() => void logout()}>Выйти</Button>
      </Space>

      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}

      {loading ? (
        <Spin />
      ) : profiles && profiles.length > 0 ? (
        <Card>
          <List
            dataSource={profiles}
            renderItem={(p) => (
              <List.Item
                actions={[
                  <a key="chart" href={`/profiles/${p.id}`}>
                    Карта
                  </a>,
                ]}
              >
                <List.Item.Meta
                  title={p.label}
                  description={
                    <>
                      {KIND_LABEL_RU[p.kind] ?? p.kind} · {p.birthDate}
                      {p.timeUnknown ? ' · время неизвестно' : p.birthTime ? ` ${p.birthTime}` : ''} ·{' '}
                      {p.placeName} ({p.tzId})
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Button type="primary" href="/profiles/new" style={{ marginTop: 16 }}>
            Добавить профиль
          </Button>
        </Card>
      ) : (
        <Card>
          <Empty
            description="У вас пока нет профилей рождения — создайте первый, чтобы рассчитать натальную карту."
          >
            <Button type="primary" href="/profiles/new">
              Создать первый профиль
            </Button>
          </Empty>
        </Card>
      )}

      <AccountSection />
    </main>
  );
}

function AccountSection(): React.JSX.Element {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function exportData(): Promise<void> {
    try {
      const data = await api.get('/account/export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'stassist-data-export.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось экспортировать данные.');
    }
  }

  async function deleteAccount(): Promise<void> {
    setBusy(true);
    setError(null);
    try {
      await api.delete('/account', { password });
      setAccessToken(null);
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось удалить аккаунт.');
      setBusy(false);
    }
  }

  return (
    <Card title="Аккаунт и персональные данные" style={{ marginTop: 24 }}>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Space direction="vertical">
        <Button onClick={() => void exportData()}>Скачать мои данные (JSON)</Button>
        <Button danger onClick={() => setDeleteOpen(true)}>
          Удалить аккаунт
        </Button>
      </Space>
      <Modal
        title="Удаление аккаунта"
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onOk={() => void deleteAccount()}
        confirmLoading={busy}
        okText="Удалить безвозвратно"
        okButtonProps={{ danger: true }}
      >
        <Paragraph>
          Все персональные данные (профили рождения, дата/время/место) будут удалены безвозвратно.
          Подтвердите паролем.
        </Paragraph>
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Текущий пароль"
        />
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
          Это действие необратимо.
        </Text>
      </Modal>
    </Card>
  );
}
