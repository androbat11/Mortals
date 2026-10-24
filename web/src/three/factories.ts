import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

const MAX_PIXEL_RATIO = 2

export function createSceneObject() {
  return new Scene()
}

export function createCamera(aspect: number) {
  const camera = new PerspectiveCamera(60, aspect, 0.1, 100)
  camera.position.z = 3
  return camera
}

export function createCube() {
  return new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0x4ade80, wireframe: true }),
  )
}

export function createRenderer(
  width: number,
  height: number,
  pixelRatio: number,
) {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(pixelRatio, MAX_PIXEL_RATIO))
  renderer.setSize(width, height)
  return renderer
}

export function createClock() {
  return new Clock()
}
