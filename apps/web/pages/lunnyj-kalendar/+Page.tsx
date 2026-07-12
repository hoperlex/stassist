import { Alert, Card, Descriptions, Typography } from 'antd';
import { SIGN_NAMES_RU } from '@stassist/ui';
import { MOON_PHASE_NAMES_RU } from '../../lib/moon-phase-ru.js';
import { InfoDisclaimer } from '../../lib/InfoDisclaimer.js';
import type { LunnyjKalendarData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: LunnyjKalendarData } }): React.JSX.Element {
  const { currentYyyyMm, today, referenceLocation, computed } = pageContext.data;

  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px' }}>
      <Title level={1}>Лунный календарь</Title>
      <Paragraph>
        Лунный день, знак и фаза Луны, периоды «Луна без курса» — по {referenceLocation.name}
        ({referenceLocation.tzId}). Лунные дни зависят от географии наблюдателя: для персональной
        локации подключите профиль в личном кабинете.
      </Paragraph>
      <InfoDisclaimer />

      <Card>
        {computed && today ? (
          <Descriptions title="Сегодня" column={1} size="small">
            <Descriptions.Item label="Лунный день">{today.lunarDay}</Descriptions.Item>
            <Descriptions.Item label="Луна в знаке">{SIGN_NAMES_RU[today.moonSignIndex]}</Descriptions.Item>
            <Descriptions.Item label="Фаза">{MOON_PHASE_NAMES_RU[today.phaseName] ?? today.phaseName}</Descriptions.Item>
            <Descriptions.Item label="Без курса (void)">{today.isVoidOfCourse ? 'да' : 'нет'}</Descriptions.Item>
            {today.retrogradeBodies.length > 0 && (
              <Descriptions.Item label="Ретроградные планеты">{today.retrogradeBodies.join(', ')}</Descriptions.Item>
            )}
          </Descriptions>
        ) : (
          <Alert
            type="warning"
            showIcon
            message="Календарь наполняется"
            description="Предрасчёт лунного календаря выполняется worker'ом ежесуточно — данные на сегодня появятся в ближайшее время."
          />
        )}
      </Card>

      <Paragraph style={{ marginTop: 24 }}>
        <a href={`/lunnyj-kalendar/${currentYyyyMm}`}>Открыть календарь на текущий месяц →</a>
      </Paragraph>
    </main>
  );
}
