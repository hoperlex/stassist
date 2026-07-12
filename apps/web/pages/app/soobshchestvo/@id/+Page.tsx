import { useEffect, useState } from 'react';
import { Alert, Button, Card, Input, Select, Space, Spin, Tag, Typography } from 'antd';
import { ZODIAC_SIGNS } from '@stassist/shared/schemas/zodiac.js';
import type { CommentResponse, PostResponse, ReactionSummaryResponse } from '@stassist/shared/schemas/community.js';
import { api, ApiError, getAccessToken } from '../../../../lib/api-client.js';

const { Title, Paragraph, Text } = Typography;

const BODY_NAME_RU: Record<string, string> = {
  sun: 'Солнце', moon: 'Луна', mercury: 'Меркурий', venus: 'Венера', mars: 'Марс',
  jupiter: 'Юпитер', saturn: 'Сатурн', uranus: 'Уран', neptune: 'Нептун', pluto: 'Плутон', chiron: 'Хирон',
};

function AnonChartSummary({ chart }: { chart: unknown }): React.JSX.Element | null {
  if (!chart || typeof chart !== 'object') return null;
  const bodies = (chart as { bodies?: Record<string, { signIndex: number; houseNumber: number | null }> }).bodies;
  if (!bodies) return null;
  return (
    <Card size="small" title="Анонимная карта (без даты/времени/места рождения)" style={{ marginBottom: 16 }}>
      <Space wrap>
        {Object.entries(bodies).map(([key, pos]) => (
          <Tag key={key}>
            {BODY_NAME_RU[key] ?? key} — {ZODIAC_SIGNS[pos.signIndex]?.nameRu ?? '?'}
            {pos.houseNumber ? `, ${pos.houseNumber} дом` : ''}
          </Tag>
        ))}
      </Space>
    </Card>
  );
}

function CommentItem({ comment, isPostAuthor, allowReply, onReply, onMarkUseful }: {
  comment: CommentResponse;
  isPostAuthor: boolean;
  /** Дерево ограничено 2 уровнями (req.2 промта Ф7) — у ответов на ответы кнопки «Ответить» нет. */
  allowReply: boolean;
  onReply: (parentId: string, text: string) => Promise<void>;
  onMarkUseful: (commentId: string) => Promise<void>;
}): React.JSX.Element {
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  return (
    <Card size="small" style={{ marginBottom: 8 }}>
      <Paragraph style={{ margin: 0 }}>
        <b>{comment.authorDisplayName ?? 'Аноним'}</b> · {new Date(comment.createdAt).toLocaleString('ru-RU')}
        {comment.markedUsefulAt && <Tag color="gold" style={{ marginLeft: 8 }}>полезный разбор</Tag>}
        {comment.moderation === 'pending' && <Tag style={{ marginLeft: 8 }}>на модерации</Tag>}
      </Paragraph>
      <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{comment.bodyMd}</Paragraph>
      <Space>
        {allowReply && !replying && (
          <Button size="small" onClick={() => setReplying(true)}>
            Ответить
          </Button>
        )}
        {isPostAuthor && !comment.markedUsefulAt && (
          <Button size="small" onClick={() => void onMarkUseful(comment.id)}>
            Отметить полезным
          </Button>
        )}
      </Space>
      {replying && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <Input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Ваш ответ..." />
          <Button
            type="primary"
            size="small"
            onClick={async () => {
              await onReply(comment.id, replyText);
              setReplyText('');
              setReplying(false);
            }}
          >
            Отправить
          </Button>
        </div>
      )}
    </Card>
  );
}

