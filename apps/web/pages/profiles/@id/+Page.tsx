import { useEffect, useState } from 'react';
import { Alert, Card, Descriptions, Spin, Table, Typography } from 'antd';
import { ChartWheel } from '@stassist/ui';
import type { ChartData } from '@stassist/shared';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';
import { PersonalHoroscopeCard } from '../../../lib/PersonalHoroscopeCard.js';

const { Title, Paragraph } = Typography;

interface ChartDto {
  kind: string;
  coreVersion: string;
  data: ChartData;
}

const SIGN_NAMES_RU = [
  'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева',
  'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы',
];

const BODY_NAMES_RU: Record<string, string> = {
  sun: 'Солнце', moon: 'Луна', mercury: 'Меркурий', venus: 'Венера', mars: 'Марс',
  jupiter: 'Юпитер', saturn: 'Сатурн', uranus: 'Уран', neptune: 'Нептун', pluto: 'Плутон', chiron: 'Хирон',
};

/**
 * Просмотр натальной карты профиля: SVG-колесо (`@stassist/ui` ChartWheel, тот же изоморфный
 * компонент, что и на публичном калькуляторе `/natalnaya-karta`, см. docs/architecture/
 * 21-техническая-архитектура.md §6) + таблица «как считали» (планеты/знаки/дома).
 */
export function Page(): React.JSX.Element {
  const [chart, setChart] = useState<ChartDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/profiles';
      return;
    }
    const id = window.location.pathname.split('/').filter(Boolean).pop();
    if (!id) return;
    setProfileId(id);
    api
      .get<ChartDto>(`/birth-profiles/${id}/chart`)
      .then(setChart)
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : 'Не удалось загрузить карту.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: 720, margin: '64px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/profiles">← Ко всем профилям</a>
      </Paragraph>
      {profileId && <PersonalHoroscopeCard birthProfileId={profileId} />}
      <Title level={3}>Натальная карта</Title>
      {loading && <Spin />}
      {error && <Alert type="error" showIcon message={error} />}
      {chart && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <ChartWheel
              primary={{
                bodies: chart.data.bodies,
                points: chart.data.points,
                angles: chart.data.angles,
                houses: chart.data.houses,
                aspects: chart.data.aspects,
                noHouses: chart.data.meta.noHouses,
              }}
              title="Натальная карта профиля"
              size={360}
            />
          </div>
          <Descriptions column={2} size="small" style={{ marginBottom: 16 }}>
            <Descriptions.Item label="Система домов">{chart.data.meta.houseSystem}</Descriptions.Item>
            <Descriptions.Item label="Зодиак">{chart.data.meta.zodiac === 'tropical' ? 'тропический' : 'сидерический'}</Descriptions.Item>
            <Descriptions.Item label="Версия ядра">{chart.coreVersion}</Descriptions.Item>
            <Descriptions.Item label="Дома рассчитаны">{chart.data.meta.noHouses ? 'нет (время неизвестно)' : 'да'}</Descriptions.Item>
          </Descriptions>
          <Table
            size="small"
            pagination={false}
            rowKey="key"
            dataSource={Object.entries(chart.data.bodies).map(([key, pos]) => ({ key, ...pos }))}
            columns={[
              { title: 'Планета', dataIndex: 'key', render: (key: string) => BODY_NAMES_RU[key] ?? key },
              { title: 'Знак', dataIndex: 'signIndex', render: (i: number) => SIGN_NAMES_RU[i] },
              { title: 'Градус', dataIndex: 'signDegree', render: (d: number) => `${d.toFixed(1)}°` },
              { title: 'Дом', dataIndex: 'houseNumber', render: (h: number | null) => h ?? '—' },
              { title: 'Ретро', dataIndex: 'isRetrograde', render: (r: boolean) => (r ? 'да' : 'нет') },
            ]}
          />
          {chart.data.meta.accuracyNotes.length > 0 && (
            <Alert
              style={{ marginTop: 16 }}
              type="info"
              showIcon
              message="Примечания расчёта"
              description={chart.data.meta.accuracyNotes.join(' ')}
            />
          )}
        </Card>
      )}
    </main>
  );
}
