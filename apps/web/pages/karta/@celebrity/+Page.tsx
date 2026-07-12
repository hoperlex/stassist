import { Alert, Card, List, Tag, Typography } from 'antd';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import type { CelebrityPageData } from './+data.js';

const { Title, Paragraph, Text } = Typography;

export function Page({ pageContext }: { pageContext: { data: CelebrityPageData } }): React.JSX.Element {
  const { celebrity, posts } = pageContext.data;

  if (!celebrity) {
    return (
      <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
        <Alert type="warning" showIcon message="Знаменитость не найдена" description="Такой карточки нет в галерее." />
      </main>
    );
  }

  const bd = celebrity.birthData;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>{celebrity.name}</Title>
      {bd && !bd.verified && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message="Требует проверки заказчиком"
          description={`Данные рождения — ${bd.source ?? 'источник не указан'}. Точность не подтверждена независимо — не используйте для точных астрологических выводов без сверки.`}
        />
      )}
      <InfoDisclaimer />

      <Card>
        {bd?.date && <Paragraph><b>Дата рождения:</b> {bd.date}</Paragraph>}
        {bd?.placeName && <Paragraph><b>Место рождения:</b> {bd.placeName}</Paragraph>}
        {celebrity.category && <Paragraph><b>Категория:</b> {celebrity.category}</Paragraph>}

        {!celebrity.hasEnoughDataToCompute ? (
          <Alert
            type="info"
            showIcon
            message="Карта пока не рассчитывается"
            description="Для расчёта натальной карты не хватает подтверждённых координат места и/или точного времени рождения — координаты требуют проверки перед публикацией расчёта."
          />
        ) : (
          <Text type="secondary">Расчёт карты по этим данным доступен в калькуляторе.</Text>
        )}
      </Card>

      <Card title="Обсуждение" style={{ marginTop: 24 }}>
        {posts.length === 0 ? (
          <Text type="secondary">Пока нет обсуждений этой карты — <a href="/login">войдите</a>, чтобы начать первым.</Text>
        ) : (
          <List
            dataSource={posts}
            renderItem={(p) => (
              <List.Item>
                <a href={`/app/soobshchestvo/${p.id}`}>{p.title}</a>
                <Tag style={{ marginLeft: 8 }}>{p.commentsCount} коммент.</Tag>
              </List.Item>
            )}
          />
        )}
      </Card>
    </main>
  );
}
