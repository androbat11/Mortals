# Mortals

A Mortal Kombat fatalities hub. Browse 3D animations of fatalities, rendered with Three.js, each paired with a tutorial on how to perform it.

## Description

Mortals is a hub where users can watch Mortal Kombat fatalities as 3D animations and learn how to execute them. For each fatality, the user sees:

- **The animation**: a 3D Three.js rendering of the fatality.
- **The game**: which Mortal Kombat game it comes from.
- **What it does**: a description of the fatality.
- **The tutorial**: the corresponding walkthrough for performing it.

## Tech Stack

- [Three.js](https://threejs.org/) for the 3D animations

## Getting Started

```bash
cd web
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## Project Structure

The app lives in `web/` and follows atomic design with functional components only:

- `web/src/components/atoms/`: smallest building blocks (buttons, labels).
- `web/src/components/molecules/`: small groups of atoms.
- `web/src/components/organisms/`: larger self-contained sections.
- `web/src/components/templates/`: page layouts without real content.
- `web/src/pages/`: full screens that fill templates with content.

Three.js code is split out of the components:

- `web/src/three/`: plain TypeScript that builds the scene and cube (no React or DOM code).
- `web/src/hooks/`: `useThreeScene`, which owns the renderer, animation loop, resizing, and cleanup.
- `web/src/components/organisms/SceneCanvas/`: the component that hosts the canvas.
- `web/src/pages/ScenePage.tsx`: the page `App` renders; the canvas fills the viewport.

## Testing

Run `npm test` in `web/` (Vitest). The Three.js renderer is mocked in tests because jsdom has no WebGL.
