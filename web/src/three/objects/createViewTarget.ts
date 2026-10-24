import { Vector3 } from 'three'

// The point the camera looks at and the orbit controls turn around: the centre
// of the character's body (it is 1.8 tall, so 0.9), so the character is centred
// in the view instead of the scene looking at the ground between its feet. One
// factory serves both the camera and the controls, so they cannot disagree. If
// the character's height changes, change this with it (a test checks it).
export function createViewTarget() {
  return new Vector3(0, 0.9, 0)
}
