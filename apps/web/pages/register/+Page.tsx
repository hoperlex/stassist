import { useState } from 'react';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import { api, ApiError } from '../../lib/api-client.js';

const { Title, Paragraph, Text } = Typography;

interface RegisterFormValues {
  email: string;
  password: string;
  displayName?: string;
}

/**
 * Регистрация. Ответ API — намеренно общий («если e-mail ещё не зарегистрирован — письмо
 * отправлено») вне зависимости от того, занят адрес или нет (защита от enumeration, см.
 * apps/api/src/routes/auth.ts).
 */
export function Page(): React.JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onFinish(values: RegisterFormValues): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post<{ message: string }>('/auth/register', values);
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось отправить запрос. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: '96px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Регистрация</Title>
        {message ? (
          <Alert type="success" showIcon message={message} />
        ) : (
          <>
            {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
            <Form<RegisterFormValues> layout="vertical" onFinish={onFinish} disabled={submitting}>
              <Form.Item
                label="E-mail"
                name="email"
                rules={[{ required: true, message: 'Укажите e-mail' }, { type: 'email', message: 'Некорректный e-mail' }]}
              >
                <Input type="email" autoComplete="email" />
              </Form.Item>
              <Form.Item label="Отображаемое имя (необязательно)" name="displayName">
                <Input autoComplete="nickname" maxLength={100} />
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="password"
                rules={[
                  { required: true, message: 'Укажите пароль' },
                  { min: 8, message: 'Минимум 8 символов' },
                ]}
                extra="Минимум 8 символов, хотя бы одна буква и одна цифра."
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting} block>
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>
            <Paragraph>
              Уже есть аккаунт? <a href="/login">Войти</a>
            </Paragraph>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Продолжая, вы соглашаетесь с{' '}
              <a href="/consent">условиями обработки персональных данных</a> — согласие потребуется
              отдельно перед созданием профиля рождения.
            </Text>
          </>
        )}
      </Card>
    </main>
  );
}
