// Design: the cap is a literal inside a function instead of a module-level
// constant, so there is no shared global. Phones report a device pixel ratio of
// 3 or more, which renders several times more pixels for little visible gain
// and drains the battery. Capping at 2 keeps the experience light on every
// device (mission: simple and low friction).
export function clampPixelRatio(pixelRatio: number): number {
  return Math.min(pixelRatio, 2)
}
