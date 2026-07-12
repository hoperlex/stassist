import { Card, List, Typography } from 'antd';
import { AUTHORS } from '../../lib/authors.js';

const { Title, Paragraph } = Typography;

/** `/redakciya` — хаб редакции (E-E-A-T, doc 23 §5). Реальный, честный процесс: см.
 *  doc-комментарий apps/web/lib/authors.ts. */
export function Page(): React.JSX.Element {
  return (
    <main style={{ maxWidth: 760, margin: '48px auto', padding: '0 24px 64px' }}>
      <Title>Редакция</Title>
      <Paragraph>
        Расчёты на Зодиакум детерминированы (см. <a href="/methodology">методологию</a>), а
        сопроводительные тексты — вики, разборы, гороскопы — проходят редакционную проверку.
        Каждая статья базы знаний имеет видимый статус: <strong>«черновик»</strong> — материал
        сгенерирован по шаблону и ещё не вычитан вручную, <strong>«проверено»</strong> — прошёл
        редакторскую проверку фактов и формулировок. Мы не скрываем непроверенные материалы, а
        честно маркируем их — лучше видимый черновик, чем молчаливая выдумка.
      </Paragraph>

      <Title level={3} style={{ marginTop: 32 }}>
        Кто готовит материалы
      </Title>
      <List
        grid={{ gutter: 16, column: 2, xs: 1 }}
        dataSource={AUTHORS}
        renderItem={(author) => (
          <List.Item>
            <Card title={author.roleRu}>
              <Paragraph>{author.bioRu[0]}</Paragraph>
              <a href={`/redakciya/${author.slug}`}>Подробнее →</a>
            </Card>
          </List.Item>
        )}
      />

      <Title level={3} style={{ marginTop: 32 }}>
        Правила редакции
      </Title>
      <Paragraph>
        Материалы не содержат медицинских диагнозов, гарантий финансовых или иных результатов,
        обещаний конкретных событий («порча», «венец безбрачия») — такие формулировки
        отфильтровываются автоматически и удаляются при редакторской проверке. Полный список
        ограничений — в <a href="/disclaimer">дисклеймере</a>, для пользовательских публикаций —
        в <a href="/pravila-soobshchestva">правилах сообщества</a>.
      </Paragraph>
    </main>
  );
}
