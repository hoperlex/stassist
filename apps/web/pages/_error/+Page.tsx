import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface ErrorPageProps {
  pageContext?: { is404?: boolean };
}

/**
 * Страница ошибок Vike (см. https://vike.dev/error-page): без нее несуществующие маршруты
 * рендерились бы как 500 вместо 404 (см. verification Ф0). pageContext передаётся пропом из
 * renderer/+onRenderHtml.tsx и +onRenderClient.tsx — здесь нет vike-react (см. их комментарии
 * про несовместимость с React 18), поэтому без хука usePageContext.
 */
export function Page({ pageContext }: ErrorPageProps): React.JSX.Element {
  const is404 = pageContext?.is404 ?? false;

  return (
    <main style={{ maxWidth: 640, margin: '96px auto', padding: '0 24px', textAlign: 'center' }}>
      <Title>{is404 ? '404 — страница не найдена' : 'Ошибка сервера'}</Title>
      <Paragraph>
        {is404
          ? 'Такой страницы на портале Stassist нет.'
          : 'Что-то пошло не так. Мы уже знаем об этом.'}
      </Paragraph>
    </main>
  );
}
