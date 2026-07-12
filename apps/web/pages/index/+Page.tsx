/** `/` — публичный лендинг «Зодиакум» в теме «Небесный свет» (единственное оформление сайта).
 *  Главная рендерится без общего SiteLayout (у макета своя шапка/подвал), см. lib/site/AppRoot.
 *  На мобильном — плавающая кнопка-гамбургер (MobileNav): своя шапка макета прячет навигацию
 *  на узких экранах (см. light.style.txt), а полное меню открывается из гамбургера. */
import { DesignVariant } from '../../lib/themes/DesignVariant.js';
import { LIGHT_ASSET } from '../../lib/themes/variants.js';
import { MobileNav } from '../../lib/site/MobileNav.js';

export function Page(): React.JSX.Element {
  return (
    <>
      <DesignVariant asset={LIGHT_ASSET} />
      <MobileNav variant="floating" />
    </>
  );
}
