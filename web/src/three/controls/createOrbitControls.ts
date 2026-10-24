import type { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// The element is a parameter, like the renderer's size, so this factory reads
// nothing from the page. Controls add event listeners to that element, which is
// why the hook must dispose them on cleanup.
export function createOrbitControls(
  camera: PerspectiveCamera,
  domElement: HTMLElement,
) {
  return new OrbitControls(camera, domElement)
}
