[back to docs overview](../README.md#documentation)

# Development

This project uses a monorepo structure managed by Turborepo.

## Build Configuration

The project is organized with the following build outputs:

- **Frontend (Nuxt)**: `.output/` directory
- **Backend (AdonisJS)**: `build/` directory
- **Packages**: `dist/` directory

## Build Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run in development mode
pnpm dev
```

## Project Structure

```text
rachoon/
├── apps/
│   ├── backend/     # AdonisJS API server
│   └── frontend/    # Nuxt.js web application
├── packages/
│   ├── common/      # Shared code
│   └── typescript-config/
└── turbo.json       # Turborepo configuration
```

## Testing

rachoon uses a comprehensive testing setup:

**backend tests (japa)**
```bash
cd apps/backend
pnpm test
```

**test structure**
- unit tests for models and services
- integration tests for api endpoints
- database seeding for test data

**ci/cd pipeline**

all pull requests and pushes trigger automated checks:
- code quality (linting, formatting)
- test execution with postgres test database
- build verification
- docker image creation (main branch only)

see [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed testing guidelines.