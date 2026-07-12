import { useState } from 'react';
import { Alert, Button, Card, Divider, Table, Typography } from 'antd';
import { ChartWheel, BODY_NAMES_RU, SIGN_NAMES_RU } from '@stassist/ui';
import type { ChartData } from '@stassist/shared';
import { api, ApiError } from '../../lib/api-client.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { ContentPendingNotice } from '../../lib/ContentPendingNotice.js';
import { PublicBirthForm, type PublicBirthValue } from '../../lib/PublicBirthForm.js';
import { ShareButton } from '../../lib/ShareButton.js';

const { Title, Paragraph } = Typography;

const ASPECT_NAMES_RU: Record<string, string> = {
  conjunction: 'соединение', opposition: 'оппозиция', trine: 'трин', square: 'квадрат',
  sextile: 'секстиль', quincunx: 'квинконс', semisextile: 'полусекстиль', semisquare: 'полуквадрат',
  sesquiquadrate: 'полутораквадрат', quintile: 'квинтиль', biquintile: 'биквинтиль',
};

/**
 * `/natalnaya-karta` — публичный калькулятор натальной карты (см. docs/roadmap/prompts/
 * f3-калькуляторы-и-карта.md требование 2). Анонимный расчёт: форма → `POST /api/v1/calc/natal`
 * → ChartWheel + таблица позиций/аспектов. Результат живёт только в состоянии страницы
 * (localStorage — см. ниже), ничего не отправляется на сервер для хранения.
 */
export function Page(): React.JSX.Element {
  const [birth, setBirth] = useState<PublicBirthValue | null>(null);
  const [chart, setChart] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCalculate(): Promise<void> {
    if (!birth) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.post<ChartData>('/calc/natal', birth);
      setChart(data);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem('stassist.lastNatalChart', JSON.stringify({ birth, data, savedAt: Date.now() }));
        } catch {
          /* localStorage может быть недоступен (приватный режим) — не критично */
        }
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось рассчитать карту.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 880, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Натальная карта онлайн бесплатно</Title>
      <Paragraph>
        Укажите дату, время и место рождения — рассчитаем положения планет, дома и аспекты и
        нарисуем колесо карты. Если точное время рождения неизвестно, отметьте это — карта
        построится без домов.
      </Paragraph>
      <InfoDisclaimer />

      <Card>
        <PublicBirthForm label="Данные рождения" onChange={setBirth} />
        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
        <Button type="primary" disabled={!birth} loading={loading} onClick={() => void onCalculate()}>
          Рассчитать карту
        </Button>
      </Card>

      {chart && (
        <>
          <Divider />
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 auto' }}>
              <ChartWheel
                primary={{
                  bodies: chart.bodies,
                  points: chart.points,
                  angles: chart.angles,
                  houses: chart.houses,
                  aspects: chart.aspects,
                  noHouses: chart.meta.noHouses,
                }}
                title="Натальная карта"
                size={420}
              />
            </div>
            <div style={{ flex: '1 1 320px', minWidth: 280 }}>
              <Table
                size="small"
                pagination={false}
                rowKey="key"
                dataSource={Object.entries(chart.bodies).map(([key, pos]) => ({ key, ...pos }))}
                columns={[
                  { title: 'Планета', dataIndex: 'key', render: (key: string) => BODY_NAMES_RU[key] ?? key },
                  { title: 'Знак', dataIndex: 'signIndex', render: (i: number) => SIGN_NAMES_RU[i] },
                  { title: 'Градус', dataIndex: 'signDegree', render: (d: number) => `${d.toFixed(1)}°` },
                  { title: 'Дом', dataIndex: 'houseNumber', render: (h: number | null) => h ?? '—' },
                  { title: 'Ретро', dataIndex: 'isRetrograde', render: (r: boolean) => (r ? 'да' : '—') },
                ]}
              />
              {chart.meta.accuracyNotes.length > 0 && (
                <Alert
                  style={{ marginTop: 12 }}
                  type="info"
                  showIcon
                  message="Примечания расчёта"
                  description={chart.meta.accuracyNotes.join(' ')}
                />
              )}
            </div>
          </div>

          {chart.aspects.length > 0 && (
            <>
              <Title level={4} style={{ marginTop: 24 }}>
                Аспекты
              </Title>
              <Table
                size="small"
                pagination={{ pageSize: 10 }}
                rowKey={(a) => `${a.bodyA}-${a.bodyB}-${a.angleName}`}
                dataSource={chart.aspects}
                columns={[
                  { title: 'Тело A', dataIndex: 'bodyA', render: (k: string) => BODY_NAMES_RU[k] ?? k },
                  { title: 'Аспект', dataIndex: 'angleName', render: (k: string) => ASPECT_NAMES_RU[k] ?? k },
                  { title: 'Тело B', dataIndex: 'bodyB', render: (k: string) => BODY_NAMES_RU[k] ?? k },
                  { title: 'Орбис', dataIndex: 'orbDeg', render: (d: number) => `${d.toFixed(1)}°` },
                ]}
              />
            </>
          )}

          <ContentPendingNotice what="Текстовые трактовки положений планет по знакам и домам" />

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <ShareButton kind="natal" positions={chart} label="Поделиться картой" />
          </div>

          <Card style={{ marginTop: 16, textAlign: 'center' }}>
            <Paragraph>
              Сохраните карту в личном кабинете, чтобы получить полный ИИ-разбор, отслеживать
              транзиты и вернуться к результату в любой момент.
            </Paragraph>
            <Button type="primary" href="/register">
              Сохранить карту и получить полный разбор
            </Button>
          </Card>
        </>
      )}
    </main>
  );
}
