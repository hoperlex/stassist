import { PostView } from '../../../lib/community/PostView.js';
import type { PostPageData } from './+data.js';

/** `/soobshchestvo/{id}` — публичная страница поста (Ф9): SSR-чтение, интерактив под логином. */
export function Page({ pageContext }: { pageContext: { data: PostPageData } }): React.JSX.Element {
  const { post, comments } = pageContext.data;
  return <PostView initialPost={post} initialComments={comments} backHref="/soobshchestvo" />;
}
