import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

/** Публичная SSR-страница «/»: должна отдавать осмысленный контент без выполнения JS. */
export function Page(): React.JSX.Element {
  return (
    <main style={{ maxWidth: 640, margin: '96px auto', padding: '0 24px', textAlign: 'center' }}>
      <Title>Stassist</Title>
      <Paragraph>
        Русскоязычный астрологический портал — гороскопы, ИИ-астропомощник, нумерология и
        матрица судьбы, база знаний. Сайт уже в разработке, скоро откроемся.
      </Paragraph>
    </main>
  );
}
