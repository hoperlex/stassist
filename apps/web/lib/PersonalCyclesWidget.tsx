import { useEffect, useState } from 'react';
import { Card, Empty, Skeleton, Space, Typography } from 'antd';
import type { PersonalCyclesWidgetResponse } from '@stassist/shared';
import { api, ApiError, getAccessToken } from './api-client.js';

const { Title, Paragraph, Text } = Typography;

/** Виджет «ваш персональный год/месяц/день» кабинета (req.6 промта Ф6) — ежедневный контент для
 *  возврата. Честный empty-state, если у пользователя ещё нет ни одного профиля рождения. */
export function PersonalCyclesWidget(): React.JSX.Element | null {
  const [data, setData] = useState<PersonalCyclesWidgetResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAccessToken()) return;
    api
      .get<PersonalCyclesWidgetResponse>('/personal-cycles')
      .then(setData)
      .catch((err: unknown) => {
        if (!(err instanceof ApiError)) console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!getAccessToken()) return null;

  return (
    <Card title="Ваш персональный день, месяц и год" style={{ marginTop: 24 }}>
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : !data?.computed ? (
        <Empty description={
          <span>
            Создайте профиль рождения, чтобы увидеть персональные циклы — <a href="/profiles/new">добавить профиль</a>.
          </span>
        } />
      ) : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              Персональный день: {data.personalDay}
            </Title>
            {data.dayText && <Paragraph style={{ marginTop: 4 }}>{data.dayText}</Paragraph>}
          </div>
          <div>
            <Text strong>Персональный месяц: {data.personalMonth}</Text>
            {data.monthText && <Paragraph style={{ marginTop: 4 }}>{data.monthText}</Paragraph>}
          </div>
          <div>
            <Text strong>Персональный год: {data.personalYear}</Text>
            {data.yearText && <Paragraph style={{ marginTop: 4 }}>{data.yearText}</Paragraph>}
          </div>
        </Space>
      )}
    </Card>
  );
}
