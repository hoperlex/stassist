import { Alert, Typography } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * Общий рендер для юридических страниц-заглушек (согласие уже вынесено в /consent —
 * отдельный экран с чекбоксом; эта обёртка — для чисто информационных документов: политика,
 * оферта, дисклеймер). Явно маркирует текст как черновик — см. §8 конвенций реализации: агент
 * не фабрикует реквизиты оператора/финальные формулировки, отмечает это явно, а не молчит.
 */
export function LegalDocPage({ title, text }: { title: string; text: string }): React.JSX.Element {
  return (
    <main style={{ maxWidth: 720, margin: '64px auto', padding: '0 24px' }}>
      <Title level={2}>{title}</Title>
      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
        message="Черновик — не имеет юридической силы"
        description="Структура документа готова, финальный текст и реквизиты оператора утверждает заказчик перед публичным запуском."
      />
      {text.split('\n\n').map((paragraph, i) => (
        <Paragraph key={i} style={{ whiteSpace: 'pre-wrap' }}>
          {paragraph}
        </Paragraph>
      ))}
    </main>
  );
}
