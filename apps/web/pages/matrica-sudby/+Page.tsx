import { useState } from 'react';
import { Alert, Button, Card, Descriptions, Form, Input, Tag, Typography } from 'antd';
import { MatrixOctagram } from '@stassist/ui';
import type { MatrixOfDestinyResult } from '@stassist/numerology-core';
import { api, ApiError } from '../../lib/api-client.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { ContentPendingNotice } from '../../lib/ContentPendingNotice.js';

const { Title, Paragraph, Text } = Typography;

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** `/matrica-sudby` — калькулятор матрицы судьбы (октаграмма), см. docs/roadmap/prompts/
 *  f3-калькуляторы-и-карта.md требование 2. 9 базовых точек — верифицированная часть метода
 *  (`corePointsMethodologyVerified: true`), производные секции — рабочая гипотеза
 *  (`derivedSections.methodologyVerified: false`, см. @stassist/numerology-core README) —
 *  обе пометки честно показаны пользователю, а не скрыты. */
export function Page(): React.JSX.Element {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<MatrixOfDestinyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCalculate(): Promise<void> {
    const match = DATE_RE.exec(date);
    if (!match) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.post<MatrixOfDestinyResult>('/calc/numerology/matrix-of-destiny', {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось рассчитать матрицу.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Матрица судьбы</Title>
      <Paragraph>
        Матрица судьбы (октаграмма) строится из даты рождения и связывает 9 базовых точек с
        22 арканами Таро.
      </Paragraph>
      <InfoDisclaimer />

      <Card>
        <Form layout="vertical">
          <Form.Item label="Дата рождения" required>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Item>
        </Form>
        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
        <Button type="primary" disabled={!DATE_RE.test(date)} loading={loading} onClick={() => void onCalculate()}>
          Рассчитать
        </Button>
      </Card>

      {result && (
        <Card style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MatrixOctagram corePoints={result.corePoints} title="Матрица судьбы" size={380} />
          </div>

          <Descriptions column={2} size="small" style={{ marginTop: 16 }}>
            <Descriptions.Item label="Линия отношений (F1+F3)">{result.derivedSections.relationshipLine}</Descriptions.Item>
            <Descriptions.Item label="Денежная линия (F2+F4)">{result.derivedSections.moneyLine}</Descriptions.Item>
          </Descriptions>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
            <Tag color="gold">рабочая гипотеза</Tag>
            Производные секции (чакры, предназначения, линии) считаются по одной из общепринятых
            схем метода — единого стандарта между сервисами нет, методика требует сверки редакцией.
          </Text>

          <ContentPendingNotice what="Текстовые трактовки арканов (1–22) для каждой позиции матрицы" />

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Button disabled title="PDF-отчёт матрицы судьбы — в разработке (Ф6)">
              Скачать PDF (скоро)
            </Button>
          </div>
        </Card>
      )}
    </main>
  );
}
