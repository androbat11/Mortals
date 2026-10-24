import type { Object3D, WebGLRenderer } from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { disposeScene } from '../three/rendering/disposeScene'

type CleanupTargets = {
  stopLoop?: () => void
  observer?: Pick<ResizeObserver, 'disconnect'>
  controls?: Pick<OrbitControls, 'dispose'>
  scene?: Object3D
  renderer: Pick<WebGLRenderer, 'forceContextLoss' | 'dispose' | 'domElement'>
}

// Design: undoing what the scene setup created is one job. Every part except
// the renderer is optional, so the same function also undoes a setup that failed
// half way (`setupScene`). The order matters:
// stop the loop first so nothing renders while resources are freed, remove the
// listeners (observer and controls) while the canvas is still in the page, free
// the GPU objects, then release the WebGL context and remove the canvas.
// React StrictMode mounts, unmounts and mounts again in development, so without
// this there would be two canvases, two loops, and two sets of listeners.
// `forceContextLoss` releases the WebGL context right away: browsers allow only
// a limited number of live contexts, and repeated remounts (StrictMode, hot
// reload) would hit it.
export function createSceneCleanup({
  stopLoop,
  observer,
  controls,
  scene,
  renderer,
}: CleanupTargets) {
  return () => {
    stopLoop?.()
    observer?.disconnect()
    controls?.dispose()
    if (scene) disposeScene(scene)
    renderer.forceContextLoss()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
