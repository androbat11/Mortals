# Validation: Polish (Roadmap Phase 12)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm test` exits 0, including the new loading, title, and lazy-scene tests.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0, and the build no longer warns about one large chunk (Three.js is in its own chunk loaded by the fatality page).
- [ ] `npm run preview` serves the built output.

## Manual checks
- [ ] **Earlier phases:** the manual checks for Phases 2 to 11 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] The list page loads without downloading the 3D code; the fatality page shows a loading message and then the scene, and the scene still works (animation, orbit, playback buttons).
- [ ] With the network blocked for the scene chunk, the fatality page shows an error message instead of a blank scene, and the text still reads.
- [ ] Each page has a meaningful title in the tab and in the history.
- [ ] Hover and focus states look consistent; with reduced motion on, nothing animates; contrast is readable on the dark background.
- [ ] Screenshots reviewed at 375, 768, and 1280px for the list, a filtered list, and a fatality page: no overflow, overlap, cramped text, or clipped controls.

## Structure and conventions
- [ ] No class component was added for error handling; the lazy component comes from a factory with no module-level state.
- [ ] Components contain no logic; titles and the lazy scene are in hooks.
- [ ] Every source file is under about 100 lines (tests exempt); `any` is not used.
- [ ] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [ ] No redesign, favicon, theme switch, new fatalities, or deployment.
- [ ] No new dependencies. Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [ ] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-12-polish` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 12 as done once the checks pass.
