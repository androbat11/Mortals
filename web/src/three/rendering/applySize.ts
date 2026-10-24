import type { PerspectiveCamera, WebGLRenderer } from 'three'
import { clampPixelRatio } from './clampPixelRatio'
import type { Size } from './toSafeSize'

type SizeTargets = {
  renderer: Pick<WebGLRenderer, 'setPixelRatio' | 'setSize'>
  camera: PerspectiveCamera
}

// Design: resizing means keeping the renderer and the camera in step, so one
// function does exactly that. Updating the camera aspect and projection matrix
// avoids a stretched cube. The pixel ratio is re-applied here because it
// changes when the browser zoom changes (which also changes the element's size,
// so a ResizeObserver fires) and, on some browsers, when the window moves
// between monitors; re-applying it on every resize covers those cases.
export function applySize(
  { renderer, camera }: SizeTargets,
  { width, height }: Size,
  pixelRatio: number,
) {
  renderer.setPixelRatio(clampPixelRatio(pixelRatio))
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}
