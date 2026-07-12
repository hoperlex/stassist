import { Typography } from 'antd';
import { HoroscopeArticle } from '../../../lib/HoroscopeArticle.js';
import type { ShutochnyjZnakData } from './+data.js';

const { Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: ShutochnyjZnakData } }): React.JSX.Element {
  const { nameRu, znakRuSlug, bodyMd, computed } = pageContext.data;
  return (
    <HoroscopeArticle
      title={`Антигороскоп: ${nameRu}`}
      bodyMd={bodyMd}
      computed={computed}
      humor
      what={`Шуточный гороскоп для ${nameRu}`}
      breadcrumb={
        <Paragraph>
          <a href="/shutochnyj-goroskop">← Все шуточные гороскопы</a> · <a href={`/goroskop/${znakRuSlug}`}>серьёзная версия</a>
        </Paragraph>
      }
    />
  );
}
