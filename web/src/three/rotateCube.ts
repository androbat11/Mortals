import type { Object3D } from 'three'

type RotationConfig = {
  speed: number
}

// Design: the speed lives behind a function instead of a module-level constant.
// Module-level state is shared by everything that imports the file and can cause
// side effects; a function hands each caller a fresh value. It also marks the
// spot where this could later take arguments (for example per-fatality speed).
function createRotationConfig(): RotationConfig {
  return { speed: 1 }
}

// Design: rotation depends on elapsed time (`deltaSeconds`), not on frames, so
// the cube spins at the same speed on a 60 Hz phone and a 144 Hz monitor. It
// takes any `Object3D`, not a specific mesh, so the character can reuse it in
// later phases, and it is a pure function of its inputs, which makes it easy
// to test without WebGL.
export function rotateCube(cube: Object3D, deltaSeconds: number) {
  const { speed } = createRotationConfig()
  cube.rotation.x += speed * deltaSeconds
  cube.rotation.y += speed * deltaSeconds
}
