/**
 * Общие компоненты поста сообщества (Ф9: публичные SSR-страницы /soobshchestvo/* + тред
 * «Неба дня»). Логика портирована из бывшей SPA-страницы /app/soobshchestvo/@id (Ф7) и
 * параметризована: SSR отдаёт начальные данные (`initialPost`/`initialComments` из +data.ts),
 * интерактив (комментарии/реакции/жалобы/«полезный разбор») — клиентские действия под логином.
 *
 * Маркировка ИИ (решение заказчика, §1 док. 11): у контента с `authorKind='ai'` ВСЕГДА бейдж
 * «ИИ» — см. AuthorLine.
 */
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Input, Select, Space, Tag, Typography } from 'antd';
import { ZODIAC_SIGNS } from '@stassist/shared/schemas/zodiac.js';
import {
  UGC_VIOLATION_REASON_NAME_RU,
  UGC_VIOLATION_REASONS,
  type CommentResponse,
  type PostResponse,
} from '@stassist/shared/schemas/community.js';
import { api, ApiError, getAccessToken } from '../api-client.js';
import { ReactionBar } from './ReactionBar.js';

const { Title, Paragraph, Text } = Typography;

const BODY_NAME_RU: Record<string, string> = {
  sun: 'Солнце', moon: 'Луна', mercury: 'Меркурий', venus: 'Венера', mars: 'Марс',
  jupiter: 'Юпитер', saturn: 'Сатурн', uranus: 'Уран', neptune: 'Нептун', pluto: 'Плутон', chiron: 'Хирон',
};

export function AuthorLine({
  name,
  authorKind,
  createdAt,
}: {
  name: string | null;
  authorKind: 'human' | 'ai';
  createdAt: string;
}): React.JSX.Element {
  return (
    <>
      <b>{name ?? 'Аноним'}</b>
      {authorKind === 'ai' && (
        <Tag color="purple" style={{ marginLeft: 8 }}>
          ИИ
        </Tag>
      )}{' '}
      · {new Date(createdAt).toLocaleString('ru-RU')}
    </>
  );
}

