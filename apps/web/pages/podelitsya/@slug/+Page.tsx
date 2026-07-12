import { Alert, Typography } from 'antd';
import { ChartWheel } from '@stassist/ui';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import type { PodelitsyaData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: PodelitsyaData } }): React.JSX.Element {
  const { share } = pageContext.data;

  const title =
    share.kind === 'synastry' ? 'Карта совместимости' : share.kind === 'transit_day' ? 'Небо дня' : 'Натальная карта';

  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
      <Title level={1}>{title}</Title>
      {share.kind === 'transit_day' && share.caption && <Paragraph strong>{share.caption}</Paragraph>}
      <Paragraph>Результат расчёта на портале Зодиакум. Данные рождения не публикуются — только позиции карты.</Paragraph>
      <InfoDisclaimer />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ChartWheel
          primary={{ ...share.positions, noHouses: share.positions.meta.noHouses }}
          secondary={share.positionsB ? { ...share.positionsB, noHouses: share.positionsB.meta.noHouses } : undefined}
          theme={share.theme}
          title={title}
          size={420}
        />
      </div>

      {!share.ogImageReady && (
        <Alert
          style={{ marginTop: 16 }}
          type="info"
          showIcon
          message="Картинка для соцсетей ещё готовится"
          description="og:image появится в течение минуты после создания ссылки."
        />
      )}

      <Paragraph style={{ marginTop: 24 }}>
        {share.kind === 'transit_day' ? (
          <a href="/nebo-dnya">А как это небо у тебя? Узнать →</a>
        ) : (
          <a href="/natalnaya-karta">Рассчитать свою карту →</a>
        )}
      </Paragraph>
    </main>
  );
}
