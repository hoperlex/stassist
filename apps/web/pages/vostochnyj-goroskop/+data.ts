import { redirect } from 'vike/abort';

/** `/vostochnyj-goroskop` — редирект на хаб текущего года (см. requirement 3 промта Ф5: «хаб
 *  `/vostochnyj-goroskop/{yyyy}` + 12 страниц»). */
export async function data(): Promise<never> {
  const year = new Date().getUTCFullYear();
  throw redirect(`/vostochnyj-goroskop/${year}`, 302);
}
