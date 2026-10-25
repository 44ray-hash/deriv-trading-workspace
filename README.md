# MONEY MAKER AI TRADING BOT

This monorepo contains the working foundation for the Money Maker AI Trading Bot platform. It is structured as a production-minded trading workspace with:

- a responsive React dashboard
- an Express API for authentication, market access, trading, and analytics
- a Deriv integration adapter
- a shared package for domain types and utilities
- background worker services for signal generation and automation logic
- Prisma schema for database modeling
- Docker Compose for Postgres and Redis local infrastructure

## Completed foundation

- Monorepo structure
- Responsive trading dashboard shell
- API routing skeleton with auth, analytics, signals, trading, and admin endpoints
- Deriv integration adapter scaffolding
- Risk and strategy worker modules
- Database schema for users, accounts, signals, strategies, trades, notifications, and audit logs
- Docker configuration for local Postgres and Redis

## Phase status

Completed:
- project structure
- design system and dashboard shell
- authentication and API skeleton
- Deriv integration interface
- trading signal models
- strategy and risk worker foundation
- database schema
- local infrastructure

In progress / next:
- real market-data subscription logic
- strategy builder management APIs
- authenticated Deriv account connection workflow
- Telegram bot integration
- Android app shell
- security hardening and automated tests

Blocked until configured:
- live Deriv credentials
- production deployment environment
- Telegram bot token
- actual cloud hosting and secrets management

## Quick start

1. Copy `.env.example` to `.env`
2. Update credentials and database URL
3. Install dependencies:

```bash
npm install
```

4. Start the local database containers:

```bash
docker-compose up -d
```

5. Generate Prisma client:

```bash
npm run db:generate
```

6. Start the workspace:

```bash
npm run dev
```

## Main packages

- `apps/web`: React + Vite dashboard
- `apps/api`: Express API
- `services/workers`: automation and signal processing
- `packages/shared`: shared contract types
- `prisma`: Prisma schema and DB model definitions

## Important notes

- Never store secrets in the repo.
- Deriv passwords must never be stored or requested from the frontend.
- Real-money execution is disabled by default and must only be enabled after risk controls are validated.
- Demo and live results must remain clearly separated and tested before deployment.
