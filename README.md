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
  - `objects/`: the things in the scene (`createCube`, `createGround`, `createCamera`, the lights, `createSceneObject`).
  - `rendering/`: the renderer, timer and per-frame helpers (`createRenderer`, `applySize`, `disposeScene`, `clampDelta`, `clampPixelRatio`, `toSafeSize`).
  - `controls/`: `createOrbitControls` and the control settings (`controlLimits`).
  - `animation/`: `rotateCube` and `startRenderLoop`.
  - `core/`: generic tools (`createRepository`, `tryCreate`).
- `web/src/hooks/`: `useThreeScene`, which wires the objects together, starts the animation loop, and cleans up; `createSceneContents`, which composes the objects into a scene; `createSceneRepository`, the registry of everything the scene creates; and `browserFactories`, factories for browser APIs.
- `web/src/components/organisms/SceneCanvas/`: the component that hosts the canvas.
- `web/src/pages/ScenePage.tsx`: the page `App` renders; the canvas fills the viewport.

## Testing

Run `npm test` in `web/` (Vitest). The Three.js renderer is mocked in tests because jsdom has no WebGL.

## Workflow

- `CLAUDE.md` holds the development rules (atomic design, type-first, functions over classes, factory functions, responsive design, no globals). `specs/` holds the mission, roadmap, tech stack, and one directory per feature.
- Claude Code skills in `.claude/skills/`: `/feature` creates a spec directory, `/pr-review` reviews a GitHub pull request and posts inline comments, and `/changelog` updates `changelog.md` before merging.
