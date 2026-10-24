# Roadmap

Each phase is small and independently verifiable. Finish and verify one before starting the next.

**Responsive design applies to every phase:** each screen or component added must work at phone, tablet, and desktop widths and be checked at those sizes before the phase is done.

**Testing applies to every phase:** write Vitest tests only for the specific feature logic and behaviour a phase adds. Do not add tests for `main.tsx`, `App.tsx`, or other plain wiring.

1. **Scaffold (done):** Vite + React + TypeScript project runs and shows a minimal page.
2. **Three.js canvas:** A React component renders a Three.js scene with a spinning cube.
3. **Camera and lighting:** Add orbit controls, lights, and a ground plane.
4. **Low-poly character:** Build one procedural low-poly character in the scene.
5. **First animation:** Animate that character through one simple fatality.
6. **Fatality data model:** Define the TypeScript type and one data entry (game, description, tutorial steps).
7. **Fatality page:** Show the animation next to its game, description, and tutorial.
8. **Playback controls:** Add replay and pause for the animation.
9. **Fatality list:** Add a list screen that links to each fatality page.
10. **Second and third fatalities:** Add more animations and data entries to reach the MVP set.
11. **Game filter:** Filter or group the list by game.
12. **Polish:** Styling refinements and loading states, plus a final responsive review across all screens.
13. **Deploy:** Publish to a static host.
