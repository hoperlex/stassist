import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Input, List, Radio, Select, Spin, Tag, Typography } from 'antd';
// Импорт напрямую из подмодуля — баррель тянет node:crypto в клиентский бандл (см. doc-комментарий
// apps/web/lib/goroskop-nav-links.ts).
import type { PostKind, PostListResponse, PostResponse, PostSort } from '@stassist/shared/schemas/community.js';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Paragraph, Text } = Typography;

interface BirthProfileDto {
  id: string;
  label: string;
  kind: string;
}

const KIND_LABEL_RU: Record<PostKind, string> = {
  chart_review_request: 'разбор карты',
  discussion: 'обсуждение',
  gallery: 'галерея',
};

/**
 * `/app/soobshchestvo` — лента коммьюнити (req.1-2 промта Ф7 M8): фильтры новые/без ответа/
 * популярные, публикация поста (в т.ч. с анонимной картой). См. `pages/app/soobshchestvo/@id`
 * для детали поста + комментариев.
 */
export function Page(): React.JSX.Element {
  const [posts, setPosts] = useState<PostResponse[] | null>(null);
  const [sort, setSort] = useState<PostSort>('new');
  const [kind, setKind] = useState<PostKind | undefined>(undefined);

  const [profiles, setProfiles] = useState<BirthProfileDto[] | null>(null);
  const [formKind, setFormKind] = useState<PostKind>('discussion');
  const [title, setTitle] = useState('');
  const [bodyMd, setBodyMd] = useState('');
  const [birthProfileId, setBirthProfileId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/app/soobshchestvo';
      return;
    }
    api.get<BirthProfileDto[]>('/birth-profiles').then(setProfiles).catch(() => setProfiles([]));
  }, []);

  useEffect(() => {
    void refreshFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshFeed стабильна по построению (не мемоизирована намеренно — MVP)
  }, [sort, kind]);

  async function refreshFeed(): Promise<void> {
    try {
      const qs = new URLSearchParams({ sort, ...(kind ? { kind } : {}) });
      const res = await api.get<PostListResponse>(`/posts?${qs.toString()}`);
      setPosts(res.items);
    } catch {
      setPosts([]);
    }
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
      void refreshFeed();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось опубликовать пост.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/app">← В кабинет</a> · <a href="/app/druzya">Друзья</a> · <a href="/pravila-soobshchestva">Правила сообщества</a>
      </Paragraph>
      <Title level={2}>Сообщество</Title>

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

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <Radio.Group value={sort} onChange={(e) => setSort(e.target.value)}>
          <Radio.Button value="new">Новые</Radio.Button>
          <Radio.Button value="unanswered">Без ответа</Radio.Button>
          <Radio.Button value="popular">Популярные</Radio.Button>
        </Radio.Group>
        <Select
          allowClear
          placeholder="Все типы"
          style={{ width: 200 }}
          value={kind}
          onChange={setKind}
          options={[
            { value: 'discussion', label: 'Обсуждения' },
            { value: 'chart_review_request', label: 'Разборы карт' },
            { value: 'gallery', label: 'Галерея' },
          ]}
        />
      </div>

      {posts === null ? (
        <Spin />
      ) : posts.length === 0 ? (
        <Text type="secondary">Пока нет публикаций — станьте первым, кто опубликует пост!</Text>
      ) : (
        <List
          dataSource={posts}
          renderItem={(p) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={`/app/soobshchestvo/${p.id}`}>{p.title}</a>}
                description={
                  <span>
                    <Tag>{KIND_LABEL_RU[p.kind]}</Tag>
                    {p.authorDisplayName ?? 'Аноним'} · {new Date(p.createdAt).toLocaleDateString('ru-RU')} · {p.commentsCount} коммент. · {p.likesCount} лайков
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
