import { Typography } from 'antd';
// Импорт напрямую из подмодуля (а НЕ `from '@stassist/shared'`) — баррель тянет node:crypto в
// клиентский бандл, см. doc-комментарий apps/web/lib/goroskop-nav-links.ts.
import { HOROSCOPE_PERIOD_NAME_RU, HOROSCOPE_TOPIC_NAME_RU } from '@stassist/shared/schemas/horoscope.js';
import { HoroscopeArticle } from './HoroscopeArticle.js';
import { goroskopNavLinks } from './goroskop-nav-links.js';
import type { GoroskopPageData } from './goroskop-page-data.js';

const { Paragraph } = Typography;

/** Общий рендер для трёх уровней маршрутов `/goroskop/{znak}[...]` (см. goroskop-page-data.ts). */
export function GoroskopPageView({ data }: { data: GoroskopPageData }): React.JSX.Element {
  const { sign, h1, bodyMd, computed, period, topic } = data;
  const links = goroskopNavLinks(sign.slug);

  return (
    <HoroscopeArticle
      title={h1}
      bodyMd={bodyMd}
      computed={computed}
      what={`Гороскоп для ${sign.nameRuGenitive} (${HOROSCOPE_PERIOD_NAME_RU[period]}, ${HOROSCOPE_TOPIC_NAME_RU[topic]})`}
      breadcrumb={
        <Paragraph>
          <a href="/goroskop">← Все знаки зодиака</a> · <a href={`/shutochnyj-goroskop/${sign.slug}`}>шуточная версия</a>
        </Paragraph>
      }
      links={
        <>
          <Paragraph style={{ marginTop: 24 }}>Другие периоды и темы для {sign.nameRuGenitive}:</Paragraph>
          <Paragraph>
            {links.map((l) => (
              <a key={`${l.period}-${l.topic}`} href={l.path} style={{ marginRight: 12 }}>
                {l.label}
              </a>
            ))}
          </Paragraph>
          <Paragraph>
            См. также: <a href={`/znaki-zodiaka/${sign.slug}`}>описание знака {sign.nameRuGenitive}</a>,{' '}
            <a href={`/goroskop/${new Date().getUTCFullYear()}/${sign.slug}`}>годовой гороскоп {sign.nameRuGenitive}</a>,{' '}
            <a href="/sovmestimost">совместимость знаков</a>, <a href="/lunnyj-den/1">лунный календарь</a>.
          </Paragraph>
        </>
      }
    />
  );
}
