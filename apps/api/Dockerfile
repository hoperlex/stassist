# Multi-stage, non-root. Собирается из корня монорепозитория:
#   docker build -f apps/api/Dockerfile -t stassist-api .
#
# ТРЕБУЕТ ДОКЕР — в среде сборки Ф0 не прогонялось (Docker недоступен), см. _report/build/
# f0-отчёт.md, раздел «требует ручного шага». Использует `pnpm deploy` — самодостаточный
# каталог с прод-зависимостями конкретного workspace-пакета (pnpm >=8), без лишних пакетов
# монорепозитория.

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @stassist/api build
RUN pnpm --filter @stassist/api deploy --prod /out/api

FROM node:22-alpine AS runtime
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=build --chown=app:app /out/api ./
USER app
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/index.js"]