export function Page({ pageContext }: { pageContext: { routeParams: { id: string } } }): React.JSX.Element {
  const postId = pageContext.routeParams.id;
  const [post, setPost] = useState<PostResponse | null | undefined>(undefined);
  const [comments, setComments] = useState<CommentResponse[] | null>(null);
  const [newComment, setNewComment] = useState('');
  const [reactions, setReactions] = useState<ReactionSummaryResponse | null>(null);
  const [reportReason, setReportReason] = useState<string | undefined>(undefined);
  const [reportNotice, setReportNotice] = useState<string | null>(null);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh стабильна по построению (не мемоизирована намеренно — MVP), запуск только при монтировании
  }, []);

  async function refresh(): Promise<void> {
    try {
      const p = await api.get<PostResponse>(`/posts/${postId}`);
      setPost(p);
      const c = await api.get<{ items: CommentResponse[] }>(`/posts/${postId}/comments`);
      setComments(c.items);
      if (getAccessToken()) {
        const r = await api.get<ReactionSummaryResponse>(`/reactions?entity=post&entityId=${postId}`);
        setReactions(r);
      }
    } catch {
      setPost(null);
    }
  }

  async function onLike(): Promise<void> {
    if (!getAccessToken()) {
      window.location.href = `/login?next=/app/soobshchestvo/${postId}`;
      return;
    }
    await api.post('/reactions', { entity: 'post', entityId: postId, kind: 'like' });
    void refresh();
  }

  async function onComment(): Promise<void> {
    await api.post(`/posts/${postId}/comments`, { bodyMd: newComment });
    setNewComment('');
    void refresh();
  }

  async function onReply(parentId: string, text: string): Promise<void> {
    await api.post(`/posts/${postId}/comments`, { bodyMd: text, parentId });
    void refresh();
  }

  async function onMarkUseful(commentId: string): Promise<void> {
    await api.patch(`/posts/${postId}/comments/${commentId}/mark-useful`);
    void refresh();
  }

  async function onReport(): Promise<void> {
    if (!reportReason) return;
    try {
      await api.post('/reports-ugc', { entity: 'post', entityId: postId, reason: reportReason });
      setReportNotice('Жалоба отправлена модераторам.');
    } catch (err) {
      setReportNotice(err instanceof ApiError ? err.message : 'Не удалось отправить жалобу.');
    }
  }

  if (post === undefined) return <Spin style={{ margin: 48 }} />;
  if (post === null) {
    return (
      <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
        <Alert type="warning" showIcon message="Пост не найден" description="Возможно, он ещё на модерации или удалён." />
      </main>
    );
  }

  const topLevel = comments?.filter((c) => !c.parentId) ?? [];
  const repliesFor = (id: string) => comments?.filter((c) => c.parentId === id) ?? [];

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/app/soobshchestvo">← Лента</a>
      </Paragraph>
      <Title level={2}>{post.title}</Title>
      {post.moderation === 'pending' && <Alert type="warning" showIcon style={{ marginBottom: 16 }} message="На модерации" description="Пост виден только вам, пока не пройдёт проверку." />}

      <AnonChartSummary chart={post.chart} />

      <Card>
        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{post.bodyMd}</Paragraph>
        <Space>
          <Button onClick={() => void onLike()}>👍 {reactions?.counts.like ?? 0}</Button>
          <Select
            placeholder="Пожаловаться"
            style={{ width: 180 }}
            value={reportReason}
            onChange={setReportReason}
            options={[
              { value: 'death_or_illness_prediction', label: 'Предсказание смерти/болезни' },
              { value: 'curse_or_love_spell', label: 'Порча/приворот' },
              { value: 'medical_directive', label: 'Медицинская директива' },
              { value: 'financial_directive', label: 'Финансовая директива' },
              { value: 'insult', label: 'Оскорбление' },
              { value: 'other', label: 'Другое' },
            ]}
          />
          <Button disabled={!reportReason} onClick={() => void onReport()}>
            Отправить жалобу
          </Button>
        </Space>
        {reportNotice && <Alert style={{ marginTop: 8 }} type="info" showIcon message={reportNotice} />}
      </Card>

      <Title level={4} style={{ marginTop: 24 }}>
        Комментарии ({comments?.length ?? 0})
      </Title>
      {topLevel.length === 0 ? (
        <Text type="secondary">Пока нет комментариев — начните разбор первым.</Text>
      ) : (
        topLevel.map((c) => (
          <div key={c.id}>
            <CommentItem comment={c} isPostAuthor={post.isMine} allowReply onReply={onReply} onMarkUseful={onMarkUseful} />
            <div style={{ marginLeft: 24 }}>
              {repliesFor(c.id).map((r) => (
                <CommentItem key={r.id} comment={r} isPostAuthor={post.isMine} allowReply={false} onReply={onReply} onMarkUseful={onMarkUseful} />
              ))}
            </div>
          </div>
        ))
      )}

      <Card size="small" style={{ marginTop: 16 }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Ваш разбор или комментарий..." />
          <Button
            type="primary"
            disabled={!newComment.trim()}
            onClick={() => {
              if (!getAccessToken()) {
                window.location.href = `/login?next=/app/soobshchestvo/${postId}`;
                return;
              }
              void onComment();
            }}
          >
            Отправить
          </Button>
        </Space.Compact>
      </Card>
    </main>
  );
}
