/**
 * Мобильная навигация: кнопка-гамбургер + выезжающая панель (AntD Drawer) со всеми разделами,
 * входом/регистрацией и ссылками подвала. Общий компонент для шапки внутренних страниц
 * (`variant="header"`) и главной (`variant="floating"` — плавающая кнопка поверх героя, т.к. у
 * главной своя захардкоженная шапка без SiteLayout).
 *
 * Гидрация: начальное `open=false` → Drawer не рендерит портал ни на сервере, ни в первом
 * клиентском рендере; сама кнопка всегда в дереве и лишь скрывается CSS на десктопе — рассинхрона
 * нет. Стили самодостаточны (инъектятся тут же), опираются на переменные --zx-* из global-css,
 * которые доступны на КАЖДОЙ странице (в т.ч. на главной без SiteLayout).
 */
import { useState } from 'react';
import { Drawer } from 'antd';
import { NAV, FOOTER } from './nav-items.js';

const MOBILE_NAV_CSS = `
.zx-burger{display:none;align-items:center;justify-content:center;flex-direction:column;gap:5px;
  width:44px;height:44px;padding:0;background:none;border:0;cursor:pointer;flex:0 0 auto}
.zx-burger span{display:block;width:22px;height:2px;border-radius:2px;background:var(--zx-ink);transition:.2s}
.zx-burger--floating{position:fixed;top:12px;right:12px;z-index:60;
  background:rgba(251,247,240,0.92);border:1px solid var(--zx-line);border-radius:12px;
  -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 6px 18px rgba(42,37,64,0.12)}
.zx-drawer .ant-drawer-body{padding:12px 20px 24px}
.zx-drawer-nav{display:flex;flex-direction:column}
.zx-drawer-nav a{display:flex;align-items:center;min-height:46px;font-size:16px;font-weight:600;
  color:var(--zx-ink);text-decoration:none;border-bottom:1px solid var(--zx-line)}
.zx-drawer-nav a:active{color:var(--zx-peri-deep)}
.zx-drawer-auth{display:flex;flex-direction:column;gap:12px;margin:18px 0 6px}
.zx-drawer-btn{font-family:var(--zx-sans);font-weight:600;font-size:15px;border-radius:999px;
  min-height:46px;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;
  border:1px solid transparent}
.zx-drawer-btn.ghost{background:rgba(255,255,255,0.6);border-color:var(--zx-line);color:var(--zx-ink)}
.zx-drawer-btn.accent{background:linear-gradient(135deg,#8A86EC 0%,#6560CE 100%);color:#fff;
  box-shadow:0 8px 20px rgba(101,96,206,0.28), inset 0 1px 0 rgba(255,255,255,0.25)}
.zx-drawer-foot{display:flex;flex-direction:column;gap:2px;margin-top:16px;padding-top:14px;
  border-top:1px solid var(--zx-line)}
.zx-drawer-foot a{display:flex;align-items:center;min-height:38px;font-size:14px;font-weight:600;
  color:var(--zx-muted);text-decoration:none}
@media(max-width:860px){.zx-burger{display:flex}}
`;

export function MobileNav({ variant = 'header' }: { variant?: 'header' | 'floating' }): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const close = (): void => setOpen(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MOBILE_NAV_CSS }} />
      <button
        type="button"
        className={variant === 'floating' ? 'zx-burger zx-burger--floating' : 'zx-burger'}
        aria-label="Открыть меню"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>
      <Drawer
        rootClassName="zx-drawer"
        title="Меню"
        placement="right"
        width={300}
        open={open}
        onClose={close}
      >
        <nav className="zx-drawer-nav">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="zx-drawer-auth">
          <a href="/login" className="zx-drawer-btn ghost" onClick={close}>
            Войти
          </a>
          <a href="/register" className="zx-drawer-btn accent" onClick={close}>
            Регистрация
          </a>
        </div>
        <div className="zx-drawer-foot">
          {FOOTER.map((item) => (
            <a key={item.label} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
        </div>
      </Drawer>
    </>
  );
}
