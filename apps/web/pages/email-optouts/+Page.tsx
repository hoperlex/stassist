import { useEffect, useState } from 'react';
import { Alert, Card, Spin, Typography } from 'antd';
import { api, ApiError } from '../../lib/api-client.js';

const { Title, Paragraph } = Typography;

type Status = 'loading' | 'done' | 'error' | 'no-email';

/**
 * `/email-optouts?email=...&scope=...` — «отписка в один клик» (req.8 промта Ф8). Ссылка из
 * письма (см. apps/worker/src/email/mail-templates.ts) ведёт сюда напрямую, отписка
 * происходит автоматически при заходе — без входа в кабинет и без подтверждающих кликов
 * (юридическое требование прозрачности, тот же принцип, что «отмена подписки в один клик»).
 */
export function Page(): React.JSX.Element {
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const scope = params.get('scope') ?? 'all';
    if (!email) {
      setStatus('no-email');
      return;
    }
    api
      .post<{ message: string }>('/email-optouts', { email, scope })
      .then((res) => {
        setStatus('done');
        setMessage(res.message);
      })
      .catch((err: unknown) => {
        setStatus('error');
        setMessage(err instanceof ApiError ? err.message : 'Не удалось выполнить отписку.');
      });
  }, []);

  return (
    <main style={{ maxWidth: 480, margin: '96px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Отписка от рассылки</Title>
        {status === 'loading' && <Spin />}
        {status === 'done' && <Alert type="success" showIcon message={message} />}
        {status === 'error' && <Alert type="error" showIcon message={message} />}
        {status === 'no-email' && (
          <Alert
            type="warning"
            showIcon
            message="В ссылке не указан e-mail"
            description="Перейдите по полной ссылке из письма, либо отпишитесь от рассылок в настройках личного кабинета."
          />
        )}
        <Paragraph style={{ marginTop: 16 }}>
          <a href="/">На главную</a>
        </Paragraph>
      </Card>
    </main>
  );
}
