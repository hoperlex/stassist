import { GoroskopPageView } from '../../../../lib/GoroskopPageView.js';
import type { GoroskopPageData } from '../../../../lib/goroskop-page-data.js';

export function Page({ pageContext }: { pageContext: { data: GoroskopPageData } }): React.JSX.Element {
  return <GoroskopPageView data={pageContext.data} />;
}
