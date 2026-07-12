/**
 * Общий каркас сайта в теме «Небесный свет»: шапка (лого + навигация + вход/регистрация) и подвал
 * (лого + ссылки + дисклеймер). Оборачивает контент каждой публичной страницы (кроме главной —
 * у неё собственный герой/переключатель, см. AppRoot). Разметка/стили портированы из дизайн-макета
 * lib/themes/generated/light.* ; CSS скоупится под .zx-site (классы zx-*), поэтому не конфликтует с
 * контентом страниц (antd) и опирается на переменные --zx-* из global-css.ts.
 */
const NAV: Array<{ href: string; label: string }> = [
  { href: '/natalnaya-karta', label: 'Натальная карта' },
  { href: '/matrica-sudby', label: 'Матрица судьбы' },
  { href: '/sovmestimost', label: 'Совместимость' },
  { href: '/goroskop', label: 'Гороскоп' },
  { href: '/lunnyj-kalendar', label: 'Лунный календарь' },
  { href: '/wiki', label: 'База знаний' },
];

const FOOTER: Array<{ href: string; label: string }> = [
  { href: '/o-nas', label: 'О проекте' },
  { href: '/redakciya', label: 'Редакция' },
  { href: '/methodology', label: 'Методология расчётов' },
  { href: '/faq', label: 'Вопросы и ответы' },
  { href: '/wiki', label: 'База знаний' },
  { href: '/pravila-soobshchestva', label: 'Правила сообщества' },
];

const SITE_CSS = `
.zx-site{display:flex;flex-direction:column;min-height:100vh}
.zx-site > main,.zx-site > .zx-page{flex:1 0 auto}
.zx-wrap{max-width:1140px;margin:0 auto;padding:0 30px}
.zx-hd{padding:22px 0 10px}
.zx-hd-row{display:flex;align-items:center;justify-content:space-between;gap:22px}
.zx-logo{display:flex;align-items:center;gap:11px;text-decoration:none;flex:0 0 auto}
.zx-logo svg{width:34px;height:34px;flex:0 0 auto}
.zx-name{font-family:var(--zx-serif);font-size:24px;font-weight:700;letter-spacing:.5px;color:var(--zx-ink)}
.zx-name b{color:var(--zx-peri-deep);font-weight:700}
.zx-nav{display:flex;align-items:center;gap:22px;flex:1 1 auto;justify-content:center;flex-wrap:wrap}
.zx-nav a{font-size:14px;font-weight:600;color:var(--zx-muted);text-decoration:none;white-space:nowrap;transition:color .2s}
.zx-nav a:hover{color:var(--zx-peri-deep)}
.zx-auth{display:flex;align-items:center;gap:12px;flex:0 0 auto}
.zx-btn{font-family:var(--zx-sans);font-weight:600;font-size:14px;border-radius:999px;padding:9px 18px;
  text-decoration:none;white-space:nowrap;display:inline-flex;align-items:center;border:1px solid transparent;transition:.2s;cursor:pointer}
.zx-btn.ghost{background:rgba(255,255,255,0.6);border-color:var(--zx-line);color:var(--zx-ink)}
.zx-btn.ghost:hover{border-color:var(--zx-peri);color:var(--zx-peri-deep)}
.zx-btn.accent{background:linear-gradient(135deg,#8A86EC 0%,#6560CE 100%);color:#fff;
  box-shadow:0 8px 20px rgba(101,96,206,0.28), inset 0 1px 0 rgba(255,255,255,0.25)}
.zx-ft{margin-top:56px;padding:38px 0 46px;border-top:1px solid var(--zx-line)}
.zx-ft-top{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-bottom:20px}
.zx-ft-logo{display:flex;align-items:center;gap:10px}
.zx-ft-logo span{font-family:var(--zx-serif);font-size:20px;font-weight:700;color:var(--zx-ink)}
.zx-ft-links{display:flex;flex-wrap:wrap;gap:8px 24px}
.zx-ft-links a{font-size:14px;font-weight:600;color:var(--zx-muted);text-decoration:none}
.zx-ft-links a:hover{color:var(--zx-peri-deep)}
.zx-disclaimer{font-size:13px;line-height:1.6;color:var(--zx-soft);max-width:760px;margin:0;font-weight:500}
@media(max-width:880px){
  .zx-hd-row{flex-wrap:wrap;justify-content:center}
  .zx-nav{order:3;width:100%}
}
`;

function LogoMark(): React.JSX.Element {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="#C8A24B" strokeWidth="1.1" opacity="0.7" />
      <circle cx="20" cy="20" r="13" stroke="#7C7CE0" strokeWidth="1.1" opacity="0.55" />
      <path d="M27 13.5a10 10 0 1 0 3.2 9.3A8 8 0 0 1 27 13.5Z" fill="#7C7CE0" />
      <path
        transform="translate(33.5,12.5) scale(0.42)"
        d="M0,-7 C0.6,-2.4 2.4,-0.6 7,0 C2.4,0.6 0.6,2.4 0,7 C-0.6,2.4 -2.4,0.6 -7,0 C-2.4,-0.6 -0.6,-2.4 0,-7 Z"
        fill="#C8A24B"
      />
      <circle cx="9.5" cy="27" r="1.4" fill="#C8A24B" />
    </svg>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="zx-site">
      <style dangerouslySetInnerHTML={{ __html: SITE_CSS }} />
      <header className="zx-hd">
        <div className="zx-wrap zx-hd-row">
          <a className="zx-logo" href="/">
            <LogoMark />
            <span className="zx-name">
              Зодиаку<b>м</b>
            </span>
          </a>
          <nav className="zx-nav">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="zx-auth">
            <a href="/login" className="zx-btn ghost">
              Войти
            </a>
            <a href="/register" className="zx-btn accent">
              Регистрация
            </a>
          </div>
        </div>
      </header>

      {children}

      <footer className="zx-ft">
        <div className="zx-wrap">
          <div className="zx-ft-top">
            <div className="zx-ft-logo">
              <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="18.5" stroke="#C8A24B" strokeWidth="1.1" opacity="0.7" />
                <path d="M27 13.5a10 10 0 1 0 3.2 9.3A8 8 0 0 1 27 13.5Z" fill="#7C7CE0" />
              </svg>
              <span>Зодиакум</span>
            </div>
            <nav className="zx-ft-links">
              {FOOTER.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <p className="zx-disclaimer">
            Материалы носят информационно-развлекательный характер и не заменяют профессиональную
            консультацию.
          </p>
        </div>
      </footer>
    </div>
  );
}
