import { Alert, Card, Space, Tag, Typography } from 'antd';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import { ZODIAC_EN_TO_NAME_RU, ZODIAC_EN_TO_RU_SLUG, STONE_PLANET_NAME_RU, STONE_PURPOSE_NAME_RU, STONE_CHAKRA_NAME_RU } from '../../../lib/kamni-labels.js';
import type { KamenPageData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: KamenPageData } }): React.JSX.Element {
  const { stone } = pageContext.data;

  if (!stone) {
    return (
      <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
        <Paragraph>
          <a href="/kamni">← Все камни</a>
        </Paragraph>
        <Alert type="warning" showIcon message="Камень не найден" description="Такой карточки нет в каталоге — возможно, она ещё не опубликована." />
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/kamni">← Все камни</a>
      </Paragraph>
      <Title level={1}>{stone.name}</Title>
      {stone.status === 'draft' && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message="Требует проверки редакцией"
          description="Карточка — черновик датасета (детерминированный шаблон по общеизвестным справочным данным), минералогические/эзотерические детали требуют проверки заказчиком перед коммерческим запуском."
        />
      )}
      <InfoDisclaimer />

      <Card>
        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{stone.propertiesMd}</Paragraph>

        <Space direction="vertical" size="small" style={{ width: '100%', marginTop: 12 }}>
          {stone.colors.length > 0 && (
            <div>
              <b>Цвет: </b>
              {stone.colors.join(', ')}
            </div>
          )}
          {stone.zodiacSigns.length > 0 && (
            <div>
              <b>Знаки зодиака: </b>
              {stone.zodiacSigns.map((s) => (
                <Tag key={s}>
                  <a href={`/kamni-po-znaku/${ZODIAC_EN_TO_RU_SLUG[s]}`}>{ZODIAC_EN_TO_NAME_RU[s]}</a>
                </Tag>
              ))}
            </div>
          )}
          {stone.planets.length > 0 && (
            <div>
              <b>Планеты: </b>
              {stone.planets.map((p) => (
                <Tag key={p}>{STONE_PLANET_NAME_RU[p]}</Tag>
              ))}
            </div>
          )}
          {stone.chakras.length > 0 && (
            <div>
              <b>Чакры: </b>
              {stone.chakras.map((c) => (
                <Tag key={c}>{STONE_CHAKRA_NAME_RU[c as keyof typeof STONE_CHAKRA_NAME_RU] ?? c}</Tag>
              ))}
            </div>
          )}
          {stone.purposes.length > 0 && (
            <div>
              <b>Назначение: </b>
              {stone.purposes.map((p) => (
                <Tag key={p} color="gold">
                  {STONE_PURPOSE_NAME_RU[p]}
                </Tag>
              ))}
            </div>
          )}
          {stone.arcana.length > 0 && (
            <div>
              <b>Арканы матрицы судьбы: </b>
              {stone.arcana.join(', ')}
            </div>
          )}
          {stone.suitableMd && (
            <div>
              <b>Кому подходит: </b>
              {stone.suitableMd}
            </div>
          )}
          {stone.unsuitableMd && (
            <div>
              <b>Кому не подходит: </b>
              {stone.unsuitableMd}
            </div>
          )}
        </Space>
      </Card>

      <Card style={{ marginTop: 16 }} size="small">
        <Paragraph style={{ margin: 0 }}>
          Хотите узнать, каким арканам матрицы судьбы соответствует ваша дата рождения?{' '}
          <a href="/matrica-sudby">Проверьте свой аркан →</a>
        </Paragraph>
      </Card>
    </main>
  );
}
