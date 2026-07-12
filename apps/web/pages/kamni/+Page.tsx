import { useMemo, useState } from 'react';
import { Alert, Card, Col, Empty, Row, Select, Tag, Typography } from 'antd';
// Импорт напрямую из подмодулей (а НЕ `from '@stassist/shared'`) — баррель-индекс тянет серверные
// порты/node:crypto в клиентский бандл (тот же приём, что pages/natalnaya-karta/+Page.tsx).
import { STONE_PLANETS, STONE_PURPOSES } from '@stassist/shared/schemas/stone.js';
import { ZODIAC_SIGN_EN_SLUGS } from '@stassist/shared/schemas/zodiac.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { ZODIAC_EN_TO_NAME_RU, STONE_PLANET_NAME_RU, STONE_PURPOSE_NAME_RU } from '../../lib/kamni-labels.js';
import type { KamniIndexData } from './+data.js';

const { Title, Paragraph, Text } = Typography;

/** `/kamni` — каталог камней с фильтрами по знаку/планете/назначению (req.4 промта Ф6). Фильтры —
 *  клиентская интерактивная «остров»-гидратация поверх SSR-списка (см. doc-комментарий +data.ts). */
export function Page({ pageContext }: { pageContext: { data: KamniIndexData } }): React.JSX.Element {
  const { stones } = pageContext.data;
  const [sign, setSign] = useState<string | undefined>(undefined);
  const [planet, setPlanet] = useState<string | undefined>(undefined);
  const [purpose, setPurpose] = useState<string | undefined>(undefined);

  const filtered = useMemo(
    () =>
      stones.filter(
        (s) =>
          (!sign || s.zodiacSigns.includes(sign as never)) &&
          (!planet || s.planets.includes(planet as never)) &&
          (!purpose || s.purposes.includes(purpose as never)),
      ),
    [stones, sign, planet, purpose],
  );

  return (
    <main style={{ maxWidth: 960, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Камни и минералы</Title>
      <Paragraph>
        Каталог камней: свойства, соответствия знакам зодиака, планетам, чакрам и арканам матрицы
        судьбы. Фильтруйте по знаку, планете или назначению — «на деньги», «на любовь», «для
        здоровья» и другим.
      </Paragraph>
      <InfoDisclaimer />

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <Select
          allowClear
          placeholder="Знак зодиака"
          style={{ width: 200 }}
          value={sign}
          onChange={setSign}
          options={ZODIAC_SIGN_EN_SLUGS.map((s) => ({ value: s, label: ZODIAC_EN_TO_NAME_RU[s] }))}
        />
        <Select
          allowClear
          placeholder="Планета"
          style={{ width: 200 }}
          value={planet}
          onChange={setPlanet}
          options={STONE_PLANETS.map((p) => ({ value: p, label: STONE_PLANET_NAME_RU[p] }))}
        />
        <Select
          allowClear
          placeholder="Назначение"
          style={{ width: 220 }}
          value={purpose}
          onChange={setPurpose}
          options={STONE_PURPOSES.map((p) => ({ value: p, label: STONE_PURPOSE_NAME_RU[p] }))}
        />
      </div>

      {stones.length === 0 && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message="Каталог наполняется"
          description="Датасет камней готовится редакцией — карточки появятся в ближайшее время."
        />
      )}

      {filtered.length === 0 && stones.length > 0 ? (
        <Empty description="По выбранным фильтрам камней не найдено — попробуйте снять один из фильтров." />
      ) : (
        <Row gutter={[16, 16]}>
          {filtered.map((stone) => (
            <Col xs={24} sm={12} md={8} key={stone.slug}>
              <Card hoverable title={<a href={`/kamni/${stone.slug}`}>{stone.name}</a>}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {stone.colors.join(', ')}
                </Text>
                <div style={{ marginTop: 8 }}>
                  {stone.purposes.slice(0, 3).map((p) => (
                    <Tag key={p} color="gold">
                      {STONE_PURPOSE_NAME_RU[p]}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
}
