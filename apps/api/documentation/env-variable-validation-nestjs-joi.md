# Environment Variable Validation for `apps/api` (NestJS + Joi)

## Summary
This document explains how to validate required environment variables at startup in `apps/api` using `@nestjs/config` and Joi.

## Dependencies To Install
Run these commands from `apps/api`:

```bash
npm install @nestjs/config joi
```

### Why these packages are needed
- `@nestjs/config`: loads environment variables and exposes them through dependency injection.
- `joi`: validates configuration shape and required values during app bootstrap.

## Environment Variables
Create `.env` with at least:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/vrtx
```

### Why these variables are needed
- `PORT`: decides which port the API listens on.
- `NODE_ENV`: standard runtime environment flag.
- `DATABASE_URL`: required by database setup (Drizzle and tooling).

## AppModule Configuration
In `src/app.module.ts`, add `ConfigModule.forRoot()` and register Joi validation.

Recommended validation schema:
- `PORT`: number, default `3000`
- `NODE_ENV`: one of `development`, `test`, `production` (default `development`)
- `DATABASE_URL`: required URI string

Example:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
  ],
})
export class AppModule {}
```

## How To Use Config Values
- Prefer `ConfigService` injection instead of direct `process.env` access in application code.
- Fail fast on missing required values by keeping them in the Joi schema.

## Test Plan
Verify configuration behavior with:
- App startup fails when `DATABASE_URL` is missing.
- App startup fails when `PORT` is not a valid port.
- App startup succeeds when required variables are valid.
