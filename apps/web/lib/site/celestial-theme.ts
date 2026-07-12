/**
 * Тема antd «Небесный свет» — глобальное оформление всего сайта (применяется на каждой странице
 * через AppRoot → ConfigProvider). Палитра и типографика извлечены из дизайн-макета
 * lib/themes/generated/light.* : барвинок #7C7CE0/#5B57C7, тёплое золото #C8A24B, чернила #2A2540,
 * тело — Quicksand, заголовки — serif (задаются глобальным CSS, см. global-css.ts).
 */
import type { ThemeConfig } from 'antd';

const SANS = "'Quicksand','Ubuntu','Nimbus Sans','DejaVu Sans',sans-serif";

export const celestialTheme: ThemeConfig = {
  token: {
    colorPrimary: '#6560CE',
    colorLink: '#5B57C7',
    colorLinkHover: '#7C7CE0',
    colorInfo: '#6560CE',
    colorText: '#2A2540',
    colorTextSecondary: '#5E587A',
    colorTextTertiary: '#847EA0',
    colorBorder: 'rgba(42,37,64,0.16)',
    colorBorderSecondary: 'rgba(42,37,64,0.09)',
    colorBgLayout: 'transparent',
    colorBgContainer: '#ffffff',
    fontFamily: SANS,
    fontSize: 15,
    borderRadius: 14,
    wireframe: false,
  },
  components: {
    Card: { borderRadiusLG: 20 },
    Button: { primaryShadow: '0 8px 20px rgba(101,96,206,0.28)' },
    Typography: { titleMarginBottom: '0.5em' },
  },
};
