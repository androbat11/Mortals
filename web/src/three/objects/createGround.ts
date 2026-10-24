import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'

export function createGround() {
  // The plane is much larger than the visible area so its edge is never seen
  // at the maximum zoom. `PlaneGeometry` stands upright by default, so it is
  // rotated to lie flat. No shadows yet (out of scope for this phase).
  const ground = new Mesh(
    new PlaneGeometry(40, 40),
    new MeshStandardMaterial({ color: 0x374151 }),
  )
  ground.rotation.x = -Math.PI / 2
  return ground
}
