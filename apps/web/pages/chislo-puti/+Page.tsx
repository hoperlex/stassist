import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Input, Statistic, Typography } from 'antd';
import { api, ApiError } from '../../lib/api-client.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import { ContentPendingNotice } from '../../lib/ContentPendingNotice.js';
import { fetchInterpretationText, type InterpretationText } from '../../lib/interpretation.js';
import { InterpretationBlock } from '../../lib/InterpretationBlock.js';

const { Title, Paragraph } = Typography;

interface LifePathResultDto {
  digitSum: number;
  lifePathNumber: number;
}

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** `/chislo-puti` — калькулятор числа жизненного пути (нумерология, см. docs/roadmap/prompts/
 *  f3-калькуляторы-и-карта.md требование 2). Расчёт — реальная детерминированная арифметика
 *  (`@stassist/numerology-core`, через `/api/v1/calc/numerology/life-path`); краткое ТЕКСТОВОЕ
 *  значение числа — контент Ф4 (см. §6 конвенций реализации), здесь — честный empty-state. */
export function Page(): React.JSX.Element {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<LifePathResultDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interpretation, setInterpretation] = useState<InterpretationText | null>(null);

  useEffect(() => {
    if (!result) {
      setInterpretation(null);
      return;
    }
    let cancelled = false;
    void fetchInterpretationText([`numerology:life_path:${result.lifePathNumber}`]).then((map) => {
      if (!cancelled) setInterpretation(map[`numerology:life_path:${result.lifePathNumber}`] ?? null);
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
      const data = await api.post<LifePathResultDto>('/calc/numerology/life-path', {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось рассчитать число.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Число жизненного пути</Title>
      <Paragraph>
        Число жизненного пути (ЧЖП) — сквозная сумма всех цифр даты рождения, редуцированная до
        одной цифры (1–9) либо мастер-числа 11/22.
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
        <Card style={{ marginTop: 24, textAlign: 'center' }}>
          <Statistic title="Число жизненного пути" value={result.lifePathNumber} />
          <Paragraph type="secondary" style={{ marginTop: 8 }}>
            Сумма всех цифр даты: {result.digitSum}
          </Paragraph>
          {interpretation ? (
            <div style={{ textAlign: 'left', marginTop: 16 }}>
              <InterpretationBlock entry={interpretation} />
            </div>
          ) : (
            <ContentPendingNotice what="Краткое текстовое значение числа жизненного пути" />
          )}
          <div style={{ marginTop: 16 }}>
            <Button type="primary" href="/app/zakazat-pdf?productType=numerology_profile_pdf">
              Заказать нумерологический профиль (PDF, 10–15 стр.)
            </Button>
          </div>
        </Card>
      )}
    </main>
  );
}
