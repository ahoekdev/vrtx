# Add Optimistic Lodge Deletion to the Admin Web UI in Reviewable Steps

## Summary
Implement lodge deletion in the admin web UI in small, reviewable increments. After each step, stop and let the user review the changes before moving on. Keep the page server-rendered in Astro for initial data loading, and introduce the client-side React list only when needed for optimistic deletion behavior.

## Step Plan
1. Add the admin lodges index page.
   - Create `/admin/lodges` as a server-rendered Astro page.
   - Load lodges with `getLodges()`.
   - Render a simple non-interactive admin list.
   - Add navigation links from the admin index and to the existing create page.
   - Stop for review.

2. Add the delete action plumbing.
   - Create `deleteLodge.action.ts`.
   - Call `DELETE /lodges/:id` and normalize success/error responses.
   - Export the action from the actions index.
   - Do not wire it into the UI yet.
   - Stop for review.

3. Replace the static admin list with a small client list component.
   - Pass the server-fetched lodges into a React island.
   - Render the same list shape plus one delete button per lodge.
   - Keep behavior non-optimistic at this stage.
   - Stop for review.

4. Add the basic delete interaction.
   - Require confirmation before delete.
   - Call the Astro Action from the client component.
   - Disable duplicate clicks while a lodge is pending.
   - Remove the row only after a successful API response.
   - Show clear inline error messages for `404`, `409`, and generic failures.
   - Stop for review.

5. Add optimistic deletion behavior.
   - Remove the lodge from local state immediately after confirmation.
   - Keep rollback state while the delete request is in flight.
   - Restore the lodge to its original position if the request fails.
   - Preserve the error message after rollback.
   - Stop for review.

6. Final polish and verification.
   - Clean up copy, pending states, and any small UX inconsistencies.
   - Run the `apps/web` build.
   - Summarize final behavior and any remaining gaps.
   - Stop for final review.

## Key Changes
- Admin UI:
  - New `/admin/lodges` page for lodge management.
  - Admin navigation updated to expose the lodges list.
- Actions:
  - New `deleteLodge` Astro Action for calling the API delete endpoint.
- Client interaction:
  - Dedicated admin lodges list component for confirmation, pending state, optimistic removal, rollback, and inline errors.

## Public API / Interface Changes
- New frontend route: `/admin/lodges`
- New Astro Action: `deleteLodge`
- New client component contract:
  - `lodges: Lodge[]`
  - delete input: `{ id: string }`
  - delete result: normalized status/message suitable for rollback handling

## Test Plan
- After step 1: verify `/admin/lodges` renders the current lodges list correctly.
- After step 2: review the action result shape and API error mapping.
- After step 3: verify the client-rendered list matches the server-rendered one.
- After step 4: verify confirmed deletes succeed and failures show correct messages.
- After step 5: verify optimistic removal and rollback behavior for failed deletes.
- After step 6: run the `apps/web` production build.

## Assumptions
- Work should pause after each step for manual review before the next step starts.
- Deletion remains admin-only.
- A small React island is acceptable because optimistic updates require client-side state.
- Native `confirm()` is sufficient unless the user asks for a custom confirmation UI later.
