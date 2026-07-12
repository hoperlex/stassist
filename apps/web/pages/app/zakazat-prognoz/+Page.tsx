import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Checkbox, DatePicker, Form, Input, List, Select, Spin, Tag, Typography } from 'antd';
// Импорт напрямую из подмодулей (а НЕ `from '@stassist/shared'`) — баррель тянет node:crypto в
// клиентский бандл (тот же приём, что apps/web/pages/app/zakazat-pdf/+Page.tsx).
import {
  CUSTOM_FORECAST_CATALOG,
  type CustomForecastSubject,
  type CustomForecastType,
  type OrderResponse,
} from '@stassist/shared/schemas/order.js';
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
  paid: 'оплачен (демо), ждёт расчёта',
  ai_done: 'рассчитан, доставляется',
  delivered: 'готов',
  cancelled: 'не удалось рассчитать',
  refunded: 'возвращён',
};

const TYPE_LABEL_RU: Record<CustomForecastType, string> = {
  event_date: 'Событие — транзиты на конкретную дату',
  period_map: 'Период — карта транзитов на интервал',
  electives_question: 'Вопрос — поиск благоприятного окна',
};

function titleForOrder(subject: CustomForecastSubject): string {
  if (subject.type === 'event_date') return `Прогноз на ${subject.eventDate}`;
  if (subject.type === 'period_map') return `Карта периода ${subject.periodStart} — ${subject.periodEnd}`;
  return `Благоприятное окно ${subject.intervalStart} — ${subject.intervalEnd}`;
}

/**
 * `/app/zakazat-prognoz` — мастер заказа индивидуального прогноза (req.4 промта Ф8): событие/
 * период/вопрос → параметры → глубина → `POST /orders` (демо-оплата подтверждается синхронно) →
 * поллинг статуса → PDF + онлайн-просмотр (через `contentMd`, ссылка на PDF).
 */
