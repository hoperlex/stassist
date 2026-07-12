import { useState } from 'react';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import { api, ApiError, setAccessToken } from '../../lib/api-client.js';

const { Title, Paragraph } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export function Page(): React.JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFinish(values: LoginFormValues): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post<LoginResponse>('/auth/login', values);
      setAccessToken(res.accessToken);
      window.location.href = '/profiles';
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось войти. Попробуйте ещё раз.');
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: '96px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Вход</Title>
        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
        <Form<LoginFormValues> layout="vertical" onFinish={onFinish} disabled={submitting}>
          <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Укажите e-mail' }]}>
            <Input type="email" autoComplete="email" />
          </Form.Item>
          <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Укажите пароль' }]}>
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} block>
              Войти
            </Button>
          </Form.Item>
        </Form>
        <Paragraph>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </Paragraph>
        <Paragraph>
          <a href="/reset-password">Забыли пароль?</a>
        </Paragraph>
      </Card>
    </main>
  );
}
