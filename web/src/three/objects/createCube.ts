import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'

export function createCube() {
  // A solid lit material (not the Phase 2 unlit wireframe), so the lights and
  // the ground visibly affect the cube, and the stylized low-poly look the
  // mission asks for has shaded faces. The cube is 1 unit tall, so lifting it
  // by half a unit makes it rest exactly on the ground at y = 0.
  const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({ color: 0x4ade80 }),
  )
  cube.position.y = 0.5
  return cube
}
