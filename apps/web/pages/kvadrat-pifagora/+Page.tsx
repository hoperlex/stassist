import { useState } from 'react';
import { Alert, Button, Card, Descriptions, Form, Input, Typography } from 'antd';
import { api, ApiError } from '../../lib/api-client.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { ContentPendingNotice } from '../../lib/ContentPendingNotice.js';

const { Title, Paragraph } = Typography;

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
          <ContentPendingNotice what="Текстовые значения ячеек психоматрицы (характер/энергия/интерес и т.п.)" />
        </Card>
      )}
    </main>
  );
}
