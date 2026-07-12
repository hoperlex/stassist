// Единый источник правды по схеме БД для drizzle-kit generate (см. docs/architecture/
// 22-модель-данных.md). Новые таблицы следующих фаз добавляются сюда же по мере роста.
export * from './enums.js';
export * from './users.js';
export * from './audit-log.js';
export * from './refresh-tokens.js';
export * from './password-resets.js';
export * from './email-verifications.js';
export * from './consents.js';
export * from './birth-profiles.js';
export * from './calc-presets.js';
export * from './charts.js';
export * from './celebrities.js';
export * from './geocode-cache.js';
export * from './astro-calendar.js';
export * from './compat-pages.js';
export * from './page-cache.js';
export * from './chart-shares.js';

// Ф4: ИИ-конвейер, RAG-корпус, вики-skeleton (см. docs/architecture/22-модель-данных.md §3, §6).
export * from './wiki-articles.js';
export * from './interpretation-chunks.js';
export * from './ai-reports.js';
export * from './chat.js';
export * from './report-feedback.js';

// Ф5: гороскопы и программатика (см. docs/architecture/22-модель-данных.md §5).
export * from './horoscopes.js';
