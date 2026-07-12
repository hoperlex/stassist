import { useEffect, useState } from 'react';
import { Alert, Button, Card, Skeleton, Typography } from 'antd';
import type { PersonalHoroscopeResponse } from '@stassist/shared';
import { api, ApiError } from './api-client.js';

const { Paragraph, Title } = Typography;

/**
 * Персональный гороскоп профиля (requirement 4 промта Ф5): краткая версия — всегда, полная —
 * пейвол-заглушка (см. apps/api/src/routes/personal-horoscope.ts). Генерация лениво при заходе.
 */
export function PersonalHoroscopeCard({ birthProfileId }: { birthProfileId: string }): React.JSX.Element | null {
  const [data, setData] = useState<PersonalHoroscopeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<PersonalHoroscopeResponse>(`/personal-horoscope?birthProfileId=${birthProfileId}&period=day`)
      .then(setData)
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : 'Не удалось загрузить персональный гороскоп.'))
      .finally(() => setLoading(false));
  }, [birthProfileId]);

  if (loading) {
    return (
      <Card style={{ marginBottom: 16 }}>
        <Skeleton active paragraph={{ rows: 2 }} />
      </Card>
    );
  }
  if (error) return <Alert type="warning" showIcon message={error} style={{ marginBottom: 16 }} />;
  if (!data || !data.computed) return null;

  return (
    <Card style={{ marginBottom: 16 }} title="Персональный гороскоп на сегодня">
      <Paragraph>{data.summaryMd}</Paragraph>
      {data.unlocked ? (
        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{data.fullMd}</Paragraph>
      ) : (
        <>
          <Title level={5}>Полный разбор — по подписке</Title>
          <Button type="primary" disabled>
            Оформить подписку (скоро)
          </Button>
        </>
      )}
    </Card>
  );
}
