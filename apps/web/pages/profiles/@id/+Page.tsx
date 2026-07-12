import { useEffect, useState } from 'react';
import { Alert, Card, Descriptions, Spin, Table, Typography } from 'antd';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Paragraph } = Typography;

interface ChartDto {
  kind: string;
  coreVersion: string;
  data: {
    meta: { houseSystem: string; zodiac: string; noHouses: boolean; accuracyNotes: string[] };
    bodies: Record<string, { signIndex: number; signDegree: number; houseNumber: number | null; isRetrograde: boolean }>;
  };
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
 * Просмотр натальной карты профиля (только факты — планеты/знаки/дома). Полноценный SVG-рендер
 * колеса карты (`packages/ui/ChartWheel`) — задел Ф3 (док. 21 §6), здесь — минимальная таблица
 * «как считали», достаточная, чтобы подтвердить: карта реально посчитана и сохранена.
 */
export function Page(): React.JSX.Element {
  const [chart, setChart] = useState<ChartDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/profiles';
      return;
    }
    const id = window.location.pathname.split('/').filter(Boolean).pop();
    if (!id) return;
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
      <Title level={3}>Натальная карта</Title>
      {loading && <Spin />}
      {error && <Alert type="error" showIcon message={error} />}
      {chart && (
        <Card>
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
