import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
} from 'three'

export function createScene(aspect: number) {
  const scene = new Scene()

  const camera = new PerspectiveCamera(60, aspect, 0.1, 100)
  camera.position.z = 3

  const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0x4ade80, wireframe: true }),
  )
  scene.add(cube)

  return { scene, camera, cube }
}
