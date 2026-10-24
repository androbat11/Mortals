import type {
  Camera,
  Object3D,
  Scene,
  Timer,
  WebGLRenderer,
} from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { clampDelta } from '../rendering/clampDelta'
import { rotateCube } from './rotateCube'

type RenderLoopTargets = {
  renderer: Pick<WebGLRenderer, 'setAnimationLoop' | 'render'>
  scene: Scene
  camera: Camera
  cube: Object3D
  controls: Pick<OrbitControls, 'update'>
  timer: Pick<Timer, 'update' | 'getDelta'>
}

// Design: what happens on every frame is one job, separate from creating the
// objects and from cleaning up. It returns the function that stops the loop, so
// the caller does not need to know how the loop was started.
// `setAnimationLoop` is used instead of `requestAnimationFrame` because three.js
// pauses it in hidden tabs and can later switch it to XR frames. The controls
// are updated every frame because damping needs it.
export function startRenderLoop({
  renderer,
  scene,
  camera,
  cube,
  controls,
  timer,
}: RenderLoopTargets) {
  renderer.setAnimationLoop(() => {
    timer.update()
    controls.update()
    rotateCube(cube, clampDelta(timer.getDelta()))
    renderer.render(scene, camera)
  })

  return () => renderer.setAnimationLoop(null)
}
