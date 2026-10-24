# Mortals

A Mortal Kombat fatalities hub. Browse 3D animations of fatalities, rendered with Three.js, each paired with a tutorial on how to perform it.

## Description

Mortals is a hub where users can watch Mortal Kombat fatalities as 3D animations and learn how to execute them. For each fatality, the user sees:

- **The animation**: a 3D Three.js rendering of the fatality.
- **The game**: which Mortal Kombat game it comes from.
- **What it does**: a description of the fatality.
- **The tutorial**: the corresponding walkthrough for performing it.

## Tech Stack

- [Vite](https://vite.dev/), [React](https://react.dev/) with TypeScript, and npm
- [Three.js](https://threejs.org/) for the 3D animations, used directly
- [Vitest](https://vitest.dev/) for tests

See `specs/tech-stack.md` for the full list and the reasoning.

## Getting Started

```bash
cd web
npm install
npm run dev
```

Run every npm command inside `web/`; the root `package.json` has no scripts of its own. Other scripts: `npm test`, `npm run build`, `npm run lint`, `npm run preview`.

## Project Structure

The app lives in `web/` and follows atomic design with functional components only:

- `web/src/components/atoms/`: smallest building blocks (buttons, labels).
- `web/src/components/molecules/`: small groups of atoms.
- `web/src/components/organisms/`: larger self-contained sections.
- `web/src/components/templates/`: page layouts without real content.
- `web/src/pages/`: full screens that fill templates with content.

Three.js code is split out of the components:

- `web/src/three/`: plain TypeScript with no React and no page access, organised by what each module does, in the spirit of atomic design (small single-purpose pieces that compose upward). One factory per file:
  - `objects/`: the things in the scene (`createGround`, `createCamera`, `createViewTarget`, the lights, the background and fog, `createSceneObject`), and `objects/character/`, the procedural low-poly character: small factories for the palette, measurements, materials, body parts, joints and limbs, assembled by `createCharacter` into a typed rig with nine named joints.
  - `rendering/`: the renderer, timer and per-frame helpers (`createRenderer`, `applySize`, `disposeScene`, `clampDelta`, `clampPixelRatio`, `toSafeSize`).
  - `controls/`: `createOrbitControls` and the control settings (`controlLimits`).
  - `animation/`: `startRenderLoop`, which runs a list of per-frame updaters (`FrameUpdater`) and renders, so animation is one more entry in the list.
  - `core/`: generic tools (`createRepository`, `tryCreate`).
- `web/src/hooks/`: `useThreeScene`, a thin hook that creates the renderer and reports whether it failed; `setupScene`, which assembles the scene around it and undoes a half-finished setup if a step throws; `createSceneContents` (objects, lights, background and fog), `createSceneControls` (orbit controls with their limits), and `createSceneCleanup` (undoing it all in order), each small and single-purpose; `createSceneRepository`, the registry of everything the scene creates; and `browserFactories`, factories for browser APIs.
- `web/src/components/organisms/SceneCanvas/`: the component that hosts the canvas.
- `web/src/pages/ScenePage.tsx`: the page `App` renders; the canvas fills the viewport.

## Testing

Run `npm test` in `web/` (Vitest). The Three.js renderer is mocked in tests because jsdom has no WebGL.

## Workflow

- `CLAUDE.md` holds the development rules (atomic design, type-first, functions over classes, factory functions, small modules grouped by purpose, responsive design, no globals). `specs/` holds the mission, roadmap, tech stack, and one directory per feature.
- Claude Code skills in `.claude/skills/`: `/feature` creates a spec directory, `/pr-review` reviews a GitHub pull request and posts inline comments, and `/changelog` updates `changelog.md` before merging.
