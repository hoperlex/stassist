/**
 * Панель реакций (Ф9, состав MVP §7 док. 11: «вывод всех 4 реакций в UI») — все виды из
 * контракта Ф7 (`reactionKindSchema`: like/heart/insightful/support), до сих пор на фронте
 * использовался только like. Клиентский остров: во время SSR рендерит кнопки с нулями, после
 * монтирования подтягивает счётчики (GET /reactions публичен, `mine` — только с токеном).
 */
import { useEffect, useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  REACTION_KINDS,
  REACTION_KIND_NAME_RU,
  type ReactionEntity,
  type ReactionKind,
  type ReactionSummaryResponse,
} from '@stassist/shared/schemas/community.js';
import { api, getAccessToken } from '../api-client.js';

const REACTION_EMOJI: Record<ReactionKind, string> = {
  like: '👍',
  heart: '💜',
  insightful: '✨',
  support: '🤝',
};

export function ReactionBar({ entity, entityId }: { entity: ReactionEntity; entityId: string }): React.JSX.Element {
  const [summary, setSummary] = useState<ReactionSummaryResponse | null>(null);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh стабильна по построению (MVP)
  }, [entityId]);

  async function refresh(): Promise<void> {
    try {
      setSummary(await api.get<ReactionSummaryResponse>(`/reactions?entity=${entity}&entityId=${entityId}`));
    } catch {
      /* публичная страница остаётся читаемой без счётчиков */
    }
  }

  async function toggle(kind: ReactionKind): Promise<void> {
    if (!getAccessToken()) {
      window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    await api.post('/reactions', { entity, entityId, kind });
    void refresh();
  }

  return (
    <Space wrap>
      {REACTION_KINDS.map((kind) => {
        const mine = summary?.mine.includes(kind) ?? false;
        return (
          <Tooltip key={kind} title={REACTION_KIND_NAME_RU[kind]}>
            <Button size="small" type={mine ? 'primary' : 'default'} onClick={() => void toggle(kind)}>
              {REACTION_EMOJI[kind]} {summary?.counts[kind] ?? 0}
            </Button>
          </Tooltip>
        );
      })}
    </Space>
  );
}
