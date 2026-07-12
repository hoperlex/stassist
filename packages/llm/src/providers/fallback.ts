/**
 * FallbackLlmProvider — цепочка провайдеров с ретраями и circuit breaker (см. f4-промт req.1:
 * «конфиг цепочки fallback через env; таймауты, ретраи с джиттером, circuit breaker»). Пробует
 * провайдеров по порядку; открытый breaker — пропускается без попытки (fail-fast).
 */
import type { LlmGenerateRequest, LlmGenerateResult, LlmProvider } from '@stassist/shared';
import { CircuitBreaker, type CircuitBreakerOptions } from './circuit-breaker.js';
import { withRetry, type RetryOptions } from './retry.js';

export interface FallbackLlmProviderOptions {
  retry?: RetryOptions;
  breaker?: CircuitBreakerOptions;
}

export class FallbackLlmProvider implements LlmProvider {
  readonly name: string;
  private readonly breakers: Map<string, CircuitBreaker>;

  constructor(
    private readonly chain: LlmProvider[],
    private readonly opts: FallbackLlmProviderOptions = {},
  ) {
    if (chain.length === 0) throw new Error('FallbackLlmProvider: цепочка провайдеров не может быть пустой');
    this.name = chain.map((p) => p.name).join('->');
    this.breakers = new Map(chain.map((p) => [p.name, new CircuitBreaker(opts.breaker)]));
  }

  async generate(req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    let lastErr: unknown = new Error('FallbackLlmProvider: пустая цепочка');
    for (const provider of this.chain) {
      const breaker = this.breakers.get(provider.name);
      if (breaker?.isOpen()) continue;
      try {
        const result = await withRetry(() => provider.generate(req), this.opts.retry);
        breaker?.recordSuccess();
        return result;
      } catch (err) {
        breaker?.recordFailure();
        lastErr = err;
      }
    }
    throw new Error(
      `FallbackLlmProvider: все провайдеры цепочки [${this.chain.map((p) => p.name).join(', ')}] недоступны: ${String(lastErr)}`,
    );
  }
}
