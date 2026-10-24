// Design: factories for browser APIs live here, not in `three/`, which must
// stay free of DOM code. Keeping them as factories (instead of an inline
// `new ResizeObserver`) lets the repository create them like any other object.
export function createResizeObserver(callback: ResizeObserverCallback) {
  return new ResizeObserver(callback)
}
