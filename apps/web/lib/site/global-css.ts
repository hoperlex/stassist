/**
 * Базовый глобальный CSS темы «Небесный свет» — фон страницы (рассветный градиент), шрифты,
 * serif-заголовки, ссылки. Инъектится один раз в AppRoot на КАЖДОЙ странице. Хранится как строка
 * в .ts (а не .css), чтобы Vite не прогонял файл через CSS-конвейер. CSS-переменные --zx-*
 * используются и в SiteLayout.
 */
export const CELESTIAL_GLOBAL_CSS = `
:root{
  --zx-serif:'P052','C059','Nimbus Roman','DejaVu Serif',serif;
  --zx-sans:'Quicksand','Ubuntu','Nimbus Sans','DejaVu Sans',sans-serif;
  --zx-glyph:'DejaVu Sans','Noto Color Emoji',sans-serif;
  --zx-ink:#2A2540;
  --zx-muted:#5E587A;
  --zx-soft:#847EA0;
  --zx-peri:#7C7CE0;
  --zx-peri-deep:#5B57C7;
  --zx-gold:#C8A24B;
  --zx-line:rgba(42,37,64,0.09);
}
html{background:#FBF7F0}
body{
  margin:0;
  min-height:100vh;
  font-family:var(--zx-sans);
  color:var(--zx-ink);
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  background:
    radial-gradient(1100px 620px at 14% -8%, rgba(200,162,75,0.10), rgba(200,162,75,0) 60%),
    radial-gradient(1000px 760px at 92% 4%, rgba(124,124,224,0.14), rgba(124,124,224,0) 58%),
    radial-gradient(900px 700px at 60% 108%, rgba(233,183,193,0.16), rgba(233,183,193,0) 60%),
    linear-gradient(178deg,#FBF7F0 0%,#F2EFFB 46%,#FBF4F3 100%);
  background-attachment:fixed;
}
h1,h2,h3,h4,h5,h6{font-family:var(--zx-serif);color:var(--zx-ink)}
h1.ant-typography,h2.ant-typography,h3.ant-typography,h4.ant-typography,h5.ant-typography,
.ant-typography h1,.ant-typography h2,.ant-typography h3,.ant-typography h4,.ant-typography h5{
  font-family:var(--zx-serif);
}

/* Плавные заголовки AntD на внутренних страницах — равная специфичность + позже в исходнике,
   поэтому переопределяют дефолты AntD без !important (тот же приём, что у serif-правила выше). */
h1.ant-typography{font-size:clamp(26px,4vw,38px)}
h2.ant-typography{font-size:clamp(22px,3.2vw,30px)}
h3.ant-typography{font-size:clamp(19px,2.6vw,24px)}

/* Плавные SVG-диаграммы (натальная карта, матрица судьбы): CSS-width перебивает презентационный
   атрибут width= у SVG, viewBox+height:auto держит пропорции. Рендер-функции не трогаем — их
   width/height нужны resvg в PNG-воркере. */
.stassist-chart-wheel,.stassist-matrix-octagram{max-width:100%}
.stassist-chart-wheel svg{width:100%;height:auto;max-width:420px;display:block}
.stassist-matrix-octagram svg{width:100%;height:auto;max-width:380px;display:block}

/* Мобильный: поджать крупные верхние отступы у страничных <main> (инлайн-стили бьются !important).
   Главная без SiteLayout не затрагивается. */
@media(max-width:640px){
  .zx-site > main{margin-top:24px !important;margin-bottom:32px !important}
}
`;
