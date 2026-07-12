-- Расширения PostgreSQL, нужные порталу с самого начала (см. docs/architecture/
-- 21-техническая-архитектура.md §7 и docs/roadmap/prompts/f0-инфраструктура.md):
--   pgcrypto — gen_random_uuid() и криптографические функции (хэши токенов и т.п.);
--   vector   — pgvector, HNSW-индекс для RAG по interpretation_chunks (используется с Ф4);
--   pg_trgm  — триграммный полнотекстовый поиск (используется начиная с поздних фаз).
--
-- ВАЖНО: применение этой миграции требует Postgres с установленным расширением pgvector
-- (например, образ `pgvector/pgvector:pg15`, см. docker-compose.yml). Обычный `postgres:15`
-- без pgvector упадёт на `CREATE EXTENSION vector`.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
