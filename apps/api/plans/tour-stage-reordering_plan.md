# Tour Stage Reordering Plan

## Summary
Keep the database unique constraint on `(tour_id, order)` and support reordering through a dedicated reorder operation rather than one-by-one order edits. The reorder flow should update the full sequence for a single tour inside one database transaction so swaps like `A, B, C, D` to `A, C, B, D` remain valid without temporarily violating uniqueness.

## Key Changes
- Keep `tour_stages.tour_id + order` unique at the database level.
- Add a dedicated reorder endpoint instead of relying on generic “update one row’s order” behavior.
- Public API:
  - `PATCH /tours/:tourId/stages/order`
  - request body should contain the full intended order for that tour, using ordered `tourStageId`s
- Request shape:
  - `tourStageIds: string[]`
- Service behavior:
  - validate that every submitted `tourStageId` exists
  - validate that every submitted `tourStageId` belongs to the `tourId` from the route
  - validate that the submitted list contains exactly the current set of stages for that tour, with no missing, extra, or duplicate IDs
  - perform the reorder inside one transaction
- Transaction strategy:
  - first move all current rows for that tour to temporary order values outside the normal range, for example `current_order + 1000`
  - then assign final order values `1..n` based on the submitted array order
- Keep existing create/list `tour_stages` behavior unchanged.

## Implementation Changes
- Add a DTO for the reorder endpoint, for example `ReorderTourStagesDto`, with:
  - `tourStageIds: string[]`
  - UUID validation for each item
  - non-empty array validation
- Add a new method on `TourStagesService`, for example `reorder(tourId, body)`.
- Use a database transaction for the full reorder sequence.
- Query current `tour_stages` rows for the given tour before updating.
- Compare the submitted IDs with the existing set:
  - reject if counts differ
  - reject if any ID is duplicated
  - reject if any ID belongs to another tour
- Apply temporary offset update for all rows in the target tour.
- Apply final sequential order values starting at `1`.
- Return the reordered rows sorted by `order`.
- Do not remove the unique constraint and do not make it deferrable for now; the temporary-offset transaction approach is simpler and explicit in this codebase.

## Test Plan
- Build check: `npm run build`
- When tests are added later, cover:
  - successful adjacent swap, such as `B` and `C`
  - successful full reorder of all stages
  - rejection when the payload omits an existing stage
  - rejection when the payload includes a stage from another tour
  - rejection when the payload contains duplicate IDs
  - rejection when the target tour has no matching set for the payload
  - preservation of unique `(tour_id, order)` after commit

## Assumptions
- Reordering is defined as replacing the full order of all stages for one tour, not editing one row independently.
- Order values should be normalized to contiguous integers starting at `1` after every reorder.
- The user will apply any future migration locally if new schema work is needed.
- This plan is intentionally for later; it does not need to be implemented before continuing the current schema rollout.
