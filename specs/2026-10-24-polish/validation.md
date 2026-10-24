# Validation: Polish (Roadmap Phase 12)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new loading, title, and lazy-scene tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0, and Three.js is in its own chunk loaded by the fatality page (the main chunk is under 250 kB; the size warning limit is raised to 700 kB with a comment saying why).
- [x] `npm run preview` serves the built output.

## Manual checks
Checked so far with headless Chrome screenshots at 375, 768, and 1280px of the list (all games and a filtered game) and of fatality pages. They showed the filter links wrapping on a phone, the card grid going from one to three columns, and the back link crowding the badge, which is fixed. Not checked yet: the loading message and the load-error message in a real browser, the page titles, reduced motion, and contrast with a tool.

- [ ] **Earlier phases:** the manual checks for Phases 2 to 11 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] The list page loads without downloading the 3D code; the fatality page shows a loading message and then the scene, and the scene still works (animation, orbit, playback buttons).
- [ ] With the network blocked for the scene chunk, the fatality page shows an error message instead of a blank scene, and the text still reads.
- [ ] Each page has a meaningful title in the tab and in the history.
- [ ] Hover and focus states look consistent; with reduced motion on, nothing animates; contrast is readable on the dark background.
- [x] Screenshots reviewed at 375, 768, and 1280px for the list, a filtered list, and a fatality page: no overflow, overlap, cramped text, or clipped controls.

## Structure and conventions
- [x] No class component was added for error handling, and `LazySceneCanvas` is the only module-level value added (documented as a deliberate exception).
- [x] Components contain no logic; titles and the lazy scene are in hooks.
- [x] Every source file is under about 100 lines (tests exempt); `any` is not used.
- [x] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [x] No redesign, favicon, theme switch, new fatalities, or deployment.
- [x] No new dependencies. Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-12-polish` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 12 as done once the checks pass.
