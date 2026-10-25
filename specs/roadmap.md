# Roadmap

Each phase is small and independently verifiable. Finish and verify one before starting the next.

**Responsive design applies to every phase:** each screen or component added must work at phone, tablet, and desktop widths and be checked at those sizes before the phase is done.

**Testing applies to every phase:** write Vitest tests only for the specific feature logic and behaviour a phase adds. Do not add tests for `main.tsx`, `App.tsx`, or other plain wiring.

1. **Scaffold (done):** Vite + React + TypeScript project runs and shows a minimal page.
2. **Three.js canvas (built):** A React component renders a Three.js scene with a spinning cube.
3. **Camera and lighting (built):** Add orbit controls, lights, and a ground plane.
4. **Low-poly character (built):** Build one procedural low-poly character in the scene.
5. **First animation (built):** Animate that character through one simple fatality.
6. **Fatality data model (built):** Define the TypeScript type and one data entry (game, description, tutorial steps).
7. **Fatality page (built):** Show the animation next to its game, description, and tutorial.
8. **Playback controls (built):** Add replay and pause for the animation.
9. **Fatality list (built):** Add a list screen that links to each fatality page.
10. **Second and third fatalities (built):** Add more animations and data entries to reach the MVP set.
11. **Game filter (built):** Filter or group the list by game.
12. **Polish (built):** Styling refinements and loading states, plus a final responsive review across all screens.
13. **Deploy (prepared, not published):** Publish to a static host.

Phases 1 to 13 built the first version (a sample-content viewer). It is being redesigned to the Netherflame archive design on the `mvp` branch:

14. **MVP redesign:** Rebuild the screens to the Netherflame design (header, footer, About, Fatalities, Brutalities), with a fighter-and-move data model (inputs, range, trigger), search and filters, and the video slots as animated 3D previews. Details are in `specs/2026-10-25-mvp-redesign/`.
15. **Content accuracy:** Verify every move (name, game, description, trigger, input) against the games and remove the "unverified" marking.
16. **Publish:** Publish the verified site to a static host.
