import { Card, Tag, Typography } from 'antd';
import type { ReactNode } from 'react';
import { InfoDisclaimer } from './InfoDisclaimer.js';
import { ContentPendingNotice } from './ContentPendingNotice.js';
import { AstroWeatherWidget } from './AstroWeatherWidget.js';

const { Title, Paragraph } = Typography;

export interface HoroscopeArticleProps {
  title: string;
  bodyMd: string | null;
  computed: boolean;
  humor?: boolean;
  /** Ссылка «назад» + доп. перелинковка (requirement «перелинковка по правилам док. 23»). */
  breadcrumb?: ReactNode;
  links?: ReactNode;
  what: string;
}

/**
 * Общий каркас страниц гороскопов (requirement 3 промта Ф5): H1, виджет «астропогода сегодня»,
 * текст или честный empty-state, дисклеймер, перелинковка. Шуточный контур маркируется явно
 * (requirement 5: «явная маркировка „шуточный“»).
 */
export function HoroscopeArticle({ title, bodyMd, computed, humor, breadcrumb, links, what }: HoroscopeArticleProps): React.JSX.Element {
  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      {breadcrumb}
      <Title level={1}>
        {title} {humor && <Tag color="magenta">шуточный</Tag>}
      </Title>
      {humor && (
        <Paragraph type="secondary">
          Этот раздел — литературная ирония, а не реальный астрологический прогноз (см. дисклеймер ниже).
        </Paragraph>
      )}
      <AstroWeatherWidget />
      <InfoDisclaimer />
      {computed && bodyMd ? (
        <Card style={{ marginBottom: 24 }}>
          <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{bodyMd}</Paragraph>
        </Card>
      ) : (
        <ContentPendingNotice what={what} />
      )}
      {links}
    </main>
  );
}
