import type { JointName } from '../../objects/character/characterRig'
import type { JointTrack } from '../animationTypes'

// Design: most moves only swing joints forward and back, which is a rotation
// around x. This writes such a track from `[time, angle]` points, so a new
// animation is mostly a list of numbers and the keyframe objects are not
// repeated by hand. A negative angle swings a limb forward (see
// `characterRig.ts`). The points must be in increasing time order; a test checks
// every registered animation.
export function createXTrack(
  joint: JointName,
  points: [time: number, angle: number][],
): JointTrack {
  return {
    joint,
    keyframes: points.map(([time, x]) => ({ time, rotation: { x } })),
  }
}
