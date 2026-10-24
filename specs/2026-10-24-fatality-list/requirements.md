# Requirements: Fatality List (Roadmap Phase 9)

## Scope
A list screen that links to each fatality's page, and the navigation between the two.

In scope:
- A list page with one card per fatality, each a link to its page; a link back to the list on each fatality page.
- Navigation with no new dependency, using the URL hash.
- Responsive grid: one column on a phone, more columns on wider screens.
- Vitest tests for the new logic.

Out of scope:
- The game filter (Phase 11), loading states and the style pass (Phase 12), and new fatalities (Phase 10).
- A router library, server-side routes, search, and sorting.
- Button inputs and character information (parked).

## Decisions
These were chosen as the recommended defaults, because there was no time to ask.
- **Base:** `phase-8-playback-controls`, because earlier phases are not merged into `main` yet.
- **Routing:** the URL hash (`#/` for the list, `#/fatality/<id>`), written as a small typed module with a hook. `specs/tech-stack.md` lists no router and says the site can use any static host; hash routes work on any static host with no server rewrite rules, and need no dependency. A router library can replace it later without changing the pages, because pages only receive an id.
- **Typed routes:** `Route` is a union, `parseRoute` turns an unknown or invalid hash into the list (a bad link never breaks the app), and `isFatalityId` is a type guard over the registry, so a route can only carry a real id.
- **Links are real anchors:** `<a href="#/fatality/...">`, so the browser's back button, new-tab, copy-link, and keyboard all work.
- **One source for links:** `listHref` and `fatalityHref` are the only places that write a link.
- **Listing ids:** `createRepository` gains a typed `keys()`, so the ids come from the registry itself and cannot drift from it.
- **Cards:** the whole card is one link (a large touch target) with the game badge, name, and description.
- **Layout:** mobile-first CSS grid, one column by default, two from about 768px, three from about 1100px; no fixed widths.
- **Scroll:** a hook scrolls to the top on a route change, since hash links do not.
- **Branch:** `phase-9-fatality-list`.

## Context
- `specs/mission.md`: watching and learning first, no clutter, responsive by default.
- `specs/tech-stack.md`: React with TypeScript, mobile-first CSS with media queries, any static host.
- `specs/roadmap.md`: Phase 9 follows Phase 8 and precedes Phase 10 (more fatalities) and Phase 11 (the filter).
- `CLAUDE.md`: atomic design, UI and logic separate, type-first, factories and `createRepository`, no globals, small modules, tests for feature logic only.
- Repo state at start: one fatality page showing the sample entry with playback controls; `App` renders it directly.

## Future notes
- Phase 11 adds the game filter on this page.
- Phase 12 adds the title per page, loading states, and the style pass.
- If the project outgrows hash routing, swap it for a router library; only `AppRoutes` and `useRoute` change.
