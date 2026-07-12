import { SkyDayView } from '../../../lib/sky/SkyDayView.js';
import type { NeboDnyaData } from '../+data.js';

/** Архивная страница «Неба дня» — чек-ин недоступен (только «сегодня»), чтение/тред работают. */
export function Page({ pageContext }: { pageContext: { data: NeboDnyaData } }): React.JSX.Element {
  const { day, comments } = pageContext.data;
  if (!day) return <></>; // недостижимо: +data.ts бросает 404 без day
  return <SkyDayView day={day} comments={comments} isToday={false} />;
}
