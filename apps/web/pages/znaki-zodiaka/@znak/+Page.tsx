import { Alert, Card, Tag, Typography } from 'antd';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import { AstroWeatherWidget } from '../../../lib/AstroWeatherWidget.js';
import type { ZnakiZodiakaData } from './+data.js';

const { Title, Paragraph } = Typography;

const QUALITY_NAME_RU: Record<string, string> = {
  cardinal: 'кардинальный',
  fixed: 'фиксированный',
  mutable: 'мутабельный',
};

export function Page({ pageContext }: { pageContext: { data: ZnakiZodiakaData } }): React.JSX.Element {
  const { sign, enSlug, text } = pageContext.data;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/goroskop">← Все знаки зодиака</a>
      </Paragraph>
      <Title level={1}>
        {sign.glyph} Знак зодиака {sign.nameRu}
      </Title>
      <Paragraph>
        <Tag color="gold">стихия: {sign.elementRu}</Tag>
        <Tag>{QUALITY_NAME_RU[sign.quality] ?? sign.quality}</Tag>
      </Paragraph>

      <AstroWeatherWidget />

      {text?.quality === 'draft' && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message="Черновик, требует редактуры"
          description="Текст — из корпуса интерпретаций, ещё не вычитан редактором."
        />
      )}
      <InfoDisclaimer />

      {!text ? (
        <Alert type="warning" showIcon message="Текст готовится" description="Описание этого знака ещё не засеяно в корпусе — загляните позже." />
      ) : (
        <Card>
          <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{text.text}</Paragraph>
        </Card>
      )}

      <Card size="small" style={{ marginTop: 16 }}>
        <Paragraph style={{ margin: 0 }}>
          Также для {sign.nameRuGenitive}: <a href={`/goroskop/${sign.slug}`}>гороскоп на сегодня</a>,{' '}
          <a href={`/kamni-po-znaku/${sign.slug}`}>подходящие камни</a>,{' '}
          <a href={`/wiki/signs/${enSlug}`}>подробная статья в вики</a>,{' '}
          <a href="/sovmestimost">совместимость с другими знаками</a>.
        </Paragraph>
      </Card>
    </main>
  );
}
