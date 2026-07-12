import { useEffect, useState } from 'react';
import { Alert, Card, Spin, Typography } from 'antd';
import { api, ApiError } from '../../lib/api-client.js';

const { Title, Paragraph } = Typography;

type Status = 'loading' | 'done' | 'error';

/** Ссылка из письма ведёт на `/verify-email?token=...` — подтверждение идёт автоматически. */
export function Page(): React.JSX.Element {
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      setStatus('error');
      setMessage('В ссылке нет токена подтверждения — проверьте, что вы перешли по полной ссылке из письма.');
      return;
    }
    api
      .post<{ message: string }>('/auth/verify-email', { token })
      .then((res) => {
        setStatus('done');
        setMessage(res.message);
      })
      .catch((err: unknown) => {
        setStatus('error');
        setMessage(err instanceof ApiError ? err.message : 'Не удалось подтвердить e-mail.');
      });
  }, []);

  return (
    <main style={{ maxWidth: 480, margin: '96px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Подтверждение e-mail</Title>
        {status === 'loading' && <Spin />}
        {status === 'done' && <Alert type="success" showIcon message={message} />}
        {status === 'error' && <Alert type="error" showIcon message={message} />}
        <Paragraph style={{ marginTop: 16 }}>
          <a href="/login">Перейти ко входу</a>
        </Paragraph>
      </Card>
    </main>
  );
}
