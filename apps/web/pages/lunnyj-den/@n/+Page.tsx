import { Typography } from 'antd';
// Импорт напрямую из подмодуля (а НЕ `from '@stassist/shared'`) — баррель тянет node:crypto в
// клиентский бандл, см. doc-комментарий apps/web/lib/goroskop-nav-links.ts.
import { LUNAR_DAY_COUNT } from '@stassist/shared/schemas/horoscope.js';
import { HoroscopeArticle } from '../../../lib/HoroscopeArticle.js';
import type { LunnyjDenData } from './+data.js';

const { Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: LunnyjDenData } }): React.JSX.Element {
  const { n, bodyMd, computed } = pageContext.data;
  const prev = n > 1 ? n - 1 : null;
  const next = n < LUNAR_DAY_COUNT ? n + 1 : null;

  return (
    <HoroscopeArticle
      title={`${n}-й лунный день`}
      bodyMd={bodyMd}
      computed={computed}
      what={`Значение ${n}-го лунного дня`}
      breadcrumb={
        <Paragraph>
          <a href="/lunnyj-kalendar">← Лунный календарь</a>
        </Paragraph>
      }
      links={
        <Paragraph style={{ marginTop: 24 }}>
          {prev && <a href={`/lunnyj-den/${prev}`}>← {prev}-й день</a>}
          {prev && next && ' · '}
          {next && <a href={`/lunnyj-den/${next}`}>{next}-й день →</a>}
        </Paragraph>
      }
    />
  );
}
