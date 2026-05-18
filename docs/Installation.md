[back to docs overview](../README.md#documentation)

# Installation

## Using docker compose

[Download example docker-compose.yml](../docker-compose.yaml)

```yaml
services:
  rachoon:
    image: ghcr.io/ad-on-is/rachoon
    container_name: rachoon
    environment:
      - APP_KEY=<some-app-key> # min 32 characters - used to encrypt and sign sensitive data
      - DB_CONNECTION=pg
      - GOTENBERG_URL=http://gotenberg:3000
      - PG_HOST=postgres16
      - PG_PORT=5432
      - PG_USER=<root-user>
      - PG_PASSWORD=<root-password>
      - PG_DB_NAME=rachoon
    ports:
      - 8080:8080

  gotenberg:
    image: gotenberg/gotenberg:8

  postgres16:
    container_name: postgres16
    image: postgres:16
    environment:
      - POSTGRES_USER=<root-user>
      - POSTGRES_PASSWORD=<root-password>
      - POSTGRES_DB=postgres
    volumes:
      - ./rachoon-data:/var/lib/postgresql/data
      - ./docker/init-db.sh:/docker-entrypoint-initdb.d/init-db.sh
```

## First steps

- Visit: <http://localhost:8080/signup>
- Create your account
- Start invoicing