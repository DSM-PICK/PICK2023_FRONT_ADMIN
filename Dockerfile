FROM node:16-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY manifests ./

RUN yarn install --immutable

COPY packs ./

RUN yarn workspace @service/main build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/./ ./

USER nextjs

CMD yarn workspace @service/main start