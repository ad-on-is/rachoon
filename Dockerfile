FROM node:23-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# adonisJS special handling
RUN mkdir -p /tmp/apps
RUN cp -r ./apps/backend/build /tmp/apps/backend/
RUN cp -r ./apps/backend/resources /tmp/apps/backend/
RUN cp -r ./packages /tmp/
RUN cp ./package.json /tmp/
RUN cp ./pnpm-workspace.yaml /tmp/
WORKDIR /tmp/
RUN pnpm install
WORKDIR /tmp/apps/backend
RUN pnpm install --prod --force



FROM node:24.22.1-alpine

USER root

RUN apk add --no-cache --update graphicsmagick ghostscript caddy dcron

WORKDIR /app
COPY ./Caddyfile .
COPY ./entrypoint.sh .
COPY --from=builder  /app/apps/frontend/.output ./frontend
COPY --from=builder  /tmp ./backend

WORKDIR /app

ENTRYPOINT ["./entrypoint.sh"]
