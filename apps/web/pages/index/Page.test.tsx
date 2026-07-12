import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';

describe('pages/index (SSR-заглушка «Зодиакум — скоро»)', () => {
  it('рендерит непустой контент без клиентского JS', () => {
    const html = renderToStaticMarkup(<Page />);
    expect(html).toContain('Зодиакум');
    expect(html.length).toBeGreaterThan(50);
  });
});
