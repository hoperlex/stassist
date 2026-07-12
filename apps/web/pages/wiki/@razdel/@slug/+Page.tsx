import { Alert, Card, Typography } from 'antd';
import type { WikiArticlePageData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: WikiArticlePageData } }): React.JSX.Element {
  const { article, section, slug } = pageContext.data;

  if (!article) {
    return (
      <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
        <Paragraph>
          <a href="/wiki">← База знаний</a>
        </Paragraph>
        <Alert type="warning" showIcon message="Статья не найдена" description="Возможно, она ещё не опубликована." />
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/wiki">База знаний</a> → <a href={`/wiki/${section}`}>{section}</a>
      </Paragraph>
      <Title level={1}>{article.title}</Title>
      {article.status === 'draft' && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message="Черновик, требует редактуры"
          description="Статья сгенерирована детерминированным шаблоном на основе корпуса интерпретаций — редакция ещё не вычитала её окончательно."
        />
      )}
      <Card>
        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{article.bodyMd}</Paragraph>
      </Card>
      <Paragraph style={{ marginTop: 16 }}>
        <a href="/natalnaya-karta">Рассчитать свою натальную карту →</a> · <a href={`/wiki/${section}`}>Все статьи раздела →</a> · <a href={`/wiki/poisk?q=${encodeURIComponent(slug)}`}>Похожие статьи →</a>
      </Paragraph>
    </main>
  );
}
