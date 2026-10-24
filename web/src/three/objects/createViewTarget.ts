import { Vector3 } from 'three'

// The point the camera looks at and the orbit controls turn around: the
// character's chest height (the character is 1.8 tall), so it is centred in the
// view instead of the scene looking at the ground between its feet. One factory
// serves both the camera and the controls, so they cannot disagree.
export function createViewTarget() {
  return new Vector3(0, 0.9, 0)
}
