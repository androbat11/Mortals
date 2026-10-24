import type { PartSize, Position } from './characterRig'

// Design: every measurement of the character is in one place, so the body plan
// can be adjusted without touching the code that assembles it. It is a function
// (not a constant) so nothing global is shared. Units are Three.js units, about
// one metre. Parts hang down from their joints, and the legs add up so the feet
// rest on the ground at y = 0: 0.42 + 0.42 for the legs, 0.2 pelvis, 0.5 torso,
// 0.26 head, for a total height of 1.8.
export function createCharacterDimensions() {
  const size = (width: number, height: number, depth: number): PartSize => ({
    width,
    height,
    depth,
  })
  const position = (x: number, y: number, z = 0): Position => ({ x, y, z })

  return {
    head: size(0.26, 0.26, 0.26),
    torso: size(0.54, 0.5, 0.28),
    pelvis: size(0.5, 0.2, 0.28),
    upperArm: size(0.17, 0.32, 0.17),
    forearm: size(0.15, 0.3, 0.15),
    upperLeg: size(0.21, 0.42, 0.21),
    lowerLeg: size(0.19, 0.42, 0.19),
    neck: position(0, 1.54),
    torsoTop: position(0, 1.54),
    pelvisTop: position(0, 1.04),
    // The shoulder x puts the arm's inner face 0.005 inside the torso's side
    // (0.27 + 0.085 - 0.005 = 0.35), so no background shows between arm and body.
    shoulder: position(0.35, 1.5),
    hip: position(0.14, 0.84),
  }
}
