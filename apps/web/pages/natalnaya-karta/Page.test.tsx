import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';

describe('pages/natalnaya-karta', () => {
  it('рендерит форму и дисклеймер без JS (SSR)', () => {
    const html = renderToStaticMarkup(<Page />);
    expect(html).toContain('Натальная карта онлайн бесплатно');
    expect(html).toContain('Информационно-развлекательный характер');
    expect(html).toContain('Рассчитать карту');
    expect(html.length).toBeGreaterThan(200);
  });
});
