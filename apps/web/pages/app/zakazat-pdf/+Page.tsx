import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Form, Input, List, Select, Spin, Tag, Typography } from 'antd';
// Импорт напрямую из подмодуля (а НЕ `from '@stassist/shared'`) — баррель-индекс тянет серверные
// порты/node:crypto в клиентский бандл (тот же приём, что pages/natalnaya-karta/+Page.tsx).
import { PDF_PRODUCT_CATALOG, type OrderResponse, type PdfOrderVariant, type PdfProductType } from '@stassist/shared/schemas/order.js';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';

const { Title, Paragraph, Text } = Typography;

interface BirthProfileDto {
  id: string;
  label: string;
  kind: string;
}

const ORDER_STATUS_LABEL_RU: Record<string, string> = {
  created: 'создан',
  paid: 'оплачен (демо), ждёт генерации',
  ai_done: 'сгенерирован, доставляется',
  delivered: 'готов',
  cancelled: 'не удалось сгенерировать',
  refunded: 'возвращён',
  assigned_expert: 'передан эксперту',
  expert_accepted: 'эксперт принял',
  expert_done: 'эксперт завершил',
};

function readQueryProductType(): PdfProductType {
  if (typeof window === 'undefined') return 'matrix_full_pdf';
  const params = new URLSearchParams(window.location.search);
  const v = params.get('productType');
  return v === 'psychomatrix_pdf' || v === 'numerology_profile_pdf' ? v : 'matrix_full_pdf';
}

/**
 * `/app/zakazat-pdf` — заказ PDF-продукта (req.1-3 промта Ф6): выбор продукта/варианта/профиля →
 * `POST /orders` (демо-оплата подтверждается синхронно, см. apps/api/src/routes/orders.ts) →
 * поллинг статуса до `delivered` → ссылка на скачивание. Список прошлых заказов — под формой.
 */
