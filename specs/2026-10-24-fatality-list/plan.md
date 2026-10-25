# Plan: Fatality List (Roadmap Phase 9)

## 1. Branch and baseline
1. Create the branch `phase-9-fatality-list` from `phase-8-playback-controls` (earlier phases are not merged into `main` yet).
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 2. Data helpers
1. Add `keys()` to `createRepository` (typed), so a registry can list its ids.
2. In `web/src/data/`, add `listFatalityIds()`, `isFatalityId(value)` (a type guard), and `createFatalities()` (every entry).

## 3. Routing without a dependency (`web/src/routing/`)
1. Define the `Route` type: the list, or one fatality by id.
2. Create `parseRoute(hash)`: `#/` and anything unknown mean the list, `#/fatality/<id>` means that fatality when the id exists.
3. Create `listHref()` and `fatalityHref(id)`, the only places that write a link.
4. Create the `useRoute()` hook (it follows `hashchange`) and `useScrollToTop(route)`.

## 4. Components
1. Atom `BackLink`: an anchor with an arrow, taking `href` and `children`.
2. Molecule `FatalityCard`: a whole card as one link to a fatality (game badge, name, description).
3. Organism `FatalityList`: a list of cards; takes the entries.
4. Template `ListPageTemplate`: a header slot and a responsive grid of children (one column on a phone, two from about 768px, three from about 1100px).
5. Page `FatalityListPage` (title, tagline, the list) and `AppRoutes` (chooses the page from the route); `App` renders `AppRoutes`.
6. Add a `BackLink` to the list at the top of the fatality page.

## 5. Tests (Vitest, feature logic only)
1. Test `keys()`, `listFatalityIds`, `isFatalityId`, `createFatalities`, `parseRoute` (list, fatality, unknown id, junk), and the href builders (round trip with `parseRoute`).
2. Test `useRoute` (initial hash, change on `hashchange`, cleanup).
3. Test `FatalityCard` (a link to the right href with the entry's text), `FatalityList` (one card per entry), `FatalityListPage`, and `AppRoutes` (list on the empty hash, the page on a fatality hash, the list on a bad id).
4. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 6. Documentation
1. Comment each design decision in the code. Update `README.md`.
2. Update `specs/roadmap.md` to mark Phase 9 as done only after the manual checks pass.

## 7. Verify and wrap up
1. Walk through `validation.md`. Commit on `phase-9-fatality-list`, open a PR to `main`, run `/pr-review` and fix blocking findings, then run `/changelog` and commit it last.
