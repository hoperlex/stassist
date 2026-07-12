import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';

describe('pages/kvadrat-pifagora', () => {
  it('рендерит форму и дисклеймер без JS (SSR)', () => {
    const html = renderToStaticMarkup(<Page />);
    expect(html).toContain('Квадрат Пифагора');
    expect(html).toContain('Информационно-развлекательный характер');
  });
});
