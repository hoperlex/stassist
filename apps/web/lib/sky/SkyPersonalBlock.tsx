/**
 * Личный блок «Неба дня» (Ф9, см. docs/strategy/11-соцраздел-созвездие.md §3): персональная
 * проекция события на натальную карту + чек-ин в один тап + стрик + share-карточка отклика.
 * Клиентский остров: SSR рендерит CTA для гостя; после монтирования с токеном грузит
 * `/sky/days/:dayKey/me` (проекция считается на бэке из шифрованного профиля — ПД в браузер
 * не приходит, только аспекты).
 */
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Input, Space, Spin, Tag, Typography } from 'antd';
import type { ChartData, SharePositions, SkyCheckinCreateResponse, SkyCheckinVerdict, SkyDayMeResponse } from '@stassist/shared';
import { SKY_VERDICT_NAME_RU } from '@stassist/shared/schemas/sky.js';
import { api, ApiError, getAccessToken } from '../api-client.js';
import { ShareButton } from '../ShareButton.js';

const { Paragraph, Text } = Typography;

/** Локальные RU-словари для подписи карточки (клиентский бандл НЕ тянет @stassist/llm — тот
 *  серверный: node:crypto и т.п., см. doc-комментарий apps/web/lib/goroskop-nav-links.ts). */
const BODY_NAME_RU: Record<string, string> = {
  sun: 'Солнце', moon: 'Луна', mercury: 'Меркурий', venus: 'Венера', mars: 'Марс',
  jupiter: 'Юпитер', saturn: 'Сатурн', uranus: 'Уран', neptune: 'Нептун', pluto: 'Плутон', chiron: 'Хирон',
};
const ASPECT_NAME_RU: Record<string, string> = {
  conjunction: 'соединение', opposition: 'оппозиция', trine: 'трин', square: 'квадрат', sextile: 'секстиль',
  quincunx: 'квинконс', semisextile: 'полусекстиль', semisquare: 'полуквадрат',
  sesquiquadrate: 'полутораквадрат', quintile: 'квинтиль', biquintile: 'биквинтиль',
};

const VERDICTS: SkyCheckinVerdict[] = ['hit', 'partial', 'miss'];

interface BirthProfileDto {
  id: string;
  kind: string;
}

