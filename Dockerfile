# Production Dockerfile for Next.js + better-sqlite3 (native module)
ARG BASE_IMAGE=node:20-slim

# ---- Builder: full toolchain so better-sqlite3 can compile ----
FROM ${BASE_IMAGE} AS builder

WORKDIR /app

# Install build deps for native modules (better-sqlite3 needs python + g++)
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install JS deps
COPY package*.json ./
RUN npm install

# Build the Next.js app
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build
RUN mkdir -p public

# ---- Runner: lean image ----
FROM ${BASE_IMAGE} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone server bundle (includes node_modules incl. compiled better-sqlite3)
COPY --from=builder --chown=nextjs:nodejs /app/.next-build/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next-build/static ./.next-build/static
COPY --from=builder /app/public ./public

# Create + own data dir (Railway volume will mount over this)
RUN mkdir -p /app/data-store && chown -R nextjs:nodejs /app/data-store

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]