# Drizzle ORM Setup for `apps/api`

## Summary
This document describes how to add Drizzle ORM to the NestJS API in `apps/api` using PostgreSQL. The setup uses Nest's configuration system for environment variables, a dedicated database module for dependency injection, and `drizzle-kit` for schema migrations.

## Dependencies To Install
Run these commands from the repo root:

```bash
npm install --workspace=api drizzle-orm pg @nestjs/config joi
npm install --workspace=api -D drizzle-kit @types/pg
```

### Why these packages are needed
- `drizzle-orm`: the ORM itself, providing typed schema definitions and queries.
- `pg`: the PostgreSQL driver used by Node.js at runtime.
- `@nestjs/config`: integrates environment variables into NestJS through dependency injection.
- `joi`: validates required environment variables during startup.
- `drizzle-kit`: CLI tool for generating and applying database migrations.
- `@types/pg`: TypeScript typings for the PostgreSQL driver.

## Environment Variables
Create `apps/api/.env` with at least:

```env
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/vrtx
NODE_ENV=development
```

Optional split variables if preferred:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vrtx
DB_USER=postgres
DB_PASSWORD=postgres
```

### Why these variables are needed
- `DATABASE_URL`: used by the application and Drizzle tooling to connect to PostgreSQL.
- `PORT`: already used by the NestJS bootstrap to decide which port the API listens on.
- `NODE_ENV`: helps standardize environment-specific config behavior.

## NestJS Application Configuration

### 1. Add `ConfigModule`
Update the root module to load environment variables globally.

Recommended approach:
- Import `ConfigModule.forRoot()` in `AppModule`
- Set `isGlobal: true`
- Add Joi validation for `PORT`, `NODE_ENV`, and `DATABASE_URL`

Why:
- This keeps config centralized.
- It avoids direct `process.env` access throughout the codebase.
- Validation catches misconfiguration at startup instead of later at runtime.

### 2. Create a database module
Add a small infrastructure layer such as:
- `src/database/database.module.ts`
- `src/database/database.provider.ts`
- `src/database/schema.ts`

Why:
- Keeps database wiring separate from business logic.
- Makes the Drizzle client injectable through Nest's dependency injection system.
- Gives Drizzle and the migration tool one shared schema entrypoint.

### 3. Create a Drizzle provider
Inside the database provider:
- Read `DATABASE_URL` from `ConfigService`
- Create a PostgreSQL client or pool using `pg`
- Create a Drizzle instance from that connection
- Export it with a provider token such as `DRIZZLE_DB`

Why:
- This is how Drizzle becomes available to Nest services.
- A provider token keeps the integration explicit and easy to test.

### 4. Import the database module into `AppModule`
Why:
- Makes the shared database client available across the application.
- Keeps future feature modules simple.

## Drizzle Kit Configuration

Create `apps/api/drizzle.config.ts` with:
- `dialect: 'postgresql'`
- `schema: './src/database/schema.ts'`
- `out: './drizzle'`
- `dbCredentials.url = process.env.DATABASE_URL`

Why:
- `drizzle-kit` needs to know where the schema lives, where to write migrations, and how to connect to the database.

## Package Scripts
Add these scripts to `apps/api/package.json`:

```json
{
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate"
}
```

Why:
- `db:generate` creates migration files from schema changes.
- `db:migrate` applies migrations to the target database.
- Scripts keep the workflow consistent for everyone on the project.

## Schema Workflow
Define tables in `src/database/schema.ts` using Drizzle's PostgreSQL schema helpers.

Why:
- The schema file becomes the source of truth for both database structure and TypeScript types.
- Drizzle can generate migrations directly from these definitions.

## How To Use Drizzle In NestJS Code
- Inject the shared Drizzle provider into services.
- Keep controllers thin and delegate database access to services.
- Add feature-specific queries in the modules that own those features.

Why:
- This matches normal NestJS architecture.
- It keeps the codebase easier to test and maintain.

## Test Plan
Verify the setup with these checks:
- App startup fails when `DATABASE_URL` is missing
- App startup succeeds with a valid `.env`
- A basic database insert/select works against a test database
- Initial migration generates successfully
- Migration applies successfully

Why:
- Most setup problems happen in config, provider registration, or migration wiring rather than query syntax.

## Assumptions
- The database is PostgreSQL.
- The package manager is `npm`.
- Only `apps/api` needs Drizzle.
- `DATABASE_URL` is the canonical connection variable.
- Nest DI is used directly instead of a third-party Nest-specific Drizzle wrapper.
