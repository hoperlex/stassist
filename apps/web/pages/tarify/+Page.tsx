import { Button, Card, Col, Row, Tag, Typography } from 'antd';
// Импорт напрямую из подмодуля (а НЕ `from '@stassist/shared'`) — баррель тянет node:crypto в
// клиентский бандл (тот же приём, что apps/web/pages/app/zakazat-pdf/+Page.tsx).
import { PLAN_CATALOG } from '@stassist/shared/schemas/billing.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';

const { Title, Paragraph, Text } = Typography;

function formatPrice(priceKop: number, period: 'none' | 'month' | 'year'): string {
  if (priceKop === 0) return 'Бесплатно';
  const rub = (priceKop / 100).toLocaleString('ru-RU');
  return `${rub} ₽${period === 'month' ? ' / мес' : period === 'year' ? ' / год' : ''}`;
}

/** `/tarify` — публичная страница тарифов (владелец Ф8, находка [страницы-без-владельца] f8.md;
 *  промт req.2 «349 ₽/мес, 2 490 ₽/год, триал 7 дней»). Цены и фичи — из `PLAN_CATALOG` (единый
 *  источник правды с API, см. packages/shared/src/schemas/billing.ts) — не задублированы «на глаз». */
export function Page(): React.JSX.Element {
  const plans = Object.values(PLAN_CATALOG);

  return (
    <main style={{ maxWidth: 960, margin: '48px auto', padding: '0 24px 64px' }}>
      <Title style={{ textAlign: 'center' }}>Тарифы</Title>
      <Paragraph style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
        Базовые расчёты и первый ИИ-разбор — бесплатно и без ограничения по времени. Премиум
        открывает полную персональную ленту прогнозов, безлимитный чат с астропомощником и скидку
        на платные отчёты. Пробный период — 7 дней, отмена в один клик в любой момент.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {plans.map((plan) => (
          <Col xs={24} md={8} key={plan.code}>
            <Card
              style={{ height: '100%' }}
              title={
                <span>
                  {plan.titleRu}
                  {plan.code === 'premium_y' && (
                    <Tag color="gold" style={{ marginLeft: 8 }}>
                      Выгоднее
                    </Tag>
                  )}
                </span>
              }
            >
              <Title level={3}>{formatPrice(plan.priceKop, plan.period)}</Title>
              {plan.trialDays > 0 && <Text type="secondary">Первые {plan.trialDays} дней — бесплатно</Text>}
              <ul style={{ marginTop: 16, paddingLeft: 20 }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ marginBottom: 8 }}>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                type={plan.code === 'free' ? 'default' : 'primary'}
                block
                href={plan.code === 'free' ? '/register' : '/app/podpiska'}
              >
                {plan.code === 'free' ? 'Начать бесплатно' : 'Оформить подписку'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Paragraph style={{ marginTop: 40 }}>
        <Text strong>Отмена в любой момент.</Text> Подписку можно отменить одним кликом в личном
        кабинете — доступ к премиум-функциям сохранится до конца уже оплаченного периода, повторное
        списание не произойдёт. Оплата принимается через ЮKassa: банковские карты и Систему быстрых
        платежей (СБП).
      </Paragraph>

      <InfoDisclaimer />
    </main>
  );
}
