/**
 * Общий вид страницы «Небо дня» (Ф9) — используется и «сегодняшней» страницей /nebo-dnya, и
 * архивом /nebo-dnya/@dayKey. SSR-содержимое (событие, текст, колесо, агрегаты, тред) приходит
 * из +data.ts; интерактив — острова (SkyPersonalBlock, реакции, комментарии).
 */
import { Card, Typography } from 'antd';
import { ChartWheel } from '@stassist/ui';
import type { CommentResponse } from '@stassist/shared/schemas/community.js';
import type { SkyDayResponse } from '@stassist/shared';
import { CommentsBlock } from '../community/PostView.js';
import { ReactionBar } from '../community/ReactionBar.js';
import { SkyPersonalBlock } from './SkyPersonalBlock.js';

const { Title, Paragraph, Text } = Typography;

function formatDayRu(dayKey: string): string {
  const [y, m, d] = dayKey.split('-').map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!)).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function SkyDayView({
  day,
  comments,
  isToday,
}: {
  day: SkyDayResponse;
  comments: CommentResponse[];
  isToday: boolean;
}): React.JSX.Element {
  const { aggregates } = day;
  const hitShare = aggregates.total > 0 ? Math.round((aggregates.hit / aggregates.total) * 100) : 0;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph type="secondary" style={{ marginBottom: 4 }}>
        Небо дня · {formatDayRu(day.dayKey)}
        {!isToday && (
          <>
            {' '}
            · <a href="/nebo-dnya">к сегодняшнему дню →</a>
          </>
        )}
      </Paragraph>
      <Title level={1} style={{ marginTop: 0 }}>
        {day.title}
      </Title>

      {day.summaryMd.split(/\n{2,}/).map((para, i) => (
        <Paragraph key={i} style={{ whiteSpace: 'pre-wrap' }}>
          {para}
        </Paragraph>
      ))}

      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <ChartWheel
          primary={{ ...day.transitPositions, noHouses: day.transitPositions.meta.noHouses }}
          title={`Небо дня: ${day.title}`}
          size={420}
        />
      </div>

      <Paragraph>
        {aggregates.total > 0 ? (
          <Text strong>
            Сегодня откликнулись {aggregates.total} — {hitShare}% отметили «в точку».
          </Text>
        ) : (
          <Text type="secondary">Пока никто не откликнулся — станьте первым, чей отклик увидят все.</Text>
        )}
      </Paragraph>

      <SkyPersonalBlock dayKey={day.dayKey} transitPositions={day.transitPositions} isToday={isToday} />

      {day.threadPostId ? (
        <Card title="Тред дня" size="small">
          <ReactionBar entity="post" entityId={day.threadPostId} />
          <CommentsBlock
            postId={day.threadPostId}
            initialComments={comments}
            isPostAuthor={false}
            placeholder="Как это небо отзывается у вас?"
          />
        </Card>
      ) : (
        <Text type="secondary">Тред дня появится после ближайшего прогона генератора.</Text>
      )}
    </main>
  );
}
