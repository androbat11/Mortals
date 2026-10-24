# Validation: Fatality Page (Roadmap Phase 7)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm test` exits 0, including the new hook, component, and page tests.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0 (type-check and Vite build both pass).
- [ ] `npm run preview` serves the built output.

## Manual checks
- [ ] **Earlier phases:** the manual checks for Phases 2 to 6 are run in the same browser pass and ticked, and the roadmap statuses are updated.
- [ ] `npm run dev` starts, the page loads, and the console shows no errors or warnings.
- [ ] The page shows the fatality's name, the game it comes from, what it does, and the numbered tutorial steps, next to the animated fighter.
- [ ] The sample content reads as clearly-labelled sample data, with nothing invented about a real game.
- [ ] **Phone (~375px):** the scene is on top at a bounded height with the details below; dragging on the text scrolls the page; dragging on the scene still rotates the camera; no horizontal scroll.
- [ ] **Tablet (~768px) and desktop (~1280px):** the scene is beside the details in two columns filling the viewport; long details scroll inside their column; the layout never overlaps or overflows.
- [ ] Text is readable (contrast and size) against the dark background at every width.
- [ ] Rotating a device or resizing the window re-flows the layout and the canvas without a reload.
- [ ] Keyboard and screen reader: one `h1`, `h2` sections, the tutorial announced as an ordered list, and the scene has an accessible name that mentions the fatality.
- [ ] Under React `StrictMode` in dev there is one canvas and one animation playing; unmounting leaves no leftover loop or listeners.

## Structure and conventions
- [ ] The components are split atom, molecule, organism, template, and page, and each is short and does one thing.
- [ ] Components take props or slots and contain no logic; the lookup is in the `useFatality` hook.
- [ ] The data drives the scene: `SceneCanvas` gets its `animationId` and `label` from the entry, and no animation id is hard-coded in a component.
- [ ] Layout is mobile-first with media queries, no fixed widths, and CSS Modules, one file per component.
- [ ] `ScenePage` and the clipped `.scene-page` rule are gone.
- [ ] No module-level constants or mutable state, no classes, `any` is not used, and types are defined before the code that uses them.
- [ ] Every source file is under about 100 lines (tests exempt; check with `wc -l`).
- [ ] `web/src/three/` is unchanged and has no dependency on `web/src/data/`.
- [ ] Design decisions are explained in code comments.
- [ ] `README.md` describes the new components and the layout.

## Scope guard
- [ ] No list, routing, replay, pause, loading states, game filter, button inputs, or character information.
- [ ] No new dependencies in `web/package.json` and no CSS framework.
- [ ] Root `package.json` is unchanged, and no root `package-lock.json` is committed.
- [ ] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-7-fatality-page`, with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run on it, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 7 as done once the checks above pass.
- [ ] A fresh clone passes the automated checks above.
