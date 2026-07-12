import { useEffect, useState } from 'react';
import { Card, Skeleton, Tag, Typography } from 'antd';
import type { StoneResponse } from '@stassist/shared';

const { Paragraph, Text } = Typography;

/**
 * Кросс-блок «ваши камни» (req.5 промта Ф6: «в результатах калькуляторов и PDF — блок «ваши
 * камни» (по знаку/аркану/числу)»): по аркану матрицы судьбы находит подходящие камни через
 * публичный `/api/v1/stones?arcanum=N`. Замыкает связку камень→аркан→камень корректными ссылками
 * (верификация промта Ф6: «кросс-блоки… замыкается корректными ссылками»).
 */
export function StonesForArcanumWidget({ arcanum }: { arcanum: number }): React.JSX.Element | null {
  const [stones, setStones] = useState<StoneResponse[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStones(null);
    fetch(`/api/v1/stones?arcanum=${arcanum}`)
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data: { items: StoneResponse[] }) => {
        if (!cancelled) setStones(data.items);
      })
      .catch(() => {
        if (!cancelled) setStones([]);
      });
    return () => {
      cancelled = true;
    };
  }, [arcanum]);

  if (stones === null) {
    return (
      <Card size="small" style={{ marginTop: 12 }}>
        <Skeleton active paragraph={{ rows: 1 }} title={false} />
      </Card>
    );
  }
  if (stones.length === 0) return null;

  return (
    <Card size="small" style={{ marginTop: 12 }} title={`Ваши камни (аркан ${arcanum})`}>
      <Paragraph style={{ marginBottom: 4 }}>
        {stones.map((s) => (
          <Tag key={s.slug} style={{ marginBottom: 4 }}>
            <a href={`/kamni/${s.slug}`}>{s.name}</a>
          </Tag>
        ))}
      </Paragraph>
      <Text type="secondary" style={{ fontSize: 12 }}>
        По традиции считается, что эти камни созвучны энергии аркана {arcanum}.{' '}
        <a href="/kamni">Смотреть весь каталог →</a>
      </Text>
    </Card>
  );
}
