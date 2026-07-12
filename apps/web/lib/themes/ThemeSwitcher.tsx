/**
 * Плавающий переключатель оформления внизу главной (5 вариантов, только десктоп — на мобильном
 * его заменяет гамбургер MobileNav). Оформлен исключительно
 * inline-стилями + один <style> с максимально специфичными правилами под класс .zx-switcher —
 * чтобы глобальный CSS активного варианта (правила для button/a и т.п.) не мог его перекрасить
 * или сломать. Тёмная полупрозрачная «пилюля» одинаково читается и на светлых, и на тёмных темах.
 */
import { VARIANTS, type VariantId } from './variants.js';

const BAR_FONT = "'Ubuntu', 'DejaVu Sans', system-ui, sans-serif";

export function ThemeSwitcher({
  active,
  onChoose,
}: {
  active: VariantId;
  onChoose: (v: VariantId) => void;
}): React.JSX.Element {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
.zx-switcher, .zx-switcher * { box-sizing: border-box; }
.zx-switcher__seg { transition: background .15s ease, color .15s ease, border-color .15s ease; }
.zx-switcher__seg:hover { background: rgba(255,255,255,.14) !important; color: #fff !important; }
.zx-switcher__seg--active:hover { background: #6d5efc !important; }
@media (max-width: 860px) { .zx-switcher { display: none !important; } }
`,
        }}
      />
      <div
        className="zx-switcher"
        role="group"
        aria-label="Оформление сайта"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 18,
          transform: 'translateX(-50%)',
          zIndex: 2147483000,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          maxWidth: 'calc(100vw - 24px)',
          overflowX: 'auto',
          padding: '8px 10px',
          borderRadius: 999,
          background: 'rgba(17, 18, 28, 0.86)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 10px 34px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          fontFamily: BAR_FONT,
        }}
      >
        <span
          className="zx-switcher__label"
          style={{
            flex: '0 0 auto',
            padding: '0 8px 0 6px',
            fontSize: 12,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: BAR_FONT,
            userSelect: 'none',
          }}
        >
          Оформление
        </span>
        {VARIANTS.map((v) => {
          const isActive = v.id === active;
          return (
            <button
              key={v.id}
              type="button"
              title={v.fullLabel}
              aria-pressed={isActive}
              onClick={() => onChoose(v.id)}
              className={`zx-switcher__seg${isActive ? ' zx-switcher__seg--active' : ''}`}
              style={{
                flex: '0 0 auto',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                margin: 0,
                padding: '7px 14px',
                borderRadius: 999,
                fontFamily: BAR_FONT,
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                lineHeight: 1.1,
                letterSpacing: 0,
                border: isActive ? '1px solid transparent' : '1px solid rgba(255,255,255,0.16)',
                background: isActive ? '#6d5efc' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.78)',
                boxShadow: isActive ? '0 4px 14px rgba(109,94,252,0.5)' : 'none',
                textShadow: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
