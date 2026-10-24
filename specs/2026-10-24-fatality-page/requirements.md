# Requirements: Fatality Page (Roadmap Phase 7)

## Scope
The first real screen: show the 3D animation next to the fatality's game, description, and tutorial, using the Phase 6 data. The data now drives the scene, because the entry's `animationId` selects the animation.

In scope:
- A `useFatality` hook and a `FatalityPage` that look up an entry by id.
- Atomic components (atom, molecules, organism, template) that display the game, the name, what the fatality does, and the numbered tutorial.
- A responsive, mobile-first layout with media queries (stacked on phones, side by side from tablet width).
- An accessible scene label built from the entry.
- Vitest tests for the new logic and the data shown.

Out of scope:
- A list or routing (Phase 9), replay and pause (Phase 8), the game filter (Phase 11), and loading states and styling refinements (Phase 12).
- Button inputs and character information (parked), real fatalities (Phase 10), and a backend.
- New dependencies, a CSS framework, and changing the 3D scene.

## Decisions
These were chosen as the recommended defaults, because there was no time to ask; each can be reversed.
- **Base:** `phase-6-fatality-data-model`, because Phase 6 (the data this page shows) is not merged into `main` yet. The PR targets `main` once Phase 6 is merged. The manual browser checks for Phases 2 to 6 and the roadmap statuses are still open.
- **Layout:** mobile-first. On phones the scene is on top with a bounded height (about 55% of the viewport) and the details are below, and the page scrolls. From about 768px the scene is beside the details in two columns. This fixes the problem found in review that a full-viewport canvas captures one-finger touch and leaves no way to scroll to the tutorial.
- **Atomic design:** `GameBadge` (atom), `FatalityHeader` and `TutorialSteps` (molecules), `FatalityDetails` (organism), `FatalityPageTemplate` (template, layout only, with `scene` and `details` slots), and `FatalityPage` (page). Components are composable (`children` or slots) and contain no logic.
- **Logic in hooks:** the lookup is `useFatality`, a hook; components only render. The page takes the fatality id as a prop (Phase 9 will supply it from the route).
- **Data drives the scene:** `SceneCanvas` gets `animationId` from the entry and its `label` from the entry's name, so a new fatality needs data and no page code.
- **Styling:** CSS Modules (supported by Vite, no new dependency), one file per component, with the shared colours and font as CSS variables in `index.css`. The look matches the scene's dark background; a full style pass is Phase 12.
- **Accessibility:** one `h1` (the fatality name) and `h2` sections ("What it does", "How to perform it"); the tutorial is an ordered list; the page is a single `main`.
- **Remove the full-viewport page:** `ScenePage` and the clipped `.scene-page` rule are deleted; the page now scrolls.
- **Copy:** the section titles are fixed English text in the components; nothing about real games is added.
- **Branch:** `phase-7-fatality-page`.
- **Spec filenames:** `plan.md`, `requirements.md`, `validation.md`, matching earlier specs.

## Context
- `specs/mission.md`: each fatality shows an animation, the game, what it does, and a tutorial; simple, low friction, responsive by default, no clutter.
- `specs/tech-stack.md`: React with TypeScript, mobile-first CSS with media queries, Three.js wrapped in React components, static typed data.
- `specs/roadmap.md`: Phase 7 follows Phase 6 (the data model) and precedes Phase 8 (replay and pause) and Phase 9 (the list).
- `CLAUDE.md`: atomic design, composable components, UI and logic separate, responsive design with media queries, type-first, no globals, small modules, comments on decisions, tests for feature logic only.
- Repo state at start: the scene (character, animation, controls) is unchanged; `ScenePage` is a full-viewport clipped canvas; the sample fatality exists in `web/src/data/` but nothing shows it.
- Parked, not part of this spec: button inputs and character information below the animation, and a realistic, rounded character.

## Future notes (deliberately not in this phase)
- **Phase 8:** replay and pause controls will sit with the scene; the player needs a handle for them.
- **Phase 9:** the list will link to `FatalityPage` by id, so routing arrives then.
- **Phase 12:** loading states, a full style pass, and a final responsive review.
- **Scene rebuild:** changing the fatality id rebuilds the scene and its WebGL context; the list and page should avoid switching ids on a mounted page.
