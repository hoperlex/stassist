import { Typography } from 'antd';
import type { AuthorPageData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: AuthorPageData } }): React.JSX.Element {
  const { author } = pageContext.data;

  if (!author) {
    return (
      <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px' }}>
        <Title level={3}>Страница не найдена</Title>
        <Paragraph>
          Такой страницы редакции нет. Вернуться к <a href="/redakciya">списку редакции</a>.
        </Paragraph>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 680, margin: '48px auto', padding: '0 24px 64px' }}>
      <Title>{author.roleRu}</Title>
      {author.bioRu.map((paragraph, i) => (
        <Paragraph key={i}>{paragraph}</Paragraph>
      ))}

      <Title level={4} style={{ marginTop: 24 }}>
        Зона ответственности
      </Title>
      <ul>
        {author.responsibilitiesRu.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <Paragraph style={{ marginTop: 24 }}>
        <a href="/redakciya">← Вся редакция</a>
      </Paragraph>
    </main>
  );
}
