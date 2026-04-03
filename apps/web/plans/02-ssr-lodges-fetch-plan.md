# SSR Lodge Fetching Plan For Astro

## Summary
Update the `/lodges` Astro page to fetch lodge data from the Nest API during server-side rendering and render a simple list showing each lodge's `name` and `country`. Use Astro's standard SSR data-fetching pattern with `fetch()` in page frontmatter instead of Astro Actions, because the backend already exposes a dedicated `GET /lodges` endpoint and no extra Astro-owned server boundary is needed.

Update to plan direction: keep the extracted shared `Lodge` type and shared API base URL helper, as these improve reuse and keep page code focused on rendering and data-flow behavior.

Implementation constraint: break the work into small, isolated steps, and after each step the Astro app must remain buildable without type errors. After every step, pause so the code can be checked and reviewed before continuing.

## Key Changes
- Update `src/pages/lodges.astro` to perform a server-side `fetch()` to the API in frontmatter and render the returned lodge list below the existing page title.
- Add a web-app environment variable for the API base URL so the page does not hardcode the Nest server address.
- Define a lightweight shared TypeScript type in `src/types/Lodge.ts` for the lodge response shape used by the UI:
  - `id`
  - `name`
  - `country`
  - `keeperId`
  - `slug`
- Use a shared helper in `src/utils/getApiBaseUrl.ts` to read the configured API base URL from `import.meta.env`.
- Render a v1 lodge list that shows only `name` and `country` for each item.
- Handle failed API responses gracefully on the page.
  - Do not crash the render with an unhandled fetch error.
  - Show a simple fallback message when lodges cannot be loaded.
- Keep Astro Actions out of scope for this step.
  - No `src/actions` setup.
  - No Astro-side proxy or facade over the Nest endpoint.

## Interfaces and Configuration
- Add an environment variable for the Astro app such as `API_BASE_URL` pointing at the Nest server origin.
- Keep the current Nest API contract unchanged:
  - `GET /lodges` returns the list of lodges.
- Keep the lodge response type in a shared local file `src/types/Lodge.ts`.
- Keep API base URL access in a shared local helper `src/utils/getApiBaseUrl.ts`.
- The `/lodges` page remains SSR-backed and should fetch at request time through Astro page frontmatter.

## Implementation Checklist
- [ ] Add the API base URL configuration for the Astro app without changing page behavior yet.
- [ ] Add or update `src/types/Lodge.ts` with the lodge response type used by the page.
- [ ] Add or update `src/utils/getApiBaseUrl.ts` so API base URL access is centralized.
- [ ] Add server-side fetch logic in `src/pages/lodges.astro` that calls the Nest `/lodges` endpoint using the configured API base URL.
- [ ] Add safe response parsing and non-OK error handling so fetch failures do not crash the page render.
- [ ] Render the fetched lodges on the page as a simple list showing only `name` and `country`.
- [ ] Add a fallback empty or error state message when lodges cannot be loaded or when the API returns no lodges.
- [ ] Run the Astro build and confirm the app remains buildable without type errors after the completed changes.

## Test Plan
- Run the Astro web build and confirm the page compiles with the new SSR fetch logic.
- Run the Astro app against the Nest API and verify `/lodges` renders lodge `name` and `country` from live API data.
- Verify the page shows a sensible fallback state when the API is unreachable or returns a non-OK response.
- Confirm no Astro Actions were introduced and the page still uses the shared layout and header.

## Assumptions and Defaults
- Recommended approach: direct server-side `fetch()` in `src/pages/lodges.astro`.
- V1 display fields: `name` and `country` only.
- The API base URL will be provided through environment configuration rather than inferred from the incoming request.
- The existing Nest endpoint at `/lodges` is the single source of truth and does not need contract changes for this task.
