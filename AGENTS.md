# Repository Guidelines

## Project Structure & Module Organization

This repository is a small npm workspace with two apps under `apps/`. `apps/api` contains the NestJS backend; application code lives in `apps/api/src`, unit tests sit beside source files as `*.spec.ts`, and end-to-end tests live in `apps/api/test`. `apps/web` contains the Astro frontend; routes live in `apps/web/src/pages` and static assets live in `apps/web/public`. Keep API-specific planning or setup notes in `apps/api/documentation/`.

## Build, Test, and Development Commands

Install dependencies from the repo root with `npm install`. Use `npm run api:dev` to start the Nest API in watch mode and `npm run web:dev` to run the Astro dev server.

For backend work inside `apps/api`, use:

- `npm run build` to compile Nest to `dist/`
- `npm run lint` to run ESLint with auto-fixes
- `npm run test` for unit tests
- `npm run test:e2e` for API integration coverage
- `npm run test:cov` to generate coverage output

For frontend work inside `apps/web`, use:

- `npm run dev` for local development
- `npm run build` for the production build
- `npm run preview` to verify the built site locally

## Documentation

Use the Context7 MCP when something needs to be implemented in the NestJS or the Astro application.

## Coding Style & Naming Conventions

Write TypeScript across both apps. In `apps/api`, Prettier and ESLint are the enforced style tools; use the existing defaults: 2-space indentation, single quotes, and semicolons. Follow Nest naming patterns such as `app.controller.ts`, `app.service.ts`, and `*.module.ts`. Keep tests named `*.spec.ts` and place e2e specs under `apps/api/test`. In `apps/web`, follow Astro’s file-based routing and keep route files lowercase, for example `src/pages/index.astro`.

## Testing Guidelines

The API uses Jest for both unit and e2e tests. Add unit coverage for service and controller behavior when changing backend logic, and add or update `app.e2e-spec.ts` style tests when endpoints change. No frontend test runner is configured yet, so at minimum run `apps/web` builds before opening a PR.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, lowercase subjects such as `update root package json with app related scripts`. Keep commits focused and descriptive. PRs should explain the change, note affected workspace(s), link the relevant issue when available, and include screenshots or local verification steps for UI changes.

## Git Workflow Preferences

When checking out an existing remote branch locally, use this sequence:

1. `git fetch`
2. `git checkout <branch-name>`

## Configuration Tips

The API reads `PORT` already and planned database work documents `DATABASE_URL` in `apps/api/documentation/drizzle-orm-nestjs-setup.md`. Put local secrets in `apps/api/.env` and do not commit them.
