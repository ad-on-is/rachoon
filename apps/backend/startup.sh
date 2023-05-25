#!/bin/bash
npm ci --omit=dev
rm -r /root/.cache
rm -r /root/.npm
node ace -v
node ace migration:run --force
node ace db:seed
node server.js
