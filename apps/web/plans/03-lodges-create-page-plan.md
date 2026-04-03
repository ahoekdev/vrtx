# Lodges Create Flow Plan (`/lodges` + `/lodges/create`)

## Summary
Create a dedicated lodge creation page at `/lodges/create` using WebCoreUI form components, add a "Create new lodge" button on `/lodges`, add a "Cancel" button on `/lodges/create`, and after successful submit navigate to `/lodges` (no in-place refresh on create page). Standardize API validation errors first so the frontend can consume field errors without custom array-mapping logic.

## Key Changes
- `/lodges` page:
  - Keep lodge list rendering as-is.
  - Add a prominent button/link to `/lodges/create`.
- `/lodges/create` page:
  - Render lodge form with WebCoreUI components (`Input`, `Select`, `Button`).
  - Add a cancel button/link that navigates back to `/lodges`.
  - Handle form submission through Astro Actions.
- Astro Action for creation:
  - `createLodge` in `apps/web/src/actions/index.ts` with `accept: 'form'` and Zod validation.
  - Call Nest `POST /lodges` server-to-server.
  - Consume backend `fieldErrors` directly from a stable API error envelope (`code`, `message`, `fieldErrors`).
  - On success, redirect/navigate to `/lodges` (instead of reloading the current page).
- API validation contract:
  - Update Nest validation error output to return field-keyed errors instead of an array of `{ field, messages[] }`.
  - Target shape: `{ code: 'VALIDATION_ERROR', message: 'Validation failed', fieldErrors: { ... } }`.
- Types:
  - Any new type (e.g. `User`) goes in `apps/web/src/types`.

## Step-by-Step Checklist (Pause After Each Step)
- [x] Step 1: Baseline verification (`npm run build` in `apps/web`) before changes.
  - Review checkpoint: confirm clean baseline.
- [x] Step 2: Add/update shared types in `apps/web/src/types` (including `User` for keeper options).
  - Review checkpoint: confirm type placement and shape.
- [x] Step 3: Add `createLodge` Astro Action in `apps/web/src/actions/index.ts` with Zod schema (`name`, `country`, `keeperId`).
  - Review checkpoint: confirm validation contract.
- [ ] Step 4: Update API validation response shape to a stable envelope with `fieldErrors` object.
  - Review checkpoint: confirm backend response contract for invalid payloads.
- [ ] Step 5: Implement action handler API call (`POST /lodges`) and consume `fieldErrors` directly (no array mapping helper).
  - Review checkpoint: confirm failure handling behavior remains clear and minimal.
- [ ] Step 6: Create `apps/web/src/pages/lodges/create.astro` with:
  - user options fetch (`GET /users`)
  - form wired to `actions.createLodge`
  - field/global error rendering from action result
  - Review checkpoint: confirm end-to-end form wiring.
- [ ] Step 7: Build create form UI with WebCoreUI:
  - name input
  - country select (AT, CH, DE, FR, IT, LI, SI)
  - keeper select (from users)
  - submit button
  - Review checkpoint: confirm labels, names, and required state.
- [ ] Step 8: Add cancel button on `/lodges/create` linking to `/lodges`.
  - Review checkpoint: confirm navigation works.
- [ ] Step 9: Update `/lodges` page to include "Create new lodge" button/link to `/lodges/create`.
  - Review checkpoint: confirm placement and styling.
- [ ] Step 10: Implement success navigation after create (redirect to `/lodges`, no create-page refresh UX).
  - Review checkpoint: confirm successful create lands on lodges list.
- [ ] Step 11: Final verification (`npm run build` in `apps/web`) + manual scenarios:
  - invalid form input
  - successful create redirects to `/lodges`
  - cancel returns to `/lodges`
  - API unavailable behavior
  - Review checkpoint: final sign-off.

## Test Plan
- Build passes in `apps/web`.
- `/lodges` shows list and working "Create new lodge" link.
- `/lodges/create` shows form, validates inputs, and shows clear errors.
- Cancel always navigates back to `/lodges`.
- Successful submission navigates to `/lodges` and shows the new lodge in the list.

## Assumptions/Defaults
- Use Astro Actions as the form submission boundary.
- Success behavior is navigation to `/lodges` (not in-page success/refresh on create page).
- Existing Nest endpoints (`GET /users`, `POST /lodges`, `GET /lodges`) remain unchanged, but validation error payload shape is standardized for frontend use.
