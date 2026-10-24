export type Size = {
  width: number
  height: number
}

// Design: a container that has not been laid out yet reports 0 x 0, which would
// give the camera a NaN aspect ratio. This single function is the one place
// that guards against it, so the setup and the resize callback cannot drift
// apart. It takes plain numbers, so it needs no DOM and is easy to test.
export function toSafeSize(width: number, height: number): Size {
  return { width: Math.max(width, 1), height: Math.max(height, 1) }
}
