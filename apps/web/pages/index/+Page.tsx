/** `/` — публичный лендинг «Зодиакум». Тема сайта — «Небесный свет» (дефолт, SEO-версия). Внизу
 *  (только десктоп) — переключатель оформления: «Небесный свет» + 4 альтернативных направления
 *  (Космос, Ар-деко, Альманах, Аврора) как полностраничные превью; выбор в localStorage. На мобильном
 *  переключатель скрыт, навигацию даёт гамбургер MobileNav. Главная — без общего SiteLayout (у макета
 *  своя шапка/подвал), см. lib/site/AppRoot. */
import { DesignVariant } from '../../lib/themes/DesignVariant.js';
import { ThemeSwitcher } from '../../lib/themes/ThemeSwitcher.js';
import { useHomeVariant } from '../../lib/themes/useHomeVariant.js';
import { VARIANT_ASSETS } from '../../lib/themes/variants.js';
import { MobileNav } from '../../lib/site/MobileNav.js';

export function Page(): React.JSX.Element {
  const { variant, choose } = useHomeVariant();
  return (
    <>
      <DesignVariant asset={VARIANT_ASSETS[variant]} />
      <MobileNav variant="floating" />
      {/* запас снизу, чтобы плавающий переключатель (десктоп) не перекрывал подвал */}
      <div aria-hidden style={{ height: 88 }} />
      <ThemeSwitcher active={variant} onChoose={choose} />
    </>
  );
}
