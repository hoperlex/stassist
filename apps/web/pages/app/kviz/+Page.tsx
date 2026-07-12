import { useEffect, useState } from 'react';
import { Alert, Button, Card, Radio, Space, Typography } from 'antd';
// Импорт напрямую из подмодуля (а НЕ `from '@stassist/shared'`) — баррель тянет node:crypto в
// клиентский бандл (тот же приём, что apps/web/pages/app/zakazat-pdf/+Page.tsx).
import { QUIZ_CODE, QUIZ_QUESTIONS } from '@stassist/shared/schemas/quiz.js';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Paragraph } = Typography;

/**
 * `/app/kviz` — квиз-онбординг (req.3 промта Ф8): 7 вопросов о сфере интереса/опыте/целях,
 * после отправки → редирект на пейвол (`/app/pejvol`), персонализированный по ответам. Квиз
 * можно пропустить («Пропустить и посмотреть тарифы») — не блокируем пользователя.
 */
export function Page(): React.JSX.Element {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=' + encodeURIComponent('/app/kviz');
    }
  }, []);

  function setAnswer(questionCode: string, optionCode: string): void {
    setAnswers((prev) => ({ ...prev, [questionCode]: optionCode }));
  }

  async function submit(): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/quiz/answers', { quizCode: QUIZ_CODE, answers });
      const sphere = answers.sphere;
      window.location.href = sphere ? `/app/pejvol?sphere=${encodeURIComponent(sphere)}` : '/app/pejvol';
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось сохранить ответы.');
      setSubmitting(false);
    }
  }

  const allAnswered = QUIZ_QUESTIONS.every((q) => Boolean(answers[q.code]));

  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px 64px' }}>
      <Title level={3}>Расскажите немного о себе</Title>
      <Paragraph type="secondary">
        7 коротких вопросов — поможет настроить персональную ленту прогнозов под ваши интересы.
        Можно пропустить.
      </Paragraph>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {QUIZ_QUESTIONS.map((q) => (
          <Card key={q.code} size="small" title={q.textRu}>
            <Radio.Group onChange={(e) => setAnswer(q.code, e.target.value)} value={answers[q.code]}>
              <Space direction="vertical">
                {q.options.map((o) => (
                  <Radio key={o.code} value={o.code}>
                    {o.labelRu}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
        ))}
      </Space>

      <Space style={{ marginTop: 24 }}>
        <Button type="primary" disabled={!allAnswered} loading={submitting} onClick={() => void submit()}>
          Продолжить
        </Button>
        <Button href="/app/pejvol">Пропустить и посмотреть тарифы</Button>
      </Space>
    </main>
  );
}
