FROM node:18 as builder
WORKDIR /app

COPY . /app
RUN cd /app
RUN npm install --force
RUN npm run generate:production


FROM socialengine/nginx-spa:latest
COPY --from=builder /app/.output/public /app
RUN chmod -R 777 /app