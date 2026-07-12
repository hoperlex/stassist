import { Card, Tag, Typography } from 'antd';
import type { InterpretationText } from './interpretation.js';

const { Paragraph, Title } = Typography;

/**
 * Отображает текст чанка корпуса Ф4 с бейджем «черновик» для quality='draft' (см. §6 конвенций
 * реализации: draft-чанки публикуются на SSR наравне с reviewed, но помечаются явно — НЕ
 * скрываются). Заголовок — опционален (для нескольких блоков подряд, напр. позиций матрицы).
 */
export function InterpretationBlock({ title, entry }: { title?: string; entry: InterpretationText }): React.JSX.Element {
  return (
    <Card size="small" style={{ marginBottom: 12 }}>
      {title && (
        <Title level={5} style={{ marginTop: 0 }}>
          {title} {entry.quality === 'draft' && <Tag color="orange">черновик</Tag>}
        </Title>
      )}
      {!title && entry.quality === 'draft' && <Tag color="orange" style={{ marginBottom: 8 }}>черновик</Tag>}
      <Paragraph style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>{entry.text}</Paragraph>
    </Card>
  );
}