export function SkyPersonalBlock({
  dayKey,
  transitPositions,
  isToday,
}: {
  dayKey: string;
  transitPositions: SharePositions;
  /** Чек-ин принимается только за «сегодня» (правило стрика) — в архиве блок только читает. */
  isToday: boolean;
}): React.JSX.Element {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [me, setMe] = useState<SkyDayMeResponse | null>(null);
  const [natalChart, setNatalChart] = useState<ChartData | null>(null);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notePending, setNotePending] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setAuthorized(Boolean(token));
    if (!token) return;
    void refreshMe();
    // Натальная карта self-профиля — для share-карточки «натал + небо дня» (обезличивается на бэке).
    api
      .get<BirthProfileDto[]>('/birth-profiles')
      .then((profiles) => {
        const self = profiles.find((p) => p.kind === 'self');
        return self ? api.get<{ data: ChartData }>(`/birth-profiles/${self.id}/chart`) : null;
      })
      .then((chart) => setNatalChart(chart?.data ?? null))
      .catch(() => setNatalChart(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- только при монтировании/смене дня
  }, [dayKey]);

  async function refreshMe(): Promise<void> {
    try {
      setMe(await api.get<SkyDayMeResponse>(`/sky/days/${dayKey}/me`));
    } catch {
      setMe(null);
    }
  }

  async function onCheckin(verdict: SkyCheckinVerdict): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.post<SkyCheckinCreateResponse>('/sky/checkins', {
        dayKey,
        verdict,
        note: note.trim() ? note.trim() : undefined,
      });
      setNotePending(res.noteModerationPending);
      setNote('');
      await refreshMe();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось сохранить отклик.');
    } finally {
      setSubmitting(false);
    }
  }

  if (authorized === null) return <Card style={{ marginBottom: 24 }}>{null}</Card>;

  if (!authorized) {
    return (
      <Card style={{ marginBottom: 24 }} title="А как это небо у тебя?">
        <Paragraph>
          Войдите — и мы покажем, какой аспект сегодняшнее небо образует именно к вашей натальной карте, а чек-ины
          соберутся в серию «Живу по небу».
        </Paragraph>
        <Button type="primary" href={`/login?next=${encodeURIComponent(`/nebo-dnya`)}`}>
          Узнать, как это небо касается меня
        </Button>
      </Card>
    );
  }

  if (!me) {
    return (
      <Card style={{ marginBottom: 24 }} title="Твоя проекция">
        <Spin size="small" />
      </Card>
    );
  }

  if (!me.computed) {
    return (
      <Card style={{ marginBottom: 24 }} title="Твоя проекция">
        {me.reason === 'no_profile' ? (
          <>
            <Paragraph>Чтобы увидеть личную проекцию, создайте профиль рождения и рассчитайте натальную карту.</Paragraph>
            <Button type="primary" href="/profiles/new">
              Создать профиль рождения
            </Button>
          </>
        ) : (
          <Text type="secondary">Небо этого дня ещё не рассчитано.</Text>
        )}
      </Card>
    );
  }

  const top = me.aspects[0];
  const captionParts: string[] = [];
  if (me.myCheckin) captionParts.push(SKY_VERDICT_NAME_RU[me.myCheckin.verdict]);
  if (top) {
    captionParts.push(
      `${BODY_NAME_RU[top.transitBody] ?? top.transitBody} — ${ASPECT_NAME_RU[top.angleName] ?? top.angleName} — ${BODY_NAME_RU[top.natalBody] ?? top.natalBody}, орб ${top.orbDeg.toFixed(1)}°`,
    );
  }
  const caption = captionParts.length > 0 ? captionParts.join(' · ').slice(0, 120) : undefined;

  return (
    <Card
      style={{ marginBottom: 24 }}
      title="Твоя проекция"
      extra={me.streak.current > 0 && <Tag color="gold">🔥 стрик: {me.streak.current} (рекорд {me.streak.best})</Tag>}
    >
      {me.summary && <Paragraph>{me.summary}</Paragraph>}
      {me.aspects.length > 1 && (
        <Paragraph type="secondary">
          Также сегодня:{' '}
          {me.aspects
            .slice(1)
            .map(
              (a) =>
                `${BODY_NAME_RU[a.transitBody] ?? a.transitBody} ${ASPECT_NAME_RU[a.angleName] ?? a.angleName} ${BODY_NAME_RU[a.natalBody] ?? a.natalBody}`,
            )
            .join('; ')}
        </Paragraph>
      )}

      {isToday ? (
        <>
          <Paragraph style={{ marginBottom: 8 }}>
            <Text strong>Как это прожилось?</Text>
            {me.myCheckin && <Tag style={{ marginLeft: 8 }}>ваш отклик: {SKY_VERDICT_NAME_RU[me.myCheckin.verdict]}</Tag>}
          </Paragraph>
          <Space wrap style={{ marginBottom: 8 }}>
            {VERDICTS.map((verdict) => (
              <Button
                key={verdict}
                loading={submitting}
                type={me.myCheckin?.verdict === verdict ? 'primary' : 'default'}
                onClick={() => void onCheckin(verdict)}
              >
                {SKY_VERDICT_NAME_RU[verdict]}
              </Button>
            ))}
          </Space>
          {!me.myCheckin?.noteCommentId && (
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={140}
              placeholder="Заметка в тред дня (необязательно, до 140 символов)"
              style={{ marginBottom: 8 }}
            />
          )}
          {notePending && (
            <Alert type="info" showIcon style={{ marginBottom: 8 }} message="Заметка отправлена на модерацию — появится в треде после проверки." />
          )}
          {error && <Alert type="error" showIcon style={{ marginBottom: 8 }} message={error} />}
        </>
      ) : (
        me.myCheckin && (
          <Paragraph>
            <Tag>ваш отклик: {SKY_VERDICT_NAME_RU[me.myCheckin.verdict]}</Tag>
          </Paragraph>
        )
      )}

      {me.myCheckin && natalChart && (
        <ShareButton
          kind="transit_day"
          positions={natalChart}
          positionsB={transitPositions}
          caption={caption}
          label="Поделиться откликом"
        />
      )}
    </Card>
  );
}
