# Requirements: Polish (Roadmap Phase 12)

## Scope
Styling refinements, loading states, and a final responsive review across all screens.

In scope:
- Lazy loading of the 3D scene, with a loading message and a load-error message.
- A document title per page and basic page metadata.
- Small styling refinements (transitions that respect reduced motion, a consistent focus ring, spacing and type fixes).
- A responsive review with screenshots at phone, tablet, and desktop widths, and the fixes it shows.
- Vitest tests for the new logic.

Out of scope:
- A redesign, a logo or favicon, animations beyond hover transitions, and a theme switch.
- Deployment (Phase 13), real content, button inputs and character information (parked), and a realistic character.
- New dependencies.

## Decisions
These were chosen as the recommended defaults, because there was no time to ask.
- **Base:** `phase-11-game-filter`, because earlier phases are not merged into `main` yet.
- **Lazy loading is the loading state:** Three.js is most of the bundle (the build warns about a 780 kB chunk). Loading the scene lazily splits it into its own chunk, so the list page loads without it and the fatality page shows a message while the scene code arrives. This also answers the earlier note to defer code splitting to this phase.
- **No error boundary class:** a class component would break the "functions only" rule, so a failed chunk download is handled by catching the import and rendering a small error component instead. WebGL failures are already handled inside the scene.
- **Lazy component from a factory:** `React.lazy` returns an object that caches its result, so it is created by a factory and kept by a hook, not held in a module-level constant. Re-opening a fatality page can flash the loading message briefly, because the module is cached but the component is new; this is accepted.
- **Reduced motion:** transitions are added only inside `prefers-reduced-motion: no-preference`, so a user who asks for less motion sees none.
- **Titles:** set by a hook, so each page has a meaningful tab and history title.
- **Review method:** headless Chrome screenshots at three widths. They show layout, not touch or screen reader behaviour, which stay as manual checks.
- **Branch:** `phase-12-polish`.

## Context
- `specs/mission.md`: simple, fun, low friction; responsive by default.
- `specs/roadmap.md`: Phase 12 follows Phase 11 and precedes Phase 13 (deploy); the roadmap asks for a final responsive review across all screens.
- `CLAUDE.md`: atomic design, UI and logic separate, no globals, functions only, small modules, responsive with media queries, tests for feature logic only.
- Repo state at start: the list with a game filter, the fatality page with playback controls, three sample fatalities; the build produces one large JavaScript chunk.

## Future notes
- A favicon and a logo, a light theme, and a real content pass belong to a later design step.