export function Page(): React.JSX.Element {
  const [profiles, setProfiles] = useState<BirthProfileDto[] | null>(null);
  const [orders, setOrders] = useState<OrderResponse[] | null>(null);
  const [type, setType] = useState<CustomForecastType>('event_date');
  const [depth, setDepth] = useState<'standard' | 'deep'>('standard');
  const [birthProfileId, setBirthProfileId] = useState<string | undefined>(undefined);
  const [question, setQuestion] = useState('');
  const [eventDate, setEventDate] = useState<string | undefined>(undefined);
  const [periodStart, setPeriodStart] = useState<string | undefined>(undefined);
  const [periodEnd, setPeriodEnd] = useState<string | undefined>(undefined);
  const [intervalStart, setIntervalStart] = useState<string | undefined>(undefined);
  const [intervalEnd, setIntervalEnd] = useState<string | undefined>(undefined);
  const [weighRetrogradeMercury, setWeighRetrogradeMercury] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<OrderResponse | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/app/zakazat-prognoz';
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

  function buildSubject(): CustomForecastSubject | null {
    if (!birthProfileId) return null;
    const base = { birthProfileId, depth, question: question || undefined, weighRetrogradeMercury };
    if (type === 'event_date') {
      if (!eventDate) return null;
      return { type: 'event_date', ...base, eventDate };
    }
    if (type === 'period_map') {
      if (!periodStart || !periodEnd) return null;
      return { type: 'period_map', ...base, periodStart, periodEnd };
    }
    if (!intervalStart || !intervalEnd) return null;
    return { type: 'electives_question', ...base, intervalStart, intervalEnd };
  }

  async function onSubmit(): Promise<void> {
    const subject = buildSubject();
    if (!subject) return;
    setSubmitting(true);
    setError(null);
    try {
      const order = await api.post<OrderResponse>('/orders', { kind: 'custom_forecast', subject });
      setActiveOrder(order);
      if (order.status !== 'delivered') pollOrder(order.id);
      else void refreshOrders();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось создать заказ.');
    } finally {
      setSubmitting(false);
    }
  }

  const priceKop = CUSTOM_FORECAST_CATALOG[type][depth].priceKop;
  const canSubmit = Boolean(birthProfileId) && Boolean(buildSubject());

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px 64px' }}>
      <Paragraph>
        <a href="/app">← В кабинет</a>
      </Paragraph>
      <Title level={2}>Индивидуальный прогноз</Title>
      <Paragraph type="secondary">
        Расчёт по прозрачным правилам поверх вашей натальной карты — подробности на странице{' '}
        <a href="/methodology">методологии</a>.
      </Paragraph>
      <InfoDisclaimer />

      <Card>
        <Form layout="vertical">
          <Form.Item label="Тип прогноза">
            <Select
              value={type}
              onChange={(v) => setType(v)}
              options={(Object.keys(TYPE_LABEL_RU) as CustomForecastType[]).map((t) => ({ value: t, label: TYPE_LABEL_RU[t] }))}
            />
          </Form.Item>

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

          {type === 'event_date' && (
            <Form.Item label="Дата события" required>
              <DatePicker
                style={{ width: '100%' }}
                onChange={(d) => setEventDate(d ? d.format('YYYY-MM-DD') : undefined)}
              />
            </Form.Item>
          )}

          {type === 'period_map' && (
            <Form.Item label="Период" required>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                onChange={(range) => {
                  setPeriodStart(range?.[0] ? range[0].format('YYYY-MM-DD') : undefined);
                  setPeriodEnd(range?.[1] ? range[1].format('YYYY-MM-DD') : undefined);
                }}
              />
              <Text type="secondary">Не более 90 дней.</Text>
            </Form.Item>
          )}

          {type === 'electives_question' && (
            <>
              <Form.Item label="Интервал поиска" required>
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  disabledDate={(d) => d.isBefore(new Date(new Date().setHours(0, 0, 0, 0)))}
                  onChange={(range) => {
                    setIntervalStart(range?.[0] ? range[0].format('YYYY-MM-DD') : undefined);
                    setIntervalEnd(range?.[1] ? range[1].format('YYYY-MM-DD') : undefined);
                  }}
                />
                <br />
                <Text type="secondary">Не более 120 дней.</Text>
              </Form.Item>
              <Form.Item>
                <Checkbox checked={weighRetrogradeMercury} onChange={(e) => setWeighRetrogradeMercury(e.target.checked)}>
                  Учитывать ретроградный Меркурий (для договоров, переговоров, поездок)
                </Checkbox>
              </Form.Item>
            </>
          )}

          <Form.Item label="Ваш вопрос (необязательно)">
            <Input.TextArea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Например: когда лучше подписать договор аренды?"
              rows={2}
              maxLength={500}
            />
          </Form.Item>

          <Form.Item label="Глубина расчёта">
            <Select
              value={depth}
              onChange={(v) => setDepth(v)}
              options={[
                { value: 'standard', label: 'Стандартная' },
                { value: 'deep', label: 'Расширенная (детальнее и дороже)' },
              ]}
            />
          </Form.Item>
        </Form>

        <Paragraph>
          Стоимость: <Text strong>{(priceKop / 100).toLocaleString('ru-RU')} ₽</Text>
        </Paragraph>
        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
        <Button type="primary" loading={submitting} disabled={!canSubmit} onClick={() => void onSubmit()}>
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
            <Alert
              type="error"
              showIcon
              message="Расчёт не удался"
              description={activeOrder.errorMessage ?? 'Попробуйте создать заказ ещё раз или обратитесь в поддержку.'}
            />
          )}
          {activeOrder.status !== 'delivered' && activeOrder.status !== 'cancelled' && (
            <Text type="secondary">Расчёт идёт в фоне — страница обновляется автоматически.</Text>
          )}
        </Card>
      )}

      <Title level={4} style={{ marginTop: 32 }}>
        Мои прогнозы
      </Title>
      {orders === null ? (
        <Spin size="small" />
      ) : (
        <List
          dataSource={orders.filter((o): o is OrderResponse & { subject: CustomForecastSubject } => o.kind === 'custom_forecast')}
          locale={{ emptyText: 'У вас пока нет заказанных индивидуальных прогнозов.' }}
          renderItem={(o) => (
            <List.Item
              actions={o.status === 'delivered' && o.pdfUrl ? [<a key="dl" href={o.pdfUrl} target="_blank" rel="noreferrer">Скачать</a>] : []}
            >
              <List.Item.Meta
                title={titleForOrder(o.subject)}
                description={`${ORDER_STATUS_LABEL_RU[o.status] ?? o.status} · ${new Date(o.createdAt).toLocaleDateString('ru-RU')}`}
              />
            </List.Item>
          )}
        />
      )}
    </main>
  );
}
