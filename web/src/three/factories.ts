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

// Design: every object the scene needs is created by one small factory
// function that does one thing. Nothing here touches React or the DOM tree, so
// the factories can be unit-tested and reused by later phases (character,
// lights) without moving code.

// The factory is named `createSceneObject` because `createScene` would read as
// "build the whole scene". This only creates the empty container.
export function createSceneObject() {
  return new Scene()
}

export function createCamera(aspect: number) {
  // The aspect ratio is a parameter, not read from the window, so the factory
  // has no hidden inputs. 60 degrees is a natural field of view for a single
  // object, and the camera sits at z = 3 so the unit cube fits in view.
  const camera = new PerspectiveCamera(60, aspect, 0.1, 100)
  camera.position.z = 3
  return camera
}

export function createCube() {
  // MeshBasicMaterial ignores lights, so the cube is visible without any.
  // Lighting is Phase 3, and keeping this phase unlit keeps it small.
  // Wireframe makes the rotation easy to see on a flat colour.
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
  // The pixel ratio is a parameter (the caller passes `devicePixelRatio`) so
  // this factory stays free of globals. It is capped at 2: phones report 3 or
  // more, which would render several times more pixels for little visible gain
  // and drain the battery. Mission: simple and low friction on every device.
  renderer.setPixelRatio(Math.min(pixelRatio, MAX_PIXEL_RATIO))
  renderer.setSize(width, height)
  return renderer
}

export function createClock() {
  return new Clock()
}
