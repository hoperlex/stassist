import { useEffect, useState } from 'react';
import { Alert, Button, Card, Descriptions, Form, Input, Tag, Typography } from 'antd';
import { MatrixOctagram } from '@stassist/ui';
import type { MatrixOfDestinyResult } from '@stassist/numerology-core';
import { api, ApiError } from '../../lib/api-client.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { ContentPendingNotice } from '../../lib/ContentPendingNotice.js';
import { fetchInterpretationText, type InterpretationText } from '../../lib/interpretation.js';
import { InterpretationBlock } from '../../lib/InterpretationBlock.js';

const { Title, Paragraph, Text } = Typography;

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Слаг позиции (см. packages/llm/src/facts/matrix-positions.ts MATRIX_CORE_POINTS) + подпись. */
const CORE_POINT_LABELS: Array<{ field: keyof MatrixOfDestinyResult['corePoints']; slug: string; label: string }> = [
  { field: 'day', slug: 'point_day', label: 'День — личные качества' },
  { field: 'month', slug: 'point_month', label: 'Месяц — родовая задача (по маме)' },
  { field: 'yearSum', slug: 'point_year', label: 'Год — родовая задача (по папе)' },
  { field: 'tasks', slug: 'point_tasks', label: 'Задачи — главная жизненная задача' },
  { field: 'center', slug: 'point_center', label: 'Центр — зона комфорта' },
  { field: 'f1', slug: 'point_f1', label: 'Ф1' },
  { field: 'f2', slug: 'point_f2', label: 'Ф2' },
  { field: 'f3', slug: 'point_f3', label: 'Ф3' },
  { field: 'f4', slug: 'point_f4', label: 'Ф4' },
];

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
  const [texts, setTexts] = useState<Record<string, InterpretationText>>({});

  useEffect(() => {
    if (!result) {
      setTexts({});
      return;
    }
    const keys = [
      ...CORE_POINT_LABELS.map(({ field, slug }) => `arcanum:${result.corePoints[field]}:${slug}`),
      `arcanum:${result.derivedSections.relationshipLine}:relationship_line`,
      `arcanum:${result.derivedSections.moneyLine}:money_line`,
    ];
    let cancelled = false;
    void fetchInterpretationText(keys).then((map) => {
      if (!cancelled) setTexts(map);
    });
    return () => {
      cancelled = true;
    };
  }, [result]);

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

          {Object.keys(texts).length > 0 ? (
            <div style={{ marginTop: 16 }}>
              {CORE_POINT_LABELS.map(({ field, slug, label }) => {
                const entry = texts[`arcanum:${result.corePoints[field]}:${slug}`];
                return entry ? <InterpretationBlock key={slug} title={`${label} — Аркан ${result.corePoints[field]}`} entry={entry} /> : null;
              })}
              {texts[`arcanum:${result.derivedSections.relationshipLine}:relationship_line`] && (
                <InterpretationBlock
                  title={`Линия отношений — Аркан ${result.derivedSections.relationshipLine}`}
                  entry={texts[`arcanum:${result.derivedSections.relationshipLine}:relationship_line`]!}
                />
              )}
              {texts[`arcanum:${result.derivedSections.moneyLine}:money_line`] && (
                <InterpretationBlock
                  title={`Денежная линия — Аркан ${result.derivedSections.moneyLine}`}
                  entry={texts[`arcanum:${result.derivedSections.moneyLine}:money_line`]!}
                />
              )}
            </div>
          ) : (
            <ContentPendingNotice what="Текстовые трактовки арканов (1–22) для каждой позиции матрицы" />
          )}

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