export function Page(): React.JSX.Element {
  const [profiles, setProfiles] = useState<BirthProfileDto[] | null>(null);
  const [orders, setOrders] = useState<OrderResponse[] | null>(null);
  const [productType, setProductType] = useState<PdfProductType>(readQueryProductType);
  const [variant, setVariant] = useState<PdfOrderVariant>('standard');
  const [birthProfileId, setBirthProfileId] = useState<string | undefined>(undefined);
  const [partnerBirthProfileId, setPartnerBirthProfileId] = useState<string | undefined>(undefined);
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<OrderResponse | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/app/zakazat-pdf';
      return;
    }
    api.get<BirthProfileDto[]>('/birth-profiles').then(setProfiles).catch(() => setProfiles([]));
    void refreshOrders();
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function refreshOrders(): Promise<void> {
    try {
      const res = await api.get<{ items: OrderResponse[] }>('/orders');
      setOrders(res.items);
    } catch {
      setOrders([]);
    }
  }

  function pollOrder(id: string): void {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      api
        .get<OrderResponse>(`/orders/${id}`)
        .then((o) => {
          setActiveOrder(o);
          if (o.status === 'delivered' || o.status === 'cancelled' || o.status === 'refunded') {
            if (pollRef.current) clearInterval(pollRef.current);
            void refreshOrders();
          }
        })
        .catch(() => undefined);
    }, 4000);
  }

  async function onSubmit(): Promise<void> {
    if (!birthProfileId) return;
    setSubmitting(true);
    setError(null);
    try {
      const order = await api.post<OrderResponse>('/orders', {
        kind: 'pdf_report',
        subject: {
          productType,
          variant,
          birthProfileId,
          partnerBirthProfileId: variant === 'compat' ? partnerBirthProfileId : undefined,
          fullName: productType === 'numerology_profile_pdf' && fullName ? fullName : undefined,
        },
      });
      setActiveOrder(order);
      if (order.status !== 'delivered') pollOrder(order.id);
      else void refreshOrders();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось создать заказ.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/app">← В кабинет</a>
      </Paragraph>
      <Title level={2}>Заказать PDF-отчёт</Title>
      <InfoDisclaimer />

      <Card>
        <Form layout="vertical">
          <Form.Item label="Продукт">
            <Select
              value={productType}
              onChange={(v) => setProductType(v)}
              options={Object.entries(PDF_PRODUCT_CATALOG).map(([key, v]) => ({
                value: key,
                label: `${v.titleRu} — ${v.pageEstimate}, ${(v.priceKop / 100).toFixed(0)} ₽`,
              }))}
            />
          </Form.Item>
          {productType === 'matrix_full_pdf' && (
            <Form.Item label="Вариант">
              <Select
                value={variant}
                onChange={(v) => setVariant(v)}
                options={[
                  { value: 'standard', label: 'Стандартный' },
                  { value: 'child', label: 'Детская матрица' },
                  { value: 'compat', label: 'Совместимость двух дат' },
                ]}
              />
            </Form.Item>
          )}
          <Form.Item label="Профиль рождения" required>
            {profiles === null ? (
              <Spin size="small" />
            ) : profiles.length === 0 ? (
              <Alert type="warning" showIcon message="Нет профилей" description={<a href="/profiles/new">Создайте профиль рождения</a>} />
            ) : (
              <Select
                placeholder="Выберите профиль"
                value={birthProfileId}
                onChange={setBirthProfileId}
                options={profiles.map((p) => ({ value: p.id, label: p.label }))}
              />
            )}
          </Form.Item>
          {variant === 'compat' && productType === 'matrix_full_pdf' && (
            <Form.Item label="Профиль партнёра/второго человека" required>
              <Select
                placeholder="Выберите профиль"
                value={partnerBirthProfileId}
                onChange={setPartnerBirthProfileId}
                options={(profiles ?? []).map((p) => ({ value: p.id, label: p.label }))}
              />
            </Form.Item>
          )}
          {productType === 'numerology_profile_pdf' && (
            <Form.Item label="Полное имя (для чисел выражения/души/личности, необязательно)">
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Иванова Мария Сергеевна" />
            </Form.Item>
          )}
        </Form>
        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
        <Button
          type="primary"
          loading={submitting}
          disabled={!birthProfileId || (variant === 'compat' && !partnerBirthProfileId)}
          onClick={() => void onSubmit()}
        >
          Заказать (демо-оплата)
        </Button>
      </Card>

      {activeOrder && (
        <Card style={{ marginTop: 16 }} title="Статус заказа">
          <Paragraph>
            <Tag color={activeOrder.status === 'delivered' ? 'green' : activeOrder.status === 'cancelled' ? 'red' : 'blue'}>
              {ORDER_STATUS_LABEL_RU[activeOrder.status] ?? activeOrder.status}
            </Tag>
          </Paragraph>
          {activeOrder.status === 'delivered' && activeOrder.pdfUrl && (
            <Button type="primary" href={activeOrder.pdfUrl} target="_blank" rel="noreferrer">
              Скачать PDF
            </Button>
          )}
          {activeOrder.status === 'cancelled' && (
            <Alert type="error" showIcon message="Генерация не удалась" description="Попробуйте создать заказ ещё раз или обратитесь в поддержку." />
          )}
          {activeOrder.status !== 'delivered' && activeOrder.status !== 'cancelled' && (
            <Text type="secondary">Генерация PDF идёт в фоне — страница обновляется автоматически.</Text>
          )}
        </Card>
      )}

      <Title level={4} style={{ marginTop: 32 }}>
        Мои заказы
      </Title>
      {orders === null ? (
        <Spin size="small" />
      ) : orders.length === 0 ? (
        <Text type="secondary">У вас пока нет заказов PDF-отчётов.</Text>
      ) : (
        <List
          dataSource={orders}
          renderItem={(o) => (
            <List.Item
              actions={
                o.status === 'delivered' && o.pdfUrl
                  ? [
                      <a key="dl" href={o.pdfUrl} target="_blank" rel="noreferrer">
                        Скачать
                      </a>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                title={PDF_PRODUCT_CATALOG[o.subject.productType].titleRu}
                description={`${ORDER_STATUS_LABEL_RU[o.status] ?? o.status} · ${new Date(o.createdAt).toLocaleDateString('ru-RU')}`}
              />
            </List.Item>
          )}
        />
      )}
    </main>
  );
}
