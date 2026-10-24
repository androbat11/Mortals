import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'

export function createGround() {
  // The plane is large enough that its edge is always beyond the fog's far
  // distance, however the camera is placed within the control limits, so the
  // fog hides the edge (the fog colour matches the background). `PlaneGeometry`
  // stands upright by default, so it is rotated to lie flat. No shadows yet
  // (out of scope for this phase).
  const ground = new Mesh(
    new PlaneGeometry(100, 100),
    new MeshStandardMaterial({ color: 0x374151 }),
  )
  ground.rotation.x = -Math.PI / 2
  return ground
}
