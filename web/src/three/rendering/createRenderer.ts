import { WebGLRenderer } from 'three'
import { clampPixelRatio } from './clampPixelRatio'

// `WebGLRenderer` creates its own canvas element, but attaching it to the page
// is the caller's job, so this factory reads nothing from the page.
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
