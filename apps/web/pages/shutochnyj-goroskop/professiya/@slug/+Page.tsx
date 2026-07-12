import { Typography } from 'antd';
import { HoroscopeArticle } from '../../../../lib/HoroscopeArticle.js';
import type { ShutochnyjProfessiyaData } from './+data.js';

const { Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: ShutochnyjProfessiyaData } }): React.JSX.Element {
  const { nameRu, bodyMd, computed } = pageContext.data;
  return (
    <HoroscopeArticle
      title={`Гороскоп ${nameRu}`}
      bodyMd={bodyMd}
      computed={computed}
      humor
      what={`Шуточный гороскоп ${nameRu}`}
      breadcrumb={
        <Paragraph>
          <a href="/shutochnyj-goroskop">← Все шуточные гороскопы</a>
        </Paragraph>
      }
    />
  );
}
