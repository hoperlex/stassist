# Multi-stage, non-root. Собирается из корня монорепозитория:
#   docker build -f apps/worker/Dockerfile -t stassist-worker .
#
# ТРЕБУЕТ ДОКЕР — в среде сборки Ф0 не прогонялось (Docker недоступен), см. _report/build/
# f0-отчёт.md, раздел «требует ручного шага».

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @stassist/worker build
RUN pnpm --filter @stassist/worker deploy --prod /out/worker

FROM node:22-alpine AS runtime
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=build --chown=app:app /out/worker ./
USER app
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
