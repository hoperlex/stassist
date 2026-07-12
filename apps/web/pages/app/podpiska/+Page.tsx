import { useEffect, useState } from 'react';
import { Alert, Button, Card, Input, Radio, Space, Tag, Typography } from 'antd';
// Импорт напрямую из подмодулей (а НЕ `from '@stassist/shared'`) — баррель тянет node:crypto в
// клиентский бандл (тот же приём, что apps/web/pages/app/zakazat-pdf/+Page.tsx).
import { PLAN_CATALOG, type PaidPlanCode, type SubscriptionResponse } from '@stassist/shared/schemas/billing.js';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Paragraph, Text } = Typography;

const SUBSCRIPTION_STATUS_LABEL_RU: Record<string, string> = {
  trial: 'пробный период',
  active: 'активна',
  past_due: 'проблема со списанием (грейс-период)',
  cancelled: 'отменена',
  expired: 'истекла',
};

const VARIANT_STORAGE_KEY = 'stassist.paywallVariant';

/** `/app/podpiska` — управление подпиской «Премиум» (req.2 промта Ф8): оформление, промокод,
 *  отмена в один клик. При успешном оформлении, если пользователь пришёл с пейвола — пишет
 *  `converted` в A/B-эксперимент (см. `sessionStorage` VARIANT_STORAGE_KEY, apps/web/pages/app/
 *  pejvol/+Page.tsx). */
export function Page(): React.JSX.Element {
  const [subscription, setSubscription] = useState<SubscriptionResponse | null | undefined>(undefined);
  const [planCode, setPlanCode] = useState<PaidPlanCode>('premium_m');
  const [promoCode, setPromoCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function loadSubscription(): void {
    api
      .get<{ subscription: SubscriptionResponse | null }>('/subscriptions/me')
      .then((res) => setSubscription(res.subscription))
      .catch(() => setSubscription(null));
  }

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=' + encodeURIComponent('/app/podpiska');
      return;
    }
    loadSubscription();
  }, []);

  async function subscribe(): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      await api.post<SubscriptionResponse>('/subscriptions', {
        planCode,
        ...(promoCode ? { promoCode } : {}),
      });
      const variant = window.sessionStorage.getItem(VARIANT_STORAGE_KEY);
      if (variant) {
        await api.post('/paywall/convert', { variant, meta: { planCode } }).catch(() => undefined);
        window.sessionStorage.removeItem(VARIANT_STORAGE_KEY);
      }
      setNotice('Подписка оформлена! Приятного пользования Премиум-возможностями.');
      loadSubscription();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось оформить подписку.');
    } finally {
      setSubmitting(false);
    }
  }

  async function cancel(): Promise<void> {
    if (!subscription) return;
    setSubmitting(true);
    setError(null);
    try {
      await api.post<SubscriptionResponse>(`/subscriptions/${subscription.id}/cancel`, {});
      setNotice('Подписка отменена — доступ сохранится до конца оплаченного периода.');
      loadSubscription();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось отменить подписку.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: '48px auto', padding: '0 24px 64px' }}>
      <Title level={3}>Подписка</Title>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
      {notice && <Alert type="success" showIcon message={notice} style={{ marginBottom: 16 }} />}

      {subscription === undefined ? null : subscription && subscription.status !== 'cancelled' && subscription.status !== 'expired' ? (
        <Card>
          <Paragraph>
            План: <Text strong>{PLAN_CATALOG[subscription.planCode]?.titleRu ?? subscription.planCode}</Text>
          </Paragraph>
          <Paragraph>
            Статус: <Tag>{SUBSCRIPTION_STATUS_LABEL_RU[subscription.status] ?? subscription.status}</Tag>
            {subscription.cancelAtPeriodEnd && <Tag color="orange">Отменена — доступ до конца периода</Tag>}
          </Paragraph>
          <Paragraph>
            Действует до: {new Date(subscription.currentPeriodEnd).toLocaleDateString('ru-RU')}
          </Paragraph>
          {!subscription.cancelAtPeriodEnd && (
            <Button danger loading={submitting} onClick={() => void cancel()}>
              Отменить подписку в один клик
            </Button>
          )}
        </Card>
      ) : (
        <Card>
          <Paragraph>У вас пока нет активной подписки. Выберите план:</Paragraph>
          <Radio.Group value={planCode} onChange={(e) => setPlanCode(e.target.value)} style={{ marginBottom: 16 }}>
            <Space direction="vertical">
              <Radio value="premium_m">
                {PLAN_CATALOG.premium_m.titleRu} — {(PLAN_CATALOG.premium_m.priceKop / 100).toLocaleString('ru-RU')} ₽/мес
                (первые {PLAN_CATALOG.premium_m.trialDays} дней бесплатно)
              </Radio>
              <Radio value="premium_y">
                {PLAN_CATALOG.premium_y.titleRu} — {(PLAN_CATALOG.premium_y.priceKop / 100).toLocaleString('ru-RU')} ₽/год
                (первые {PLAN_CATALOG.premium_y.trialDays} дней бесплатно)
              </Radio>
            </Space>
          </Radio.Group>
          <Input
            placeholder="Промокод (необязательно)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            style={{ marginBottom: 16, maxWidth: 280 }}
          />
          <br />
          <Button type="primary" loading={submitting} onClick={() => void subscribe()}>
            Оформить подписку
          </Button>
        </Card>
      )}
    </main>
  );
}
