import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';

describe('pages/app (заготовка кабинета)', () => {
  it('рендерит начальное состояние счётчика', () => {
    const html = renderToStaticMarkup(<Page />);
    expect(html).toContain('Счётчик');
    expect(html).toContain('0');
  });
});
