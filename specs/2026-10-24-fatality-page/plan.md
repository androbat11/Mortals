# Plan: Fatality Page (Roadmap Phase 7)

## 1. Branch and baseline
1. Create the branch `phase-7-fatality-page` from `phase-6-fatality-data-model`, because Phase 6 (the data this page shows) is not merged into `main` yet; the PR targets `main` once Phase 6 is merged.
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 2. Data hook
1. Create `useFatality(id)` in `web/src/hooks/`, which looks the entry up with `createFatality` and keeps it stable between renders (`useMemo` on the id).

## 3. Atomic components (`web/src/components/`)
1. Atom `GameBadge`: a small label that shows the game a fatality comes from; takes `children`.
2. Molecule `FatalityHeader`: the name as the page's `h1` plus a `GameBadge`.
3. Molecule `TutorialSteps`: a titled, ordered list of the tutorial steps, labelled for assistive technology.
4. Organism `FatalityDetails`: the header, a "What it does" section with the description, and the `TutorialSteps`; it takes a `Fatality`.
5. Template `FatalityPageTemplate`: a `main` with three slots, `scene`, `controls` (added in Phase 8), and `details`, and all the responsive layout; it knows nothing about fatalities.
6. Each component has its own CSS Module, written mobile-first.

## 4. Page and wiring
1. Create the page `FatalityPage` (`fatalityId` prop): it looks the entry up with `useFatality` and fills the template with a `SceneCanvas` (its `animationId` and its accessible `label` come from the entry) and the `FatalityDetails`.
2. Make `App` render `FatalityPage` with the sample fatality's id, and delete `ScenePage`.
3. Update `index.css`: remove the full-viewport, clipped `.scene-page`; let the page scroll; set the base colours and font in CSS variables.

## 5. Responsive layout (mobile-first, with media queries)
1. Phone (default): a stacked layout. The scene sits on top with a bounded height (about 55% of the viewport, with a minimum), then the details below, and the page scrolls normally, so a finger on the text can always scroll.
2. Wide screens (from about 960px; changed from 768px in the PR #8 review, because the narrower split made the title and badge wrap): two columns, the scene beside the details, filling the viewport height, with the details scrolling inside their column if they are long.
3. No fixed widths and no horizontal scroll at 375, 768, and 1280px.

## 6. Tests (Vitest, feature logic only)
1. Test `useFatality`: it returns the entry for the id and the same object across re-renders.
2. Test `TutorialSteps`: every step is rendered, in order, in an ordered list with its heading.
3. Test `FatalityDetails`: the name (as a level-1 heading), the game, the description, and every tutorial step come from the entry.
4. Test `FatalityPage` with the mocked renderer: it shows the entry's data next to a canvas whose accessible name mentions the entry, and the scene is built for the entry's animation id.
5. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 7. Documentation
1. Comment each design decision in the code (why, not what).
2. Update `README.md` for the new components and the layout.
3. Update `specs/roadmap.md` to mark Phase 7 as done only after the manual checks in `validation.md` pass.

## 8. Verify and wrap up
1. Walk through every item in `validation.md`, including the manual checks at phone, tablet, and desktop widths.
2. Commit on `phase-7-fatality-page`, open a PR to `main`, run `/pr-review` on it and fix blocking findings, then run `/changelog` and commit the changelog last.
