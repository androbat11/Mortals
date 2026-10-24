import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Timer,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { clampPixelRatio } from './clampPixelRatio'

// Design: every object the scene needs is created by one small factory
// function that does one thing. Nothing here uses React or reads the page:
// `WebGLRenderer` creates its own canvas element, but attaching it is the
// caller's job. The factories can be unit-tested and reused by later phases
// (the character) without moving code.

// The factory is named `createSceneObject` because `createScene` would read as
// "build the whole scene". This only creates the empty container.
export function createSceneObject() {
  return new Scene()
}

export function createCamera(aspect: number) {
  // The aspect ratio is a parameter, not read from the window, so the factory
  // has no hidden inputs. 60 degrees is a natural field of view for a single
  // object. The camera starts above and to the side, looking at the origin, so
  // the user sees the cube and the ground from a natural angle before they
  // touch the controls. It sits inside the control limits' zoom range.
  const camera = new PerspectiveCamera(60, aspect, 0.1, 100)
  camera.position.set(3, 2.5, 4)
  camera.lookAt(0, 0, 0)
  return camera
}

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

export function createAmbientLight() {
  // Soft light from everywhere, so faces turned away from the main light are
  // dim instead of black.
  return new AmbientLight(0xffffff, 0.6)
}

export function createDirectionalLight() {
  // The main light, from above and to the side, so the cube's faces get
  // different brightness and read as 3D.
  const light = new DirectionalLight(0xffffff, 2)
  light.position.set(3, 5, 2)
  return light
}

// The element is a parameter, like the renderer's size, so this factory reads
// nothing from the page. Controls add event listeners to that element, which is
// why the hook must dispose them on cleanup.
export function createOrbitControls(
  camera: PerspectiveCamera,
  domElement: HTMLElement,
) {
  return new OrbitControls(camera, domElement)
}

export function createRenderer(
  width: number,
  height: number,
  pixelRatio: number,
) {
  const renderer = new WebGLRenderer({ antialias: true })
  // The pixel ratio is a parameter (the caller passes `devicePixelRatio`) so
  // this factory stays free of globals; `clampPixelRatio` applies the cap.
  renderer.setPixelRatio(clampPixelRatio(pixelRatio))
  renderer.setSize(width, height)
  return renderer
}

// `Clock` is deprecated in current three.js; `Timer` replaces it. Call
// `update()` once per frame, then read `getDelta()`.
export function createTimer() {
  return new Timer()
}
