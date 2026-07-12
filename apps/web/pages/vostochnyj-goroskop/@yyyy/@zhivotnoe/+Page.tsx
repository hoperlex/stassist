import { Typography } from 'antd';
import { HoroscopeArticle } from '../../../../lib/HoroscopeArticle.js';
import type { VostochnyjGoroskopAnimalData } from './+data.js';

const { Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: VostochnyjGoroskopAnimalData } }): React.JSX.Element {
  const { yyyy, nameRu, bodyMd, computed } = pageContext.data;
  return (
    <HoroscopeArticle
      title={`Гороскоп для ${nameRu} на ${yyyy} год`}
      bodyMd={bodyMd}
      computed={computed}
      what={`Восточный гороскоп для «${nameRu}» на ${yyyy} год`}
      breadcrumb={
        <Paragraph>
          <a href={`/vostochnyj-goroskop/${yyyy}`}>← Все животные {yyyy} года</a>
        </Paragraph>
      }
      links={
        <Paragraph style={{ marginTop: 24 }}>
          См. также: <a href="/goroskop">гороскопы по знакам зодиака</a>, <a href="/lunnyj-den/1">лунные дни</a>.
        </Paragraph>
      }
    />
  );
}
