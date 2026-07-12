/**
 * Единая точка сборки адаптеров портов по конфигурации. Реальные адаптеры: `Mailer`(smtp),
 * `Geocoder`(nominatim), `PaymentProvider`(yookassa), `ObjectStorage`(s3 — s3.cloud.ru/MinIO,
 * см. s3-object-storage.ts). Как и `buildMailer`/`buildGeocoder`/`buildPaymentProvider` ниже,
 * `buildStorage` бросает понятную ошибку, если выбран не-stub драйвер без нужных переменных —
 * в production это перехватывает `parseConfig` раньше (fail-fast), в dev/test ошибка всплывает
 * только когда порт реально используется (см. doc-комментарий config.ts §3 конвенций).
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
import { S3ObjectStorage } from './s3-object-storage.js';
import { type Mailer, ConsoleMailer, SmtpMailer } from './mailer.js';
import { type Geocoder, FixtureGeocoder, NominatimGeocoder } from './geocoder.js';
import { type PaymentProvider, FakePaymentProvider } from './payment-provider.js';
import { YookassaPaymentProvider } from './yookassa-payment-provider.js';
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

/** Ф8: реальный адаптер ЮKassa (см. yookassa-payment-provider.ts) — сеть, не поднимается в
 *  unit-гейте (только `PAYMENTS=stub`/`FakePaymentProvider` участвует в тестах, см. §2 конвенций
 *  реализации и doc-комментарий YookassaPaymentProvider). */
function buildPaymentProvider(config: Config): PaymentProvider {
  if (config.payments.driver === 'stub') return new FakePaymentProvider();
  if (config.payments.driver === 'yookassa') {
    const { shopId, secretKey } = config.payments;
    if (!shopId || !secretKey) {
      throw new Error(
        'PAYMENTS=yookassa: не заданы YOOKASSA_SHOP_ID/YOOKASSA_SECRET_KEY (в production это ловит parseConfig раньше, см. config.ts)',
      );
    }
    return new YookassaPaymentProvider({ shopId, secretKey, returnUrl: `${config.appUrl}/app/podpiska` });
  }
  throw new Error(`PAYMENTS=${config.payments.driver}: неизвестный драйвер`);
}

/** Дефолт региона для S3-совместимых провайдеров без AWS-региона (s3.cloud.ru/MinIO не требуют
 *  конкретного региона для маршрутизации — значение участвует только в SigV4-подписи). */
const DEFAULT_S3_REGION = 'us-east-1';

function buildStorage(config: Config): ObjectStorage {
  if (config.storage.driver === 'stub') return new MemoryObjectStorage();
  if (config.storage.driver === 's3') {
    const { endpoint, region, bucket, accessKeyId, secretAccessKey } = config.storage;
    if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'STORAGE=s3: не заданы S3_ENDPOINT/S3_BUCKET/S3_ACCESS_KEY_ID/S3_SECRET_ACCESS_KEY (в production это ловит parseConfig раньше, см. config.ts)',
      );
    }
    return new S3ObjectStorage({
      endpoint,
      region: region ?? DEFAULT_S3_REGION,
      bucket,
      accessKeyId,
      secretAccessKey,
    });
  }
  throw new Error(`STORAGE=${config.storage.driver}: неизвестный драйвер`);
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
  // llm/embeddings: базовые порты — ВСЕГДА стабы (см. doc-комментарий выше). Реальные адаптеры
  // подключает вызывающий код через @stassist/llm, а не эта функция.
  return {
    storage: buildStorage(config),
    mailer: buildMailer(config),
    geocoder: buildGeocoder(config),
    payments: buildPaymentProvider(config),
    llm: new StubLlmProvider(),
    embeddings: new StubEmbeddingProvider(),
  };
}
