import type { Object3D } from 'three'

// Design: rotation depends on elapsed time (`deltaSeconds`), not on frames, so
// the cube spins at the same speed on a 60 Hz phone and a 144 Hz monitor. The
// speed is a default parameter instead of a module constant, so there is no
// global state and no per-frame allocation, and a caller can still override it
// (for example a per-fatality speed later). It takes any `Object3D`, so the
// character can reuse it, and it is a pure function of its inputs, which makes
// it easy to test without WebGL. It spins around the vertical axis only: the
// cube now rests on a ground plane, and tumbling on the other axes would push
// its corners through the floor.
export function rotateCube(cube: Object3D, deltaSeconds: number, speed = 1) {
  cube.rotation.y += speed * deltaSeconds
}
