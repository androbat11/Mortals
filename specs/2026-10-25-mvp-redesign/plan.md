# Plan: MVP Redesign (Roadmap Phase 14)

## 1. Constitution and spec (done first)
1. Save the Netherflame design system as `specs/design/netherflame-design-system.md`.
2. Update `specs/mission.md`, `specs/roadmap.md`, `specs/tech-stack.md`, `CLAUDE.md`, and the `pr-review` skill to match the new design.

## 2. Foundation
1. Add `@fontsource/bebas-neue` and `@fontsource/space-grotesk`, imported once in `main.tsx`.
2. Put the design tokens (colours, fonts, spacing, the chamfer) in `web/src/index.css` as CSS variables, with the dark background gradient.
3. Build the shell: `SiteHeader` (brand, About / Fatalities / Brutalities navigation with the current page marked, search field that filters the move pages), `SiteFooter` (the fan-tribute disclaimer and credits), and a `SiteTemplate` that holds them around a page.
4. Replace the routes with `about` (home), `fatalities`, and `brutalities`; the old list and fatality pages are removed.

## 3. Data model (types first)
1. `InputStep` (direction, button, or label), `Range` (close, mid, far, sweep), `Fighter`, and `Move` (kind fatality or brutality, fighter id, game label, range or class, description, trigger for brutalities, input steps, an animation id, and an `unverified` flag).
2. Fighters and moves as factories and registries (`createRepository`), transcribed from the design: five fighters with fatalities (Scorpion, Sub-Zero, Liu Kang, Johnny Cage, Kitana) and the fighters with brutalities (Scorpion, Sub-Zero, Johnny Cage, Raiden), with the roster counts shown on the About page. Every move is marked unverified.
3. Pure helpers: moves of a fighter, a text search across name, description, fighter, and input, a filter by game and by range, and the roster counts.

## 4. Components (atomic design)
1. Atoms: `InputChip` (an arrow or a button number in a square), `RangeTag`, `GameTag`, `PlayButton`, `FilterChip`, `SectionTitle`.
2. Molecules: `InputSequence` (a labelled bar of chips), `FighterHeader` (name, title, element, difficulty), `RosterJump` (a scrolling strip of fighters), `MoveSearch`, `MoveFilters` (game and range chips), `StatBox`.
3. Organisms: `MoveCard` (the preview slot, name, description, input sequence), `FighterSection`, `RosterGrid` (the About page's fighter cards), `NotationLegend`.
4. Templates and pages: `ArchiveTemplate`, `FatalitiesPage`, `BrutalitiesPage`, and `AboutPage`.

## 5. The animated preview (the "video" slot)
1. `MovePreview`: a 16:9 slot with the design's corner brackets, a poster with animated embers and a scanline, the range and game tags, and a play button.
2. Pressing play mounts the 3D scene (the existing lazy `SceneCanvas`) inside the slot and plays the move's animation, with pause and replay; only one preview is active at a time, so the page never holds more than one WebGL context. The canvas ignores touches (so the page scrolls), and the poster animation stops for users who ask for reduced motion.

## 6. Search and filters
1. `useMoveFilters`: the text, the game, and the range (state in the hook), producing the visible moves and the visible fighters; the header search and the page filters feed the same state.
2. A status line says how many moves match, and an empty state says nothing matched.

## 7. Cleanup
1. Delete the pages, components, hooks, and tests of the first version that the new screens replace (the single fatality page, the list, the game filter links, the old data entries), keeping the scene, the animation system, and the playback controls.

## 8. Tests (Vitest, feature logic only)
1. Test the data (every move has a fighter, an animation, and a non-empty input; ids are unique; every move is marked unverified), the search and filter helpers, the roster counts, the route parser, `useMoveFilters`, `InputSequence`, `MoveCard` (play mounts one preview and a second play replaces it), and the three pages.

## 9. Verify and document
1. Run the tests, lint, and build; take headless-Chrome screenshots of the three pages at 375, 768, and 1280px and compare them with the design; fix differences.
2. Update `README.md`. Commit on `mvp`, open a PR to `main`, run `/pr-review`, then `/changelog`.
