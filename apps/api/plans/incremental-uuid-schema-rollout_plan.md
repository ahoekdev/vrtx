# Incremental UUID-Based Schema Rollout

## Summary
Implement the database model in small, safe steps while keeping the current API working after every migration. Each step adds one entity at a time with its schema, Nest module, service, controller, DTOs, and migration before moving to the next entity.
This phase covers schema, modules, services, controllers, DTOs, and migrations only. Testing and Drizzle relation helpers are deferred.

## Public Schema / Interface Decisions
- Each table uses a UUID `id` column as its primary key, generated automatically by the database
- All foreign keys use UUID columns
- Use these names where applicable:
  - `lodges.keeper_id`
  - `tours.created_by`
  - `bookings.booker_id`
  - `tour_stages`
  - `bed_reservations`
- Target fields by table:
  - `users`: `email`, password hash field, `role`, `is_confirmed`
  - `lodges`: `name`, `country`, `keeper_id`, `slug`
  - `tours`: `name`, `slug`, `created_by`
  - `stages`: `from_lodge_id`, `to_lodge_id`, `duration`, `distance`
  - `rooms`: `name`, `price`, `lodge_id`
  - `beds`: `order`, `placement`, `room_id`
  - `bookings`: `comments`, `booker_id`
  - `bed_reservations`: `date`, `half_board`, `bed_id`, `booking_id`

## Rollout Sequence
1. **Users**
- Evolve the existing `users` table in place.
- Keep UUID IDs.
- Add the missing user fields gradually so the current `/users` route keeps working.
- Introduce password storage as a hash column.
- Add role and confirmation state with non-breaking defaults.

2. **Lodges**
- Add `lodges` after `users`.
- Use `keeper_id` as the user foreign key.
- Add `name`, `country`, and `slug`.
- Add uniqueness on `name` and `slug`.
- Add explicit foreign-key delete behavior.

3. **Tours**
- Add `tours` after `users`.
- Use `created_by` as the user foreign key.
- Add `name` and `slug`.
- Add uniqueness on `name` and `slug`.
- Add explicit foreign-key delete behavior.

4. **Stages**
- Add `stages` after `lodges`.
- Include `from_lodge_id`, `to_lodge_id`, `duration`, and `distance`.
- Add uniqueness on `(from_lodge_id, to_lodge_id)`.
- Add explicit delete behavior for both lodge references.

5. **Tour Stages**
- Add `tour_stages` after both `tours` and `stages`.
- Include `tour_id`, `stage_id`, and `order`.
- Keep it as its own module so stage linking can be migrated independently.
- Add uniqueness rules for ordering per tour if they are required in the first implementation.

6. **Rooms**
- Add `rooms` after `lodges`.
- Include `name`, `price`, and `lodge_id`.
- Add uniqueness on `(lodge_id, name)`.

7. **Beds**
- Add `beds` after `rooms`.
- Include `order`, `placement`, and `room_id`.
- Add uniqueness on `(room_id, order)`.
- Validate allowed `placement` values in DTOs and schema typing.

8. **Bookings**
- Add `bookings` after `users`.
- Use `booker_id` as the user foreign key.
- Include `comments`.
- Keep bookings lightweight, with scheduling details handled by reservations.

9. **Bed Reservations**
- Add `bed_reservations` last, after both `beds` and `bookings`.
- Include `date`, `half_board`, `bed_id`, and `booking_id`.
- Add uniqueness on `(bed_id, date)`.
- Add explicit delete behavior for `booking_id`.

## Per-Step Delivery Rules
- For every entity step:
  1. Add or update the Drizzle table schema.
  2. Export it from `src/database/schema.ts`.
  3. Add the Nest module, service, controller, and DTOs.
  4. Generate a new migration.
  5. Hand the migration to the user to apply locally.
  6. Run a build check before moving on.
- Do not combine multiple entities into one migration step.
- Do not add a foreign key before its parent table exists.
- Keep existing routes working while expanding `users`.
- Introduce new feature routes only after their table migration is complete.
- Any database migration command must be run by the user, not by the agent.

## Verification For This Phase
- After each step, run in `apps/api`:
  - `npm run build`
- Use build success and user-confirmed migration application as the acceptance check for each incremental step.

## Assumptions And Defaults
- UUIDs are canonical across the whole schema.
- Drizzle `relations(...)` are intentionally deferred.
- Timestamp columns should only be added where they are actually needed, not automatically added everywhere.
- `stages.duration` and `stages.distance` are part of the first version of the stages schema.
- `lodges.location` is not included in this plan; if you want it, it should be added explicitly before implementation starts so it can be placed in the lodge step.
