/**
 * `/soobshchestvo` — ПУБЛИЧНАЯ лента сообщества (Ф9): чтение без логина (SSR из +data.ts),
 * публикация — остров под логином (форма портирована из бывшей SPA-страницы /app/soobshchestvo,
 * которая теперь редиректит сюда). Фильтры — обычные ссылки с query (SSR-навигация).
 */
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Input, List, Select, Spin, Tag, Typography } from 'antd';
import type { PostKind, PostResponse, UserPostKind } from '@stassist/shared/schemas/community.js';
import { api, ApiError, getAccessToken } from '../../lib/api-client.js';
import { AuthorLine } from '../../lib/community/PostView.js';
import type { SoobshchestvoData } from './+data.js';

const { Title, Paragraph, Text } = Typography;

const KIND_LABEL_RU: Record<PostKind, string> = {
  chart_review_request: 'разбор карты',
  discussion: 'обсуждение',
  gallery: 'галерея',
  sky_day: 'небо дня',
};

interface BirthProfileDto {
  id: string;
  label: string;
  kind: string;
}

/** Форма публикации — клиентский остров: для гостя рендерит CTA входа (SSR-совместимо: до
 *  монтирования — нейтральная заглушка, авторизация видна только клиенту). */
function NewPostForm(): React.JSX.Element {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [profiles, setProfiles] = useState<BirthProfileDto[] | null>(null);
  const [formKind, setFormKind] = useState<UserPostKind>('discussion');
  const [title, setTitle] = useState('');
  const [bodyMd, setBodyMd] = useState('');
  const [birthProfileId, setBirthProfileId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    setAuthorized(Boolean(token));
    if (token) {
      api.get<BirthProfileDto[]>('/birth-profiles').then(setProfiles).catch(() => setProfiles([]));
    }
  }, []);

  if (authorized === null) return <Card style={{ marginBottom: 24 }} title="Новый пост">{null}</Card>;
  if (!authorized) {
    return (
      <Card style={{ marginBottom: 24 }} title="Новый пост">
        <Paragraph>Читать сообщество можно без входа, а публиковать — после регистрации.</Paragraph>
        <Button type="primary" href="/login?next=/soobshchestvo">
          Войти и опубликовать
        </Button>
      </Card>
    );
  }

  async function onSubmit(): Promise<void> {
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const post = await api.post<PostResponse>('/posts', {
        kind: formKind,
        title,
        bodyMd,
        birthProfileId: formKind === 'chart_review_request' ? birthProfileId : undefined,
      });
      setTitle('');
      setBodyMd('');
      setNotice(post.moderation === 'pending' ? 'Пост отправлен на модерацию — появится в ленте после проверки.' : 'Пост опубликован.');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось опубликовать пост.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card style={{ marginBottom: 24 }} title="Новый пост">
      <Form layout="vertical">
        <Form.Item label="Тип поста">
          <Select
            value={formKind}
            onChange={setFormKind}
            options={[
              { value: 'discussion', label: 'Обсуждение' },
              { value: 'chart_review_request', label: 'Разбор карты (прикрепится анонимная карта)' },
            ]}
          />
        </Form.Item>
        {formKind === 'chart_review_request' && (
          <Form.Item label="Профиль рождения" required>
            {profiles === null ? (
              <Spin size="small" />
            ) : profiles.length === 0 ? (
              <Alert type="warning" showIcon message="Нет профилей" description={<a href="/profiles/new">Создайте профиль рождения</a>} />
            ) : (
              <Select placeholder="Выберите профиль" value={birthProfileId} onChange={setBirthProfileId} options={profiles.map((p) => ({ value: p.id, label: p.label }))} />
            )}
          </Form.Item>
        )}
        <Form.Item label="Заголовок" required>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} />
        </Form.Item>
        <Form.Item label="Текст" required>
          <Input.TextArea value={bodyMd} onChange={(e) => setBodyMd(e.target.value)} rows={4} maxLength={20000} />
        </Form.Item>
      </Form>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} />}
      {notice && <Alert type="success" showIcon message={notice} style={{ marginBottom: 12 }} />}
      <Button
        type="primary"
        loading={submitting}
        disabled={!title.trim() || !bodyMd.trim() || (formKind === 'chart_review_request' && !birthProfileId)}
        onClick={() => void onSubmit()}
      >
        Опубликовать
      </Button>
    </Card>
  );
}

function filterHref(sort: string, kind?: string): string {
  const qs = new URLSearchParams({ ...(sort !== 'new' ? { sort } : {}), ...(kind ? { kind } : {}) });
  const query = qs.toString();
  return query ? `/soobshchestvo?${query}` : '/soobshchestvo';
}

export function Page({ pageContext }: { pageContext: { data: SoobshchestvoData } }): React.JSX.Element {
  const { posts, sort, kind } = pageContext.data;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/nebo-dnya">Небо дня</a> · <a href="/app/druzya">Друзья</a> ·{' '}
        <a href="/pravila-soobshchestva">Правила сообщества</a>
      </Paragraph>
      <Title level={1}>Сообщество</Title>
      <Paragraph type="secondary">
        Разборы карт публикуются анонимно: только позиции планет, без даты, времени и места рождения.
      </Paragraph>

      <NewPostForm />

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {(
          [
            ['new', 'Новые'],
            ['unanswered', 'Без ответа'],
            ['popular', 'Популярные'],
          ] as const
        ).map(([value, label]) => (
          <a key={value} href={filterHref(value, kind)}>
            {sort === value ? <b>{label}</b> : label}
          </a>
        ))}
        <span style={{ opacity: 0.4 }}>|</span>
        <a href={filterHref(sort)}>{!kind ? <b>Все типы</b> : 'Все типы'}</a>
        {(['discussion', 'chart_review_request', 'gallery'] as const).map((value) => (
          <a key={value} href={filterHref(sort, value)}>
            {kind === value ? <b>{KIND_LABEL_RU[value]}</b> : KIND_LABEL_RU[value]}
          </a>
        ))}
      </div>

      {posts.items.length === 0 ? (
        <Text type="secondary">Пока нет публикаций — станьте первым, кто опубликует пост!</Text>
      ) : (
        <List
          dataSource={posts.items}
          renderItem={(p) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={`/soobshchestvo/${p.id}`}>{p.title}</a>}
                description={
                  <span>
                    <Tag>{KIND_LABEL_RU[p.kind]}</Tag>
                    <AuthorLine name={p.authorDisplayName} authorKind={p.authorKind} createdAt={p.createdAt} /> ·{' '}
                    {p.commentsCount} коммент. · {p.likesCount} лайков
                  </span>
                }
              />
            </List.Item>
          )}
        />
      )}
    </main>
  );
}
