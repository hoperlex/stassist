/**
 * Общие пункты навигации сайта — единый источник для десктоп-шапки (SiteLayout), мобильного
 * меню (MobileNav) и подвала. Раньше массив NAV дублировался в SiteLayout и в захардкоженной
 * разметке главной; теперь ссылки берутся отсюда.
 */
export interface NavItem {
  href: string;
  label: string;
}

/** Основные разделы (шапка + мобильный Drawer). */
export const NAV: NavItem[] = [
  { href: '/natalnaya-karta', label: 'Натальная карта' },
  { href: '/matrica-sudby', label: 'Матрица судьбы' },
  { href: '/sovmestimost', label: 'Совместимость' },
  { href: '/goroskop', label: 'Гороскоп' },
  { href: '/lunnyj-kalendar', label: 'Лунный календарь' },
  { href: '/wiki', label: 'База знаний' },
];

/** Ссылки подвала (и нижний блок мобильного Drawer). */
export const FOOTER: NavItem[] = [
  { href: '/o-nas', label: 'О проекте' },
  { href: '/redakciya', label: 'Редакция' },
  { href: '/methodology', label: 'Методология расчётов' },
  { href: '/faq', label: 'Вопросы и ответы' },
  { href: '/wiki', label: 'База знаний' },
  { href: '/pravila-soobshchestva', label: 'Правила сообщества' },
];
