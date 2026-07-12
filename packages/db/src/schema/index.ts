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

// Ф6: PDF-заказы, камни, уведомления (см. docs/architecture/22-модель-данных.md §3, §6, §7б).
export * from './stones.js';
export * from './orders.js';
export * from './notifications.js';

// Ф7: вики-версии + коммьюнити (см. docs/architecture/22-модель-данных.md §7, docs/roadmap/
// prompts/f7-вики-и-коммьюнити.md).
export * from './wiki-article-revisions.js';
export * from './posts.js';
export * from './comments.js';
export * from './reactions.js';
export * from './friendships.js';
export * from './reports-ugc.js';
export * from './reputation.js';

// Ф9: соцраздел «Созвездие» / «Небо дня» (см. docs/strategy/11-соцраздел-созвездие.md).
export * from './sky-days.js';
export * from './sky-checkins.js';
export * from './sky-streaks.js';

// Ф8: биллинг, эксперименты/пейвол, квиз-онбординг, email-отписки (см. docs/architecture/
// 22-модель-данных.md §4, §7б, docs/roadmap/prompts/f8-монетизация-и-запуск.md).
export * from './plans.js';
export * from './subscriptions.js';
export * from './payments.js';
export * from './webhook-events.js';
export * from './promo-codes.js';
export * from './experiments.js';
export * from './experiment-events.js';
export * from './quiz-answers.js';
export * from './email-optouts.js';
