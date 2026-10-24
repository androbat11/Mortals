import type { Object3D } from 'three'

const SPEED = 1

export function rotateCube(cube: Object3D, deltaSeconds: number) {
  cube.rotation.x += SPEED * deltaSeconds
  cube.rotation.y += SPEED * deltaSeconds
}
