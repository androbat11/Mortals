# Plan: Polish (Roadmap Phase 12)

## 1. Branch and baseline
1. Create the branch `phase-12-polish` from `phase-11-game-filter` (earlier phases are not merged into `main` yet).
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` and note the bundle sizes: Three.js makes the build warn about one large chunk.

## 2. Loading states
1. Load the 3D scene lazily: the list page no longer downloads Three.js, and the fatality page shows a loading message until the scene code arrives. The lazy component is created by a factory in a hook (no module-level state).
2. Atom `LoadingIndicator`: a polite status message.
3. If the scene code cannot be loaded (offline, a failed download), show a short error message instead of a blank scene. This uses a function component, because the project allows no class components for an error boundary.

## 3. Document titles and metadata
1. Hook `useDocumentTitle(title)`: the list is "Mortals" and a fatality is "<name> - Mortals", so history and tabs make sense.
2. `index.html`: a description and a theme colour that matches the dark background.

## 4. Styling refinements
1. Gentle transitions on cards, buttons, and links, only for users who have not asked for reduced motion.
2. A consistent focus ring on every interactive element, and a check of colour contrast against the dark background.
3. Spacing and type tidy-ups found in the responsive review below.

## 5. Final responsive review
1. Build and take headless-Chrome screenshots of both screens (the list, a filtered list, and a fatality page) at about 375, 768, and 1280px, and look for overflow, overlap, cramped text, and clipped controls.
2. Fix what they show, and record what was checked and what was not.

## 6. Tests (Vitest, feature logic only)
1. Test `LoadingIndicator`, `useDocumentTitle`, and the load-error fallback.
2. Update the page tests for the lazy scene (the loading message shows first, then the scene), and test that the list page does not load the scene.
3. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 7. Documentation
1. Comment each design decision in the code. Update `README.md`.
2. Update `specs/roadmap.md` to mark Phase 12 as done only after the manual checks pass.

## 8. Verify and wrap up
1. Walk through `validation.md`. Commit on `phase-12-polish`, open a PR to `main`, run `/pr-review` and fix blocking findings, then run `/changelog` and commit it last.
