import type { Camera, Scene, Timer, WebGLRenderer } from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { clampDelta } from '../rendering/clampDelta'
import type { FrameUpdater } from './frameUpdater'

type RenderLoopTargets = {
  renderer: Pick<WebGLRenderer, 'setAnimationLoop' | 'render'>
  scene: Scene
  camera: Camera
  controls: Pick<OrbitControls, 'update'>
  timer: Pick<Timer, 'update' | 'getDelta'>
  updaters: FrameUpdater[]
}

// Design: what happens on every frame is one job, separate from creating the
// objects and from cleaning up. The loop knows nothing about what is in the
// scene: it runs the given updaters in order with the clamped delta, then
// renders. It returns the function that stops the loop, so the caller does not
// need to know how the loop was started.
// `setAnimationLoop` is used instead of `requestAnimationFrame` because three.js
// pauses it in hidden tabs and can later switch it to XR frames. The controls
// are updated every frame because damping needs it.
export function startRenderLoop({
  renderer,
  scene,
  camera,
  controls,
  timer,
  updaters,
}: RenderLoopTargets) {
  renderer.setAnimationLoop(() => {
    timer.update()
    controls.update()
    const deltaSeconds = clampDelta(timer.getDelta())
    updaters.forEach((update) => update(deltaSeconds))
    renderer.render(scene, camera)
  })

  return () => renderer.setAnimationLoop(null)
}
