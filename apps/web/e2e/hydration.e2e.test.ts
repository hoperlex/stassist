import { expect, test } from '@playwright/test';

test('главная «/» рендерится сервером (контент виден без ожидания JS)', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit' });
  await expect(page.getByText('Stassist', { exact: true })).toBeVisible();
});

test('«/app» гидрируется: клик по кнопке меняет счётчик на клиенте', async ({ page }) => {
  // networkidle гарантирует, что клиентский бандл (гидратация) уже загружен и выполнен —
  // без этого клик может прийтись на ещё не гидрированную (неинтерактивную) разметку сервера.
  await page.goto('/app', { waitUntil: 'networkidle' });
  const counter = page.getByTestId('hydration-counter');
  await expect(counter).toContainText('0');

  const button = page.getByRole('button', { name: 'Нажми меня' });
  await button.click();
  await expect(counter).toContainText('1');
  await button.click();
  await expect(counter).toContainText('2');
});
