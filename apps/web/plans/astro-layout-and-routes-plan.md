# Astro Layout, Header, and Route Scaffolding Plan

## Summary
Create a shared Astro layout and a reusable site header component, then move the existing homepage onto that layout and add two new empty routes at `/lodges` and `/tours` that also use it. The implementation should follow Astro's documented pattern of putting shared page-shell components in `src/layouts`, shared UI in `src/components`, and rendering page content through a `<slot />`.

## Key Changes
- Add `src/layouts/BaseLayout.astro` as the shared page shell.
  - Keep the document structure there: `<html>`, `<head>`, `<body>`, favicon links, viewport meta, and `Astro.generator`.
  - Accept a `title` prop so each page can set its own document title.
  - Render `<SiteHeader />` directly inside the layout.
  - Expose a `<slot />` for page-specific content.
- Add `src/components/SiteHeader.astro` for shared site navigation.
  - Include links for `/`, `/lodges`, and `/tours`.
  - Keep it simple and static for now; no client-side behavior.
- Update `src/pages/index.astro` to stop owning the full HTML shell.
  - Import `BaseLayout.astro`.
  - Wrap the homepage content in the layout and pass a page title.
- Add `src/pages/lodges.astro` and `src/pages/tours.astro`.
  - Both pages should import and reuse `BaseLayout.astro`.
  - Keep page bodies intentionally minimal or empty while still producing valid routes and titles.

## Interfaces and Conventions
- `BaseLayout.astro` public interface:
  - `title: string`
- `SiteHeader.astro` has no props in this first version.
- Directory conventions:
  - Shared layout in `src/layouts`
  - Shared header in `src/components`
  - File-based routes in `src/pages`

## Test Plan
- Run `npm run build` in `apps/web` to confirm Astro recognizes the new layout, component, and routes.
- Verify generated routes include `/`, `/lodges`, and `/tours`.
- Manually confirm the shared header appears on all three pages and its links resolve correctly.
- Confirm each page sets the expected document title via the shared layout.

## Assumptions and Defaults
- Default plan file path: `apps/web/plans/astro-layout-and-routes-plan.md`.
- The new layout will be named `BaseLayout.astro`.
- The shared header will be named `SiteHeader.astro`.
- "Empty at first" means no meaningful page-specific content beyond what is needed to keep the route valid and reusable through the shared layout.
