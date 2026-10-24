// Design: browsers pause the animation loop in hidden tabs, so the first frame
// after the tab returns can report a delta of many seconds, and the character would
// jump. Clamping the delta keeps motion smooth. `maxSeconds` is a default
// parameter rather than a module constant, so there is no global state.
export function clampDelta(deltaSeconds: number, maxSeconds = 0.1): number {
  return Math.min(deltaSeconds, maxSeconds)
}
