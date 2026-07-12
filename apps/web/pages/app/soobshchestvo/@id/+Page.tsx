import { useEffect } from 'react';
import { Spin, Typography } from 'antd';

/** Ф9: тонкий редирект на публичную страницу поста — см. doc-комментарий ../+Page.tsx. */
export function Page({ pageContext }: { pageContext: { routeParams: { id: string } } }): React.JSX.Element {
  const target = `/soobshchestvo/${pageContext.routeParams.id}`;
  useEffect(() => {
    window.location.replace(target);
  }, [target]);
  return (
    <main style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
      <Spin />
      <Typography.Paragraph style={{ marginTop: 16 }}>
        Пост переехал: <a href={target}>{target}</a>
      </Typography.Paragraph>
    </main>
  );
}