export function AnonChartSummary({ chart }: { chart: unknown }): React.JSX.Element | null {
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
        <AuthorLine name={comment.authorDisplayName} authorKind={comment.authorKind} createdAt={comment.createdAt} />
        {comment.markedUsefulAt && <Tag color="gold" style={{ marginLeft: 8 }}>полезный разбор</Tag>}
        {comment.moderation === 'pending' && <Tag style={{ marginLeft: 8 }}>на модерации</Tag>}
      </Paragraph>
      <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{comment.bodyMd}</Paragraph>
      <Space wrap>
        <ReactionBar entity="comment" entityId={comment.id} />
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

/**
 * Блок комментариев поста: SSR-начальные данные + клиентский интерактив. Используется публичной
 * страницей поста и тредом «Неба дня». `isPostAuthor` уточняется родителем после авторизованного
 * рефетча (SSR не знает зрителя).
 */
export function CommentsBlock({
  postId,
  initialComments,
  isPostAuthor,
  placeholder = 'Ваш разбор или комментарий...',
}: {
  postId: string;
  initialComments: CommentResponse[];
  isPostAuthor: boolean;
  placeholder?: string;
}): React.JSX.Element {
  const [comments, setComments] = useState<CommentResponse[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  async function refresh(): Promise<void> {
    try {
      const c = await api.get<{ items: CommentResponse[] }>(`/posts/${postId}/comments`);
      setComments(c.items);
    } catch {
      /* оставляем SSR-данные */
    }
  }

  function requireLogin(): boolean {
    if (getAccessToken()) return false;
    window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
    return true;
  }

  async function onComment(): Promise<void> {
    if (requireLogin()) return;
    try {
      await api.post(`/posts/${postId}/comments`, { bodyMd: newComment });
      setNewComment('');
      setNotice(null);
      void refresh();
    } catch (err) {
      setNotice(err instanceof ApiError ? err.message : 'Не удалось отправить комментарий.');
    }
  }

  async function onReply(parentId: string, text: string): Promise<void> {
    if (requireLogin()) return;
    await api.post(`/posts/${postId}/comments`, { bodyMd: text, parentId });
    void refresh();
  }

  async function onMarkUseful(commentId: string): Promise<void> {
    await api.patch(`/posts/${postId}/comments/${commentId}/mark-useful`);
    void refresh();
  }

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesFor = (id: string) => comments.filter((c) => c.parentId === id);

  return (
    <>
      <Title level={4} style={{ marginTop: 24 }}>
        Комментарии ({comments.length})
      </Title>
      {topLevel.length === 0 ? (
        <Text type="secondary">Пока нет комментариев — начните разбор первым.</Text>
      ) : (
        topLevel.map((c) => (
          <div key={c.id}>
            <CommentItem comment={c} isPostAuthor={isPostAuthor} allowReply onReply={onReply} onMarkUseful={onMarkUseful} />
            <div style={{ marginLeft: 24 }}>
              {repliesFor(c.id).map((r) => (
                <CommentItem key={r.id} comment={r} isPostAuthor={isPostAuthor} allowReply={false} onReply={onReply} onMarkUseful={onMarkUseful} />
              ))}
            </div>
          </div>
        ))
      )}
      <Card size="small" style={{ marginTop: 16 }}>
        {notice && <Alert type="error" showIcon message={notice} style={{ marginBottom: 8 }} />}
        <Space.Compact style={{ width: '100%' }}>
          <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={placeholder} />
          <Button type="primary" disabled={!newComment.trim()} onClick={() => void onComment()}>
            Отправить
          </Button>
        </Space.Compact>
      </Card>
    </>
  );
}

/** Полная карточка поста с реакциями, жалобой и комментариями — публичная страница /soobshchestvo/{id}. */
export function PostView({
  initialPost,
  initialComments,
  backHref,
}: {
  initialPost: PostResponse;
  initialComments: CommentResponse[];
  backHref: string;
}): React.JSX.Element {
  const [post, setPost] = useState<PostResponse>(initialPost);
  const [reportReason, setReportReason] = useState<string | undefined>(undefined);
  const [reportNotice, setReportNotice] = useState<string | null>(null);

  // SSR не знает зрителя — после монтирования с токеном уточняем isMine (кнопка «полезный разбор»).
  useEffect(() => {
    if (!getAccessToken()) return;
    api.get<PostResponse>(`/posts/${post.id}`).then(setPost).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- только при монтировании
  }, []);

  async function onReport(): Promise<void> {
    if (!reportReason) return;
    if (!getAccessToken()) {
      window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    try {
      await api.post('/reports-ugc', { entity: 'post', entityId: post.id, reason: reportReason });
      setReportNotice('Жалоба отправлена модераторам.');
    } catch (err) {
      setReportNotice(err instanceof ApiError ? err.message : 'Не удалось отправить жалобу.');
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href={backHref}>← Лента</a>
      </Paragraph>
      <Title level={2}>{post.title}</Title>
      <Paragraph type="secondary">
        <AuthorLine name={post.authorDisplayName} authorKind={post.authorKind} createdAt={post.createdAt} />
      </Paragraph>
      {post.moderation === 'pending' && (
        <Alert type="warning" showIcon style={{ marginBottom: 16 }} message="На модерации" description="Пост виден только вам, пока не пройдёт проверку." />
      )}

      <AnonChartSummary chart={post.chart} />

      <Card>
        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{post.bodyMd}</Paragraph>
        <Space wrap>
          <ReactionBar entity="post" entityId={post.id} />
          <Select
            placeholder="Пожаловаться"
            style={{ width: 200 }}
            value={reportReason}
            onChange={setReportReason}
            options={UGC_VIOLATION_REASONS.map((reason) => ({ value: reason, label: UGC_VIOLATION_REASON_NAME_RU[reason] }))}
          />
          <Button disabled={!reportReason} onClick={() => void onReport()}>
            Отправить жалобу
          </Button>
        </Space>
        {reportNotice && <Alert style={{ marginTop: 8 }} type="info" showIcon message={reportNotice} />}
      </Card>

      <CommentsBlock postId={post.id} initialComments={initialComments} isPostAuthor={post.isMine} />
    </main>
  );
}
