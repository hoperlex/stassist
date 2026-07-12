# Multi-stage, non-root. Собирается из корня монорепозитория:
#   docker build -f apps/web/Dockerfile -t stassist-web .
#
# ТРЕБУЕТ ДОКЕР — в среде сборки Ф0 не прогонялось (Docker недоступен), см. _report/build/
# f0-отчёт.md, раздел «требует ручного шага».
#
# server/index.ts выполняется через tsx (не бандлится vite — см. комментарий в самом файле),
# поэтому tsx — обычная (не dev) зависимость apps/web, а не собирается tsc.

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @stassist/web build
RUN pnpm --filter @stassist/web deploy --prod /out/web

FROM node:22-alpine AS runtime
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=build --chown=app:app /out/web ./
USER app
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node_modules/.bin/tsx", "server/index.ts"]
