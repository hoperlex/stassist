/**
 * Единая точка сборки адаптеров портов по конфигурации. Пока для всех портов есть только
 * стаб-реализации (реальные адаптеры появятся в соответствующих поздних фазах) — фабрика уже
 * подготовлена к переключению по env, чтобы код-потребитель (api/worker) не менялся.
 */
import type { Config } from '../config.js';
import { type ObjectStorage, MemoryObjectStorage } from './object-storage.js';
import { type Mailer, ConsoleMailer } from './mailer.js';
import { type Geocoder, FixtureGeocoder } from './geocoder.js';
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

export function createPorts(config: Config): Ports {
  if (config.storage.driver !== 'stub') {
    throw new Error(
      `STORAGE=${config.storage.driver}: реальный адаптер появится в поздней фазе, в Ф0 доступен только stub`,
    );
  }
  if (config.mailer.driver !== 'stub') {
    throw new Error(
      `MAILER=${config.mailer.driver}: реальный адаптер появится в поздней фазе, в Ф0 доступен только stub`,
    );
  }
  if (config.geocoder.driver !== 'stub') {
    throw new Error(
      `GEOCODER=${config.geocoder.driver}: реальный адаптер появится в поздней фазе, в Ф0 доступен только stub`,
    );
  }
  if (config.payments.driver !== 'stub') {
    throw new Error(
      `PAYMENTS=${config.payments.driver}: реальный адаптер появится в поздней фазе, в Ф0 доступен только stub`,
    );
  }
  if (config.llm.driver !== 'stub') {
    throw new Error(
      `LLM_PROVIDER=${config.llm.driver}: реальный адаптер появится в Ф4, в Ф0 доступен только stub`,
    );
  }
  if (config.embeddings.driver !== 'stub') {
    throw new Error(
      `EMBED_PROVIDER=${config.embeddings.driver}: реальный адаптер появится в Ф4, в Ф0 доступен только stub`,
    );
  }

  return {
    storage: new MemoryObjectStorage(),
    mailer: new ConsoleMailer(),
    geocoder: new FixtureGeocoder(),
    payments: new FakePaymentProvider(),
    llm: new StubLlmProvider(),
    embeddings: new StubEmbeddingProvider(),
  };
}
