import { Button, Typography } from 'antd';
import { SkyDayView } from '../../lib/sky/SkyDayView.js';
import type { NeboDnyaData } from './+data.js';

const { Title, Paragraph } = Typography;

/**
 * `/nebo-dnya` — публичная страница «Небо дня» (Ф9, см. docs/strategy/11-соцраздел-созвездие.md):
 * одно астрособытие на всех + личная проекция + чек-ин + тред. Архив — /nebo-dnya/{YYYY-MM-DD}.
 */
export function Page({ pageContext }: { pageContext: { data: NeboDnyaData } }): React.JSX.Element {
  const { day, comments } = pageContext.data;

  if (!day) {
    return (
      <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
        <Title level={1}>Небо дня</Title>
        <Paragraph>
          Сегодняшнее небо ещё рассчитывается — генератор событий дня запускается каждую ночь. Загляните чуть позже,
          а пока можно рассчитать натальную карту.
        </Paragraph>
        <Button type="primary" href="/natalnaya-karta">
          Рассчитать натальную карту
        </Button>
      </main>
    );
  }

  return <SkyDayView day={day} comments={comments} isToday />;
}
