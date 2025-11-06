# Multi-architecture Dockerfile for Rachoon
# Supports both AMD64 and ARM64 (Apple Silicon)

FROM --platform=$BUILDPLATFORM node:23-alpine AS base

# Set platform-specific variables
ARG TARGETOS
ARG TARGETARCH

USER root

# Install system dependencies with cross-platform compatibility
# Using specific versions for better ARM compatibility
RUN apk add --no-cache --update \
    graphicsmagick=1.3.40-r1 \
    ghostscript=10.04.1-r0 \
    caddy=2.8.4-r1 \
    dcron=0.3-r0 \
    libc6-compat

# Install pnpm (single installation, version pinned)
RUN npm install -g pnpm@latest

WORKDIR /app
COPY ./Caddyfile .
COPY ./entrypoint.sh .

RUN mkdir -p /app/frontend
RUN mkdir -p /app/backend/apps/backend

# Copy built frontend and backend files
COPY ./apps/frontend/.output /app/frontend

COPY ./apps/backend/build /app/backend/apps/backend
COPY ./apps/backend/resources /app/backend/apps/backend
COPY ./packages /app/backend/packages
COPY ./package.json /app/backend/
COPY ./pnpm-workspace.yaml /app/backend/

# Install production dependencies
WORKDIR /app/backend/apps/backend
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

WORKDIR /app

ENTRYPOINT ["./entrypoint.sh"]