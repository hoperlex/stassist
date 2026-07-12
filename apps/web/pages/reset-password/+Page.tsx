import { useEffect, useState } from 'react';
import { Alert, Button, Card, Checkbox, Form, Input, Typography } from 'antd';
import { api, ApiError } from '../../lib/api-client.js';

const { Title } = Typography;

/** Без `?token=` — форма запроса ссылки; с `?token=` — форма установки нового пароля. */
export function Page(): React.JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get('token'));
  }, []);

  return (
    <main style={{ maxWidth: 420, margin: '96px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Восстановление пароля</Title>
        {token ? <ConfirmForm token={token} /> : <RequestForm />}
      </Card>
    </main>
  );
}

function RequestForm(): React.JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onFinish(values: { email: string }): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post<{ message: string }>('/auth/password-reset/request', values);
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось отправить запрос.');
    } finally {
      setSubmitting(false);
    }
  }

  if (message) return <Alert type="success" showIcon message={message} />;
  return (
    <Form layout="vertical" onFinish={onFinish} disabled={submitting}>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Укажите e-mail' }]}>
        <Input type="email" autoComplete="email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting} block>
          Отправить ссылку для сброса
        </Button>
      </Form.Item>
    </Form>
  );
}

function ConfirmForm({ token }: { token: string }): React.JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFinish(values: { newPassword: string; revokeOtherSessions: boolean }): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/auth/password-reset/confirm', { token, ...values });
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось изменить пароль.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Alert
        type="success"
        showIcon
        message="Пароль изменён."
        description={<a href="/login">Перейти ко входу</a>}
      />
    );
  }

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      disabled={submitting}
      initialValues={{ revokeOtherSessions: true }}
    >
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      <Form.Item
        label="Новый пароль"
        name="newPassword"
        rules={[{ required: true, message: 'Укажите новый пароль' }, { min: 8, message: 'Минимум 8 символов' }]}
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>
      <Form.Item name="revokeOtherSessions" valuePropName="checked">
        <Checkbox>Завершить все остальные активные сессии на других устройствах</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting} block>
          Сохранить новый пароль
        </Button>
      </Form.Item>
    </Form>
  );
}
