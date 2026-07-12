import { useEffect, useState } from 'react';
import { Card, Skeleton, Space, Tag, Typography } from 'antd';
import type { AstroWeatherTodayResponse } from '@stassist/shared';
import { api } from './api-client.js';
import { MOON_PHASE_NAMES_RU } from './moon-phase-ru.js';

const { Text } = Typography;

const MOON_SIGN_NAMES_RU = ['Овне', 'Тельце', 'Близнецах', 'Раке', 'Льве', 'Деве', 'Весах', 'Скорпионе', 'Стрельце', 'Козероге', 'Водолее', 'Рыбах'];
const RETROGRADE_NAMES_RU: Record<string, string> = {
  mercury: 'Меркурий', venus: 'Венера', mars: 'Марс', jupiter: 'Юпитер',
  saturn: 'Сатурн', uranus: 'Уран', neptune: 'Нептун', pluto: 'Плутон',
};

/**
 * Виджет «астропогода сегодня» (requirement 3 промта Ф5: «на всех страницах гороскопов»).
 * Источник — `astro_calendar` через `/api/v1/calc/astro-weather/today` (единый источник для
 * «неба дня», см. находку [полнота] «дублирование astro_calendar и Ф5»). Клиентский самодостаточный
 * компонент (гидратируется после SSR) — не блокирует основной серверный рендер текста гороскопа.
 */
export function AstroWeatherWidget(): React.JSX.Element | null {
  const [data, setData] = useState<AstroWeatherTodayResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<AstroWeatherTodayResponse>('/calc/astro-weather/today')
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Card size="small" style={{ marginBottom: 16 }}>
        <Skeleton active paragraph={{ rows: 1 }} title={false} />
      </Card>
    );
  }
  if (!data || !data.computed) return null;

  return (
    <Card size="small" title="Астропогода сегодня" style={{ marginBottom: 16 }}>
      <Space direction="vertical" size={4}>
        {typeof data.moonSignIndex === 'number' && <Text>Луна в {MOON_SIGN_NAMES_RU[data.moonSignIndex] ?? 'знаке зодиака'}</Text>}
        {data.lunarDay && <Text>{data.lunarDay}-й лунный день</Text>}
        {data.phaseName && <Text>{MOON_PHASE_NAMES_RU[data.phaseName] ?? data.phaseName}</Text>}
        {data.isVoidOfCourse && <Tag color="default">Луна без курса</Tag>}
        {data.retrogradeBodies.length > 0 && (
          <Text type="secondary">Ретроградны: {data.retrogradeBodies.map((b) => RETROGRADE_NAMES_RU[b] ?? b).join(', ')}</Text>
        )}
      </Space>
    </Card>
  );
}
