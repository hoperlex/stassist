import { useState } from 'react';
import { Alert, Button, Card, Divider, Table, Typography } from 'antd';
import { ChartWheel, BODY_NAMES_RU } from '@stassist/ui';
import type { SynastryCalcResponse } from '@stassist/shared';
import { api, ApiError } from '../../../lib/api-client.js';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import { ContentPendingNotice } from '../../../lib/ContentPendingNotice.js';
import { PublicBirthForm, type PublicBirthValue } from '../../../lib/PublicBirthForm.js';
import { ShareButton } from '../../../lib/ShareButton.js';
import type { SovmestimostPairData } from './+data.js';

const { Title, Paragraph } = Typography;

const ASPECT_NAMES_RU: Record<string, string> = {
  conjunction: 'соединение', opposition: 'оппозиция', trine: 'трин', square: 'квадрат',
  sextile: 'секстиль', quincunx: 'квинконс', semisextile: 'полусекстиль', semisquare: 'полуквадрат',
  sesquiquadrate: 'полутораквадрат', quintile: 'квинтиль', biquintile: 'биквинтиль',
};

function bodyLabel(prefixedKey: string): string {
  const [prefix, key] = prefixedKey.split(':');
  const name = key ? (BODY_NAMES_RU[key] ?? key) : prefixedKey;
  return `${name} (${prefix === 'a' ? 'A' : 'B'})`;
}

/** `/sovmestimost/{a}-i-{b}` — страница пары совместимости: статический текст (Ф4, пока
 *  empty-state) + виджет расчёта синастрии по датам рождения (см. docs/roadmap/prompts/
 *  f3-калькуляторы-и-карта.md требование 2). */
export function Page({ pageContext }: { pageContext: { data: SovmestimostPairData } }): React.JSX.Element {
  const { nameA, nameB, bodyMd } = pageContext.data;
  const [birthA, setBirthA] = useState<PublicBirthValue | null>(null);
  const [birthB, setBirthB] = useState<PublicBirthValue | null>(null);
  const [result, setResult] = useState<SynastryCalcResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCalculate(): Promise<void> {
    if (!birthA || !birthB) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.post<SynastryCalcResponse>('/calc/synastry', { a: birthA, b: birthB });
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось рассчитать совместимость.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 880, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/sovmestimost">← Все пары совместимости</a>
      </Paragraph>
      <Title level={1}>
        Совместимость {nameA} и {nameB}
      </Title>
      <InfoDisclaimer />

      {bodyMd ? (
        <Card style={{ marginBottom: 24 }}>
          <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{bodyMd}</Paragraph>
        </Card>
      ) : (
        <ContentPendingNotice what={`Текст разбора пары «${nameA} и ${nameB}»`} />
      )}

      <Divider />
      <Title level={3}>Рассчитать синастрию по датам рождения</Title>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Card style={{ flex: '1 1 320px' }}>
          <PublicBirthForm label="Партнёр A" onChange={setBirthA} />
        </Card>
        <Card style={{ flex: '1 1 320px' }}>
          <PublicBirthForm label="Партнёр B" onChange={setBirthB} />
        </Card>
      </div>
      {error && <Alert type="error" showIcon message={error} style={{ margin: '16px 0' }} />}
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        disabled={!birthA || !birthB}
        loading={loading}
        onClick={() => void onCalculate()}
      >
        Рассчитать совместимость
      </Button>

      {result && (
        <>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ChartWheel
              primary={{
                bodies: result.a.bodies, points: result.a.points, angles: result.a.angles,
                houses: result.a.houses, aspects: result.a.aspects, noHouses: result.a.meta.noHouses,
              }}
              secondary={{
                bodies: result.b.bodies, points: result.b.points, angles: result.b.angles,
                houses: result.b.houses, aspects: result.b.aspects, noHouses: result.b.meta.noHouses,
              }}
              crossAspects={result.crossAspects}
              title={`Синастрия: ${nameA} и ${nameB}`}
              size={460}
            />
          </div>
          {result.crossAspects.length > 0 && (
            <Table
              style={{ marginTop: 16 }}
              size="small"
              pagination={{ pageSize: 10 }}
              rowKey={(a) => `${a.bodyA}-${a.bodyB}-${a.angleName}`}
              dataSource={result.crossAspects}
              columns={[
                { title: 'Партнёр A', dataIndex: 'bodyA', render: bodyLabel },
                { title: 'Аспект', dataIndex: 'angleName', render: (k: string) => ASPECT_NAMES_RU[k] ?? k },
                { title: 'Партнёр B', dataIndex: 'bodyB', render: bodyLabel },
                { title: 'Орбис', dataIndex: 'orbDeg', render: (d: number) => `${d.toFixed(1)}°` },
              ]}
            />
          )}
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <ShareButton
              kind="synastry"
              positions={result.a}
              positionsB={result.b}
              label="Поделиться результатом"
            />
          </div>
        </>
      )}
    </main>
  );
}
