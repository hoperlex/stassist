/**
 * Единая точка сборки адаптеров портов по конфигурации. Ф2 подключает реальные адаптеры
 * `Mailer`(smtp)/`Geocoder`(nominatim) — `storage`/`payments` по-прежнему появятся в поздних
 * фазах и намеренно бросают понятную ошибку при попытке выбрать их не-stub драйвер раньше срока.
 *
 * `llm`/`embeddings`: этот пакет (`@stassist/shared`) НЕ содержит реальных LLM-адаптеров (нет
 * SDK-зависимостей здесь специально, см. §2 конвенций реализации) — `createPorts` всегда
 * возвращает стабы для них. Реальные адаптеры (Anthropic/OpenRouter/YandexGPT/GigaChat) живут в
 * `@stassist/llm` (Ф4); вызывающий код (apps/api, apps/worker) НАКЛАДЫВАЕТ их поверх базовых
 * портов ПОСЛЕ `createPorts`, когда `config.llm.driver`/`config.embeddings.driver !== 'stub'` —
 * тот же паттерн, что `CachedGeocoder` поверх `ports.geocoder` в apps/api/src/route-context.ts.
 */
import type { Config } from '../config.js';
import { type ObjectStorage, MemoryObjectStorage } from './object-storage.js';
import { type Mailer, ConsoleMailer, SmtpMailer } from './mailer.js';
import { type Geocoder, FixtureGeocoder, NominatimGeocoder } from './geocoder.js';
import { type PaymentProvider, FakePaymentProvider } from './payment-provider.js';
import { type LlmProvider, StubLlmProvider } from './llm-provider.js';
import { type EmbeddingProvider, StubEmbeddingProvider } from './embedding-provider.js';

export interface Ports {
  storage: ObjectStorage;
  mailer: Mailer;
  geocoder: Geocoder;
  payments: PaymentProvider;
  llm: LlmProvider;
  embeddings: EmbeddingProvider;
}

function buildMailer(config: Config): Mailer {
  if (config.mailer.driver === 'stub') return new ConsoleMailer();
  if (config.mailer.driver === 'smtp') {
    const { host, port, from, user, pass } = config.mailer.smtp;
    if (!host || !port || !from) {
      throw new Error(
        'MAILER=smtp: не заданы SMTP_HOST/SMTP_PORT/SMTP_FROM (в production это ловит parseConfig раньше, см. config.ts)',
      );
    }
    return new SmtpMailer({ host, port, from, user, pass });
  }
  throw new Error(`MAILER=${config.mailer.driver}: неизвестный драйвер`);
}

function buildGeocoder(config: Config): Geocoder {
  if (config.geocoder.driver === 'stub') return new FixtureGeocoder();
  if (config.geocoder.driver === 'nominatim') {
    const { nominatimUrl, nominatimUserAgent } = config.geocoder;
    if (!nominatimUrl || !nominatimUserAgent) {
      throw new Error(
        'GEOCODER=nominatim: не заданы NOMINATIM_URL/NOMINATIM_USER_AGENT (в production это ловит parseConfig раньше, см. config.ts)',
      );
    }
    return new NominatimGeocoder({ baseUrl: nominatimUrl, userAgent: nominatimUserAgent });
  }
  throw new Error(`GEOCODER=${config.geocoder.driver}: неизвестный драйвер`);
}

export function createPorts(config: Config): Ports {
  if (config.storage.driver !== 'stub') {
    throw new Error(
      `STORAGE=${config.storage.driver}: реальный адаптер появится в поздней фазе, сейчас доступен только stub`,
    );
  }
  if (config.payments.driver !== 'stub') {
    throw new Error(
      `PAYMENTS=${config.payments.driver}: реальный адаптер появится в поздней фазе, сейчас доступен только stub`,
    );
  }

  // llm/embeddings: базовые порты — ВСЕГДА стабы (см. doc-комментарий выше). Реальные адаптеры
  // подключает вызывающий код через @stassist/llm, а не эта функция.
  return {
    storage: new MemoryObjectStorage(),
    mailer: buildMailer(config),
    geocoder: buildGeocoder(config),
    payments: new FakePaymentProvider(),
    llm: new StubLlmProvider(),
    embeddings: new StubEmbeddingProvider(),
  };
}
