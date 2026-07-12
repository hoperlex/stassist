import { useEffect, useState } from 'react';
import { Alert, Button, Card, Spin, Tag, Typography } from 'antd';
import type { PaywallContentResponse } from '@stassist/shared/schemas/paywall.js';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Paragraph } = Typography;

const ANON_ID_STORAGE_KEY = 'stassist.paywallAnonId';
const VARIANT_STORAGE_KEY = 'stassist.paywallVariant';

function getOrCreateAnonId(): string {
  if (typeof window === 'undefined') return '';
  let id = window.localStorage.getItem(ANON_ID_STORAGE_KEY);
  if (!id) {
    id = `anon-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    window.localStorage.setItem(ANON_ID_STORAGE_KEY, id);
  }
  return id;
}

/**
 * `/app/pejvol` — экран подписки после квиза (req.3 промта Ф8), A/B-эксперимент
 * `paywall_v1` (`experiments`/`experiment_events`, doc 22 §7б): вариант и персонализация по
 * сфере квиза приходят от `POST /paywall/expose`; событие `exposed` уже пишет сервер, `converted`
 * пишется при фактической оплате на `/app/podpiska` (variant передаётся через sessionStorage).
 */
export function Page(): React.JSX.Element {
  const [content, setContent] = useState<PaywallContentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sphere = new URLSearchParams(window.location.search).get('sphere') ?? undefined;
    const anonId = getAccessToken() ? undefined : getOrCreateAnonId();
    api
      .post<PaywallContentResponse>('/paywall/expose', { anonId, sphere })
      .then((res) => {
        setContent(res);
        window.sessionStorage.setItem(VARIANT_STORAGE_KEY, res.variant);
      })
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : 'Не удалось загрузить предложение.'));
  }, []);

  if (error) {
    return (
      <main style={{ maxWidth: 560, margin: '96px auto', padding: '0 24px' }}>
        <Alert type="error" showIcon message={error} />
        <Paragraph style={{ marginTop: 16 }}>
          <a href="/tarify">Смотреть тарифы</a>
        </Paragraph>
      </main>
    );
  }

  if (!content) {
    return (
      <main style={{ maxWidth: 560, margin: '96px auto', padding: '0 24px', textAlign: 'center' }}>
        <Spin />
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 560, margin: '64px auto', padding: '0 24px 64px' }}>
      <Card>
        {content.badgeRu && (
          <Tag color="gold" style={{ marginBottom: 12 }}>
            {content.badgeRu}
          </Tag>
        )}
        <Title level={2}>{content.headlineRu}</Title>
        <Paragraph>{content.subheadlineRu}</Paragraph>
        <ul>
          {content.bullets.map((b) => (
            <li key={b} style={{ marginBottom: 8 }}>
              {b}
            </li>
          ))}
        </ul>
        <Button type="primary" size="large" block href="/app/podpiska">
          {content.ctaLabelRu}
        </Button>
        <Paragraph style={{ marginTop: 16, textAlign: 'center' }}>
          <a href="/app">Продолжить с бесплатным доступом</a>
        </Paragraph>
      </Card>
    </main>
  );
}
