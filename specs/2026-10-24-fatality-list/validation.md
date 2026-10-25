# Validation: Fatality List (Roadmap Phase 9)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new data, routing, hook, and component tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0.
- [x] `npm run preview` serves the built output.

## Manual checks
Checked so far with a headless Chrome screenshot of the list at 1280px. Not checked yet: navigation by clicking, the other widths, a copied URL, and keyboard.

- [ ] **Earlier phases:** the manual checks for Phases 2 to 8 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] The app opens on the list; each card opens its fatality's page; the back link and the browser's back button return to the list.
- [ ] A copied fatality URL opens that fatality directly, and an unknown hash shows the list.
- [ ] The list is a grid: one column at 375px, two at 768px, three at 1280px, with no horizontal scroll and no overlap.
- [ ] Cards are large, easy to tap, readable, and have a visible keyboard focus.
- [ ] Moving between pages scrolls to the top and does not leave a stale canvas or running animation behind.

## Structure and conventions
- [x] `Route` and the href builders are defined before the code that uses them; links are written in one place.
- [x] Components contain no logic; routing and scrolling are in hooks.
- [x] No router library; no new dependencies. Layout is mobile-first with media queries.
- [x] Every source file is under about 100 lines (tests exempt); no classes; `any` is not used; no module-level state.
- [x] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [x] No filter, loading states, new fatalities, button inputs, or character information.
- [ ] Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-9-fatality-list` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 9 as done once the checks pass.
