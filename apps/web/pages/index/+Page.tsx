/** `/` — публичный лендинг «Зодиакум» в теме «Небесный свет» (дизайн сайта по умолчанию).
 *  Внизу — переключатель оформления: «Небесный свет» + 4 альтернативных направления (Космос,
 *  Ар-деко, Альманах, Аврора) как полностраничные превью. Выбор запоминается в localStorage.
 *  Главная рендерится без общего SiteLayout (у макета своя шапка/подвал), см. lib/site/AppRoot. */
import { DesignVariant } from '../../lib/themes/DesignVariant.js';
import { ThemeSwitcher } from '../../lib/themes/ThemeSwitcher.js';
import { useHomeVariant } from '../../lib/themes/useHomeVariant.js';
import { VARIANT_ASSETS } from '../../lib/themes/variants.js';

export function Page(): React.JSX.Element {
  const { variant, choose } = useHomeVariant();
  return (
    <>
      <DesignVariant asset={VARIANT_ASSETS[variant]} />
      {/* запас снизу, чтобы плавающий переключатель не перекрывал подвал */}
      <div aria-hidden style={{ height: 96 }} />
      <ThemeSwitcher active={variant} onChoose={choose} />
    </>
  );
}
