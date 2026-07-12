/**
 * Полный кабинетный путь Ф2 (см. промт f2, «Верификация»): регистрация → подтверждение e-mail
 * → логин → согласие 152-ФЗ → создание профиля рождения (с автодополнением места) → натальная
 * карта сохранена и отображена. Требует РЕАЛЬНЫЙ api-процесс на API_PORT (по умолчанию 3001) с
 * DATABASE_URL (миграции + сид системных пресетов уже применены) — playwright.config.ts поднимает
 * только web; api нужно запустить отдельно перед `RUN_E2E=1 pnpm test:e2e` (см. отчёт фазы).
 *
 * MAILER=stub (ConsoleMailer) — письма читаем из `_work/tmp/mail/*.json` (тот же приём, что и в
 * apps/api/src/test-helpers/integration.ts, продублирован здесь т.к. e2e — отдельный процесс/
 * пакет). GEOCODER=stub (FixtureGeocoder) — «Москва» гарантированно есть в справочнике.
 *
 * ConsoleMailer пишет в `_work/tmp/mail` ОТНОСИТЕЛЬНО cwd api-процесса — предполагается, что api
 * запущен из `apps/api` (`pnpm --filter @stassist/api start` или `cd apps/api && node
 * dist/index.js`), поэтому файлы лежат в `apps/api/_work/tmp/mail`, а не в `_work/tmp/mail`
 * корня репозитория. Этот тестовый процесс сам выполняется с cwd=`apps/web` (Playwright), отсюда
 * путь `../api/_work/tmp/mail`.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const MAIL_DIR = path.join(process.cwd(), '..', 'api', '_work', 'tmp', 'mail');

// ConsoleMailer (packages/shared/src/ports/mailer.ts) заменяет всё, кроме a-z/0-9/@/. на '_' в
// имени файла — email из теста содержит дефисы, которые становятся '_'. Та же логика
// продублирована в apps/api/src/test-helpers/integration.ts (encodeSafe).
function sanitizedForFilename(email: string): string {
  return email.replace(/[^a-z0-9@.]/gi, '_');
}

async function readLastMailTokenFor(email: string): Promise<string> {
  const needle = sanitizedForFilename(email);
  const files = (await readdir(MAIL_DIR)).filter((f) => f.includes(needle));
  const latest = files.sort().at(-1);
  if (!latest) throw new Error(`Нет писем для ${email} в ${MAIL_DIR}`);
  const raw = await readFile(path.join(MAIL_DIR, latest), 'utf8');
  const mail = JSON.parse(raw) as { text?: string };
  const match = /token=([^&\s"]+)/.exec(mail.text ?? '');
  if (!match) throw new Error(`Не нашёл token= в письме ${latest}`);
  return decodeURIComponent(match[1]!);
}

test('регистрация → verify-email → логин → согласие → профиль с автодополнением → карта', async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = 'correct-horse-e2e-1';

  // 1. Регистрация
  await page.goto('/register', { waitUntil: 'networkidle' });
  await page.getByLabel('E-mail').fill(email);
  await page.getByLabel('Пароль', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText(/отправлено письмо/)).toBeVisible();

  // 2. Верификация e-mail (читаем токен из письма ConsoleMailer)
  const token = await readLastMailTokenFor(email);
  await page.goto(`/verify-email?token=${token}`, { waitUntil: 'networkidle' });
  await expect(page.getByText('E-mail подтверждён.')).toBeVisible();

  // 3. Логин
  await page.goto('/login', { waitUntil: 'networkidle' });
  await page.getByLabel('E-mail').fill(email);
  await page.getByLabel('Пароль').fill(password);
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.waitForURL('**/profiles', { waitUntil: 'networkidle' });
  await expect(page.getByText('У вас пока нет профилей рождения')).toBeVisible();

  // 4. Создание профиля → нет согласия → редирект на /consent
  // AntD <Button href="..."> рендерится как <a> (role=link, не role=button).
  await page.getByRole('link', { name: 'Создать первый профиль' }).click();
  await page.waitForURL('**/profiles/new', { waitUntil: 'networkidle' });
  // Явный сигнал готовности гидратации: AntD Form здесь — контролируемые поля (rc-field-form),
  // и на повторной (закешированной) навигации 'networkidle' наступает быстрее, чем реально
  // завершается гидратация/маунт — заполнение "вслепую" сразу после networkidle гонится с
  // React и теряется. Список пресетов появляется только ПОСЛЕ реального клиентского запроса
  // (GET /calc-presets в useEffect) — надёжный маркер «страница действительно интерактивна».
  await expect(page.getByText('Современная западная (по умолчанию)')).toBeVisible();
  await page.getByLabel('Название профиля').fill('Я');
  await page.getByLabel('Дата рождения').fill('1990-05-17');
  await page.getByLabel('Время рождения', { exact: true }).fill('14:30');
  await page.locator('#place-input').fill('Москва');
  await page.getByTitle('Москва, Россия').click();
  await page.getByRole('button', { name: 'Сохранить и рассчитать карту' }).click();
  await page.waitForURL('**/consent**', { waitUntil: 'networkidle' });

  // 5. Согласие 152-ФЗ — отдельный экран с чекбоксом
  // (заголовок И первая строка текста документа совпадают текстуально — уточняем role=heading)
  await expect(page.getByRole('heading', { name: 'Согласие на обработку персональных данных' })).toBeVisible();
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Согласиться и продолжить' }).click();
  await page.waitForURL('**/profiles/new', { waitUntil: 'networkidle' });
  await expect(page.getByText('Современная западная (по умолчанию)')).toBeVisible();

  // 6. Повторно заполняем форму (состояние сброшено полной навигацией) и создаём профиль
  await page.getByLabel('Название профиля').fill('Я');
  await page.getByLabel('Дата рождения').fill('1990-05-17');
  await page.getByLabel('Время рождения', { exact: true }).fill('14:30');
  await page.locator('#place-input').fill('Москва');
  await page.getByTitle('Москва, Россия').click();
  await page.getByRole('button', { name: 'Сохранить и рассчитать карту' }).click();

  // 7. Карта сохранена и отображена (natal, meta присутствует — конкретно: Солнце в таблице).
  await page.waitForURL(/\/profiles\/[0-9a-f-]+$/, { waitUntil: 'networkidle' });
  await expect(page.getByText('Натальная карта')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Солнце' })).toBeVisible();
});
