import { useEffect, useState } from 'react';
import { Alert, Button, Card, Descriptions, Form, Input, Typography } from 'antd';
import { api, ApiError } from '../../lib/api-client.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { ContentPendingNotice } from '../../lib/ContentPendingNotice.js';
import { fetchInterpretationText, type InterpretationText } from '../../lib/interpretation.js';
import { InterpretationBlock } from '../../lib/InterpretationBlock.js';

const { Title, Paragraph } = Typography;

/** digit(1-9) → слаг ячейки (см. packages/llm/src/facts/numerology-positions.ts
 *  PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT — та же классическая раскладка квадрата Пифагора). */
const CELL_SLUG_BY_DIGIT: Record<number, { slug: string; label: string }> = {
  1: { slug: 'character', label: 'Характер' },
  2: { slug: 'energy', label: 'Энергия' },
  3: { slug: 'interest', label: 'Интерес' },
  4: { slug: 'health', label: 'Здоровье' },
  5: { slug: 'logic', label: 'Логика' },
  6: { slug: 'labor', label: 'Труд' },
  7: { slug: 'luck', label: 'Удача' },
  8: { slug: 'duty', label: 'Долг' },
  9: { slug: 'memory', label: 'Память' },
};

interface PsychoMatrixResultDto {
  number1: number;
  number2: number;
  number3: number;
  number4: number;
  grid: [[number, number, number], [number, number, number], [number, number, number]];
}

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
/** Традиционная раскладка квадрата Пифагора по столбцам: 1-4-7 / 2-5-8 / 3-6-9 (см.
 *  @stassist/numerology-core psycho-matrix.ts — та же раскладка). */
const DIGIT_LABELS: readonly (readonly number[])[] = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];

const cellStyle: React.CSSProperties = {
  border: '1px solid #d9d9d9',
  width: 64,
  height: 64,
  textAlign: 'center',
  fontSize: 20,
  fontFamily: 'monospace',
};

/** `/kvadrat-pifagora` — калькулятор психоматрицы (квадрата Пифагора), см. docs/roadmap/prompts/
 *  f3-калькуляторы-и-карта.md требование 2. Расчёт детерминированный (@stassist/numerology-core);
 *  краткие текстовые значения ячеек — контент Ф4 (§6 конвенций), здесь — честный empty-state. */
export function Page(): React.JSX.Element {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<PsychoMatrixResultDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [texts, setTexts] = useState<Record<string, InterpretationText>>({});

  useEffect(() => {
    if (!result) {
      setTexts({});
      return;
    }
    const keys = Object.values(CELL_SLUG_BY_DIGIT).map(({ slug }) => `numerology:matrix_cell:${slug}`);
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
      const data = await api.post<PsychoMatrixResultDto>('/calc/numerology/psycho-matrix', {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось рассчитать психоматрицу.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Квадрат Пифагора (психоматрица)</Title>
      <Paragraph>
        Психоматрица строится из цифр даты рождения и четырёх дополнительных чисел, разложенных в
        сетку 3×3 традиционного квадрата Пифагора.
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
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <table style={{ borderCollapse: 'collapse' }}>
              <tbody>
                {result.grid.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((count, colIndex) => (
                      <td key={colIndex} style={cellStyle}>
                        {count > 0 ? String(DIGIT_LABELS[rowIndex]![colIndex]).repeat(count) : '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Descriptions column={2} size="small">
            <Descriptions.Item label="Число (1)">{result.number1}</Descriptions.Item>
            <Descriptions.Item label="Число (2)">{result.number2}</Descriptions.Item>
            <Descriptions.Item label="Число (3)">{result.number3}</Descriptions.Item>
            <Descriptions.Item label="Число (4)">{result.number4}</Descriptions.Item>
          </Descriptions>
          {Object.keys(texts).length > 0 ? (
            <div style={{ marginTop: 16 }}>
              {Object.entries(CELL_SLUG_BY_DIGIT).map(([digit, { slug, label }]) => {
                const entry = texts[`numerology:matrix_cell:${slug}`];
                return entry ? <InterpretationBlock key={digit} title={label} entry={entry} /> : null;
              })}
            </div>
          ) : (
            <ContentPendingNotice what="Текстовые значения ячеек психоматрицы (характер/энергия/интерес и т.п.)" />
          )}
        </Card>
      )}
    </main>
  );
}
