import type { Object3D } from 'three'

type RotationConfig = {
  speed: number
}

function createRotationConfig(): RotationConfig {
  return { speed: 1 }
}

export function rotateCube(cube: Object3D, deltaSeconds: number) {
  const { speed } = createRotationConfig()
  cube.rotation.x += speed * deltaSeconds
  cube.rotation.y += speed * deltaSeconds
}
