import { Alert, Card, List, Tag, Typography } from 'antd';
import type { WikiSectionData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: WikiSectionData } }): React.JSX.Element {
  const { sectionNameRu, articles } = pageContext.data;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/wiki">← База знаний</a>
      </Paragraph>
      <Title level={1}>{sectionNameRu}</Title>

      {articles.length === 0 ? (
        <Alert type="warning" showIcon message="Раздел наполняется" description="Статьи этого раздела готовятся редакцией — загляните позже." />
      ) : (
        <Card>
          <List
            dataSource={articles}
            renderItem={(a) => (
              <List.Item>
                <a href={`/wiki/${a.section}/${a.slug}`}>{a.title}</a>
                {a.status === 'draft' && <Tag style={{ marginLeft: 8 }}>черновик</Tag>}
              </List.Item>
            )}
          />
        </Card>
      )}
    </main>
  );
}
