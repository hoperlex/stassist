import { useMemo } from 'react';
import { renderMatrixOctagramSvg } from './render-matrix-octagram.js';
import type { MatrixOctagramInput } from './types.js';

/** Изоморфная React-обёртка над {@link renderMatrixOctagramSvg} — см. ChartWheel.tsx (тот же
 *  паттерн: одна и та же строка на SSR/клиенте/resvg). */
export function MatrixOctagram(props: MatrixOctagramInput): React.JSX.Element {
  const svg = useMemo(() => renderMatrixOctagramSvg(props), [props]);
  return <div className="stassist-matrix-octagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
