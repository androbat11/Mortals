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
// changes when a window moves between monitors or the browser zoom changes,
// and a ResizeObserver fires in both cases.
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
