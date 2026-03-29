# Incremental UUID-Based Schema Rollout Checklist

## Global Decisions
- [ ] Use UUID primary keys for all tables, generated automatically by the database
- [ ] Use UUID foreign keys for all relationships
- [ ] Do not add Drizzle `relations(...)` in this phase
- [ ] Keep timestamps minimal
- [ ] Add uniqueness and explicit foreign-key delete rules where appropriate
- [ ] Skip unit and e2e testing for this phase

## Users
- [ ] Evolve the existing `users` table in place
- [ ] Keep UUID IDs
- [ ] Add user fields: `email`, password hash field, `role`, `is_confirmed`
- [ ] Keep the current `/users` route working
- [ ] Export the updated table from `src/database/schema.ts`
- [ ] Add or update module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Lodges
- [ ] Add `lodges` table
- [ ] Add fields: `name`, `country`, `keeper_id`, `slug`
- [ ] Add uniqueness on `name`
- [ ] Add uniqueness on `slug`
- [ ] Add foreign key to users via `keeper_id`
- [ ] Add explicit foreign-key delete behavior
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Tours
- [ ] Add `tours` table
- [ ] Add fields: `name`, `slug`, `created_by`
- [ ] Add uniqueness on `name`
- [ ] Add uniqueness on `slug`
- [ ] Add foreign key to users via `created_by`
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Stages
- [ ] Add `stages` table
- [ ] Add fields: `from_lodge_id`, `to_lodge_id`, `duration`, `distance`
- [ ] Add foreign keys to lodges
- [ ] Add uniqueness on `(from_lodge_id, to_lodge_id)`
- [ ] Add explicit delete behavior for both lodge references
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Tour Stages
- [ ] Add `tour_stages` table
- [ ] Add fields: `tour_id`, `stage_id`, `order`
- [ ] Add foreign key to tours
- [ ] Add foreign key to stages
- [ ] Decide whether uniqueness rules for ordering are needed immediately
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Rooms
- [ ] Add `rooms` table
- [ ] Add fields: `name`, `price`, `lodge_id`
- [ ] Add foreign key to lodges
- [ ] Add uniqueness on `(lodge_id, name)`
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Beds
- [ ] Add `beds` table
- [ ] Add fields: `order`, `placement`, `room_id`
- [ ] Add foreign key to rooms
- [ ] Add uniqueness on `(room_id, order)`
- [ ] Validate allowed `placement` values in DTOs and schema typing
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Bookings
- [ ] Add `bookings` table
- [ ] Add fields: `comments`, `booker_id`
- [ ] Add foreign key to users via `booker_id`
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Bed Reservations
- [ ] Add `bed_reservations` table
- [ ] Add fields: `date`, `half_board`, `bed_id`, `booking_id`
- [ ] Add foreign key to beds
- [ ] Add foreign key to bookings
- [ ] Add uniqueness on `(bed_id, date)`
- [ ] Add explicit delete behavior for `booking_id`
- [ ] Export from `src/database/schema.ts`
- [ ] Add module, service, controller, and DTOs
- [ ] Generate migration
- [ ] Apply migration
- [ ] Run `npm run build`

## Final Follow-Up Phase
- [ ] Add unit tests
- [ ] Add e2e tests
- [ ] Revisit whether to add Drizzle `relations(...)`
- [ ] Revisit whether `lodges.location` should be added
