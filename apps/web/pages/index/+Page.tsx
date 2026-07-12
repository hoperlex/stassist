/** `/` — публичный лендинг услуг «Зодиакум». Поддерживает 6 вариантов оформления: исходный
 *  минимал-antd («Текущий») + 5 дизайн-направлений. Переключатель — внизу страницы; выбор
 *  запоминается в localStorage. SSR/первый рендер = «Текущий» (SEO-версия неизменна). */
import { DesignVariant } from '../../lib/themes/DesignVariant.js';
import { ExistingHome } from '../../lib/themes/ExistingHome.js';
import { ThemeSwitcher } from '../../lib/themes/ThemeSwitcher.js';
import { useHomeVariant } from '../../lib/themes/useHomeVariant.js';
import { VARIANT_ASSETS } from '../../lib/themes/variants.js';

export function Page(): React.JSX.Element {
  const { variant, choose } = useHomeVariant();
  return (
    <>
      {variant === 'existing' ? (
        <ExistingHome />
      ) : (
        <DesignVariant asset={VARIANT_ASSETS[variant]} />
      )}
      {/* запас снизу, чтобы плавающий переключатель не перекрывал подвал */}
      <div aria-hidden style={{ height: 96 }} />
      <ThemeSwitcher active={variant} onChoose={choose} />
    </>
  );
}
