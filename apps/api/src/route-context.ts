/**
 * Общий контекст для Ф2-роутов: конфиг + БД (лениво) + порты (Mailer/Geocoder, с кэшем поверх
 * Geocoder при наличии БД, см. geocoding/cached-geocoder.ts). Роуты, которым нужна БД, но её нет
 * (degraded-режим, см. §3 конвенций), отвечают 503 — а не падают с 500.
 */
import type { FastifyReply } from 'fastify';
import { createPorts, type Config, type Ports } from '@stassist/shared';
import { createLlmProviderChain, createEmbeddingProvider } from '@stassist/llm';
import type { Db } from '@stassist/db';
import { getDb } from './db.js';
import { CachedGeocoder } from './geocoding/cached-geocoder.js';

let cachedPorts: Ports | undefined;
let cachedPortsFor: Config | undefined;

/** Порты пересобираются только при первом обращении конкретного config-объекта (обычно 1 раз). */
export function getPorts(config: Config, db: Db | undefined): Ports {
  if (cachedPortsFor === config && cachedPorts) return cachedPorts;
  const ports = createPorts(config);
  if (db) {
    ports.geocoder = new CachedGeocoder(db, ports.geocoder, config.geocoder.driver);
  }
  // Ф4: createPorts() всегда даёт стабы для llm/embeddings (см. doc-комментарий в
  // packages/shared/src/ports/factory.ts) — реальные адаптеры (@stassist/llm) накладываем здесь,
  // если соответствующий провайдер настроен через env (тот же паттерн, что CachedGeocoder выше).
  if (config.llm.driver !== 'stub') {
    ports.llm = createLlmProviderChain(config);
  }
  if (config.embeddings.driver !== 'stub') {
    ports.embeddings = createEmbeddingProvider(config);
  }
  cachedPorts = ports;
  cachedPortsFor = config;
  return ports;
}

/** Возвращает Db или сама отвечает 503 и возвращает undefined (вызывающий обязан `return`). */
export function requireDbOr503(config: Config, reply: FastifyReply, requestId: string): Db | undefined {
  const db = getDb(config);
  if (!db) {
    void reply
      .status(503)
      .send({ error: { message: 'БД не сконфигурирована (degraded-режим)', requestId } });
    return undefined;
  }
  return db;
}
