import { useState } from 'react';
import { Alert, Button, Input, Space } from 'antd';
import type { ChartData, ChartShareResponse } from '@stassist/shared';
import { api, ApiError } from './api-client.js';

function toSharePositions(chart: ChartData) {
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
 */
export function ShareButton({
  kind,
  positions,
  positionsB,
  label = 'Поделиться',
}: {
  kind: 'natal' | 'synastry';
  positions: ChartData;
  positionsB?: ChartData;
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
