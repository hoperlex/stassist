import { useState } from 'react';
import { Alert, Button, Input, Space } from 'antd';
import type { ChartData, ChartShareResponse, ShareKind, SharePositions } from '@stassist/shared';
import { api, ApiError } from './api-client.js';

/** Принимает и полную `ChartData`, и уже обезличенный `SharePositions` (Ф9: транзитный снапшот
 *  дня приходит с API сразу в форме SharePositions) — маппинг одинаковый: явный whitelist полей. */
export type ShareablePositions = ChartData | SharePositions;

function toSharePositions(chart: ShareablePositions) {
  return {
    bodies: chart.bodies,
    points: chart.points,
    angles: chart.angles,
    houses: chart.houses,
    aspects: chart.aspects,
    meta: { houseSystem: chart.meta.houseSystem, zodiac: chart.meta.zodiac, noHouses: chart.meta.noHouses },
  };
}

/**
 * Кнопка «поделиться» — создаёт обезличенный снапшот `chart_shares` (без ПД: только позиции, см.
 * packages/shared/src/schemas/calc.ts `SharePositions`) и показывает постоянную ссылку
 * `/podelitsya/{slug}` с og:image (генерируется асинхронно воркером, см. apps/worker/src/share).
 *
 * Ф9: kind='transit_day' — карточка отклика «Небо дня»: `positions` — натал пользователя,
 * `positionsB` — транзитный снапшот дня, `caption` — подпись отклика (валидируется и
 * модерируется на бэке, см. routes/share.ts).
 */
export function ShareButton({
  kind,
  positions,
  positionsB,
  caption,
  label = 'Поделиться',
}: {
  kind: ShareKind;
  positions: ShareablePositions;
  positionsB?: ShareablePositions;
  caption?: string;
  label?: string;
}): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onShare(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<ChartShareResponse>('/share', {
        kind,
        positions: toSharePositions(positions),
        positionsB: positionsB ? toSharePositions(positionsB) : undefined,
        caption,
        theme: 'light',
      });
      setShareUrl(res.shareUrl);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Шеринг временно недоступен.');
    } finally {
      setLoading(false);
    }
  }

  if (shareUrl) {
    return (
      <Space direction="vertical" style={{ width: '100%', maxWidth: 420 }}>
        <Input value={shareUrl} readOnly onFocus={(e) => e.currentTarget.select()} />
        <Alert
          type="info"
          showIcon
          message="Ссылка готова"
          description="Картинка для соцсетей появится по ссылке в течение минуты — воркер генерирует её асинхронно."
        />
      </Space>
    );
  }

  return (
    <>
      {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 8 }} />}
      <Button loading={loading} onClick={() => void onShare()}>
        {label}
      </Button>
    </>
  );
}
