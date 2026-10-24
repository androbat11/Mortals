# Requirements: Playback Controls (Roadmap Phase 8)

## Scope
Add replay and pause for the animation, as buttons on the fatality page.

In scope:
- A shared playback control the scene's animation player reads, so the buttons can pause, resume, and restart without rebuilding the scene.
- Pause or Play and Replay buttons over the scene, usable by touch, mouse, and keyboard.
- Starting paused when the user's system asks for reduced motion (the gap noted in earlier reviews).
- Vitest tests for the new logic.

Out of scope:
- A timeline scrubber, speed control, and keyboard shortcuts beyond the buttons.
- The list, filter, and polish phases, new fatalities, and button inputs (parked).
- New dependencies.

## Decisions
These were chosen as the recommended defaults, because there was no time to ask.
- **Base:** `phase-7-fatality-page`, because Phases 6 and 7 are not merged into `main` yet.
- **Mechanism:** a `PlaybackControl` object (closure state, no module-level state) shared by React and the player. React's buttons call it; the player reads it every frame. This avoids rebuilding the scene when the user pauses (which would also recreate the WebGL context) and keeps the render loop generic. The earlier idea of a handle returned by the hook was dropped because the control is simpler to test.
- **Pause keeps the scene live:** while paused the loop still renders and the orbit controls still work, so a paused fatality can still be rotated; only the animation time stops.
- **Replay** starts the move from the beginning and also resumes playing, so pressing it while paused plays it.
- **Reduced motion:** the move starts paused (at the rest pose) when `prefers-reduced-motion: reduce` is set, and the user can press Play. This answers WCAG 2.2.2 (a pause mechanism for auto-playing motion).
- **State mirror:** the control holds the truth for the player; React keeps a copy of `playing` only to render the button label.
- **Atomic design:** `Button` (atom), `PlaybackControls` (molecule), and a `controls` slot in the template; no logic in components (the hook has it).
- **Placement:** the controls sit over the bottom of the scene area, centred, so they are reachable on a phone without scrolling.
- **Branch:** `phase-8-playback-controls`.

## Context
- `specs/mission.md`: simple, low friction, responsive by default.
- `specs/roadmap.md`: Phase 8 follows Phase 7 (the page) and precedes Phase 9 (the list).
- `CLAUDE.md`: atomic design, UI and logic separate, type-first, no globals, small modules, comments on decisions, tests for feature logic only, responsive with media queries.
- Repo state at start: the fatality page shows the data next to the animation, which loops with no controls; the player owns its elapsed time in a closure and returns a plain frame updater.
- Parked: button inputs and character information; a realistic character.

## Future notes
- Speed control and a scrubber would extend `PlaybackControl` and the player only.
- Changing the animation id still rebuilds the scene; the list should not switch ids on a mounted page.
