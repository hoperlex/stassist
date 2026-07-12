import { useEffect, useState } from 'react';
import { Alert, Button, Card, Checkbox, Typography } from 'antd';
// Импорт напрямую из модуля с константами (а НЕ `from '@stassist/shared'`) — баррель-индекс
// пакета реэкспортирует и серверные порты (Mailer/nodemailer, node:crypto и т.п.), которые Vite
// иначе пытается затащить в клиентский бандл и падает на "randomBytes is not exported by
// __vite-browser-external" (node:crypto недоступен в браузере). `legal/doc-versions.ts` сам по
// себе не имеет побочных импортов — безопасен для клиента.
import { PD_PROCESSING_CONSENT_TEXT_RU } from '@stassist/shared/legal/doc-versions.js';
import { api, ApiError, getAccessToken } from '../../lib/api-client.js';

const { Title, Paragraph } = Typography;

/**
 * 152-ФЗ: отдельный экран с отдельным чекбоксом и текстом документа (НЕ часть оферты). Создание
 * профиля рождения гейтится наличием действующего согласия этой версии (см. apps/api/src/routes/
 * birth-profiles.ts). После согласия — редирект на `?next=` (по умолчанию `/profiles/new`).
 */
export function Page(): React.JSX.Element {
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/login?next=${next}`;
    }
  }, []);

  async function grant(): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/consents', { kind: 'pd_processing' });
      const next = new URLSearchParams(window.location.search).get('next') ?? '/profiles/new';
      window.location.href = next;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось сохранить согласие.');
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '64px auto', padding: '0 24px' }}>
      <Card>
        <Title level={3}>Согласие на обработку персональных данных</Title>
        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
        <div
          style={{
            maxHeight: 360,
            overflowY: 'auto',
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          {PD_PROCESSING_CONSENT_TEXT_RU.split('\n\n').map((paragraph, i) => (
            <Paragraph key={i} style={{ whiteSpace: 'pre-wrap' }}>
              {paragraph}
            </Paragraph>
          ))}
        </div>
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
          Я прочитал(а) и согласен(на) с условиями обработки персональных данных, указанными выше.
        </Checkbox>
        <div style={{ marginTop: 16 }}>
          <Button type="primary" disabled={!checked} loading={submitting} onClick={() => void grant()} block>
            Согласиться и продолжить
          </Button>
        </div>
      </Card>
    </main>
  );
}
