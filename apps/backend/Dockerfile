FROM node:18 as builder
WORKDIR /app

COPY . /app
RUN cd /app
RUN npm install && npm run build


FROM zenika/alpine-chrome

LABEL maintainer="Adis Durakovic <adis.durakovic@gmail.com>"
USER root

RUN apk add --no-cache --update \
     nodejs npm graphicsmagick ghostscript

WORKDIR /app


COPY --from=builder /app/build /app/
COPY startup.sh /app/
RUN cd /app
ENTRYPOINT ["sh", "startup.sh"]
