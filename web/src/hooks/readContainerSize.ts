import { toSafeSize } from '../three/rendering/toSafeSize'

// Reading an element's size and guarding against 0 x 0 are two small steps that
// the hook and the scene setup both need, so they live in one place.
export function readContainerSize(container: HTMLElement) {
  return toSafeSize(container.clientWidth, container.clientHeight)
}
