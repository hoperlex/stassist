import { Alert, Table, Typography } from 'antd';
import { SIGN_NAMES_RU } from '@stassist/ui';
import { MOON_PHASE_NAMES_RU } from '../../../lib/moon-phase-ru.js';
import { InfoDisclaimer } from '../../../lib/InfoDisclaimer.js';
import type { LunnyjKalendarMonthData } from './+data.js';

const { Title, Paragraph } = Typography;

export function Page({ pageContext }: { pageContext: { data: LunnyjKalendarMonthData } }): React.JSX.Element {
  const { yyyyMm, days, referenceLocation, computed, prevYyyyMm, nextYyyyMm } = pageContext.data;

  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <Paragraph>
        <a href="/lunnyj-kalendar">← Лунный календарь</a>
      </Paragraph>
      <Title level={1}>Лунный календарь на {yyyyMm}</Title>
      <Paragraph>
        Данные по {referenceLocation.name} ({referenceLocation.tzId}).
      </Paragraph>
      <InfoDisclaimer />

      <Paragraph>
        <a href={`/lunnyj-kalendar/${prevYyyyMm}`}>← Предыдущий месяц</a>
        {'  '}
        <a href={`/lunnyj-kalendar/${nextYyyyMm}`}>Следующий месяц →</a>
      </Paragraph>

      {computed && days.length > 0 ? (
        <Table
          size="small"
          pagination={false}
          rowKey="date"
          dataSource={days}
          columns={[
            { title: 'Дата', dataIndex: 'date' },
            { title: 'Лунный день', dataIndex: 'lunarDay' },
            { title: 'Луна в знаке', dataIndex: 'moonSignIndex', render: (i: number) => SIGN_NAMES_RU[i] },
            { title: 'Фаза', dataIndex: 'phaseName', render: (n: string) => MOON_PHASE_NAMES_RU[n] ?? n },
            { title: 'Void', dataIndex: 'isVoidOfCourse', render: (v: boolean) => (v ? 'да' : '—') },
          ]}
        />
      ) : (
        <Alert
          type="warning"
          showIcon
          message="Календарь на этот месяц наполняется"
          description="Worker предрасчитывает лунный календарь на скользящее окно 18 месяцев вперёд ежесуточно — если месяц ещё не в окне (например, далёкое прошлое) или предрасчёт ещё не запускался, данных пока нет."
        />
      )}
    </main>
  );
}
