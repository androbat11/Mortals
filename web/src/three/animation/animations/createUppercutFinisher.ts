import type { Animation, JointTrack } from '../animationTypes'
import type { JointName } from '../../objects/character/characterRig'

// Every joint in this move follows the same timeline (seconds): rest at 0, the
// wind-up at 0.8, the strike at 1.1 held until 1.7, back to rest at 2.6, and
// rest until the end at 3, so the loop has no pop. Only the angle at the wind-up
// and at the strike differs per joint, so a track is built from those two. All
// rotations are around x; a negative x swings a limb forward (see
// `characterRig.ts`).
function track(joint: JointName, windUp: number, strike: number): JointTrack {
  const at = (time: number, x: number) => ({ time, rotation: { x } })
  return {
    joint,
    keyframes: [
      at(0, 0),
      at(0.8, windUp),
      at(1.1, strike),
      at(1.7, strike),
      at(2.6, 0),
      at(3, 0),
    ],
  }
}

// Design: the first animation is data, not code: an id, a duration, and
// keyframe tracks over the named joints. It is an original, generic finisher,
// not a Mortal Kombat move: a crouching wind-up with the left hand up as a
// guard, a fast right uppercut, a hold, and a return to the stance. There is no
// spine or root motion yet, so the crouch is kept shallow (the feet lift only a
// few centimetres). The angles are tuned by eye in the manual checks.
export function createUppercutFinisher(): Animation {
  return {
    id: 'uppercut-finisher',
    duration: 3,
    tracks: [
      track('shoulderR', 0.5, -2.7),
      track('elbowR', -1.5, -0.1),
      track('shoulderL', -0.7, -0.7),
      track('elbowL', -1.6, -1.6),
      track('hipL', -0.3, -0.1),
      track('hipR', -0.3, -0.1),
      track('kneeL', 0.6, 0.2),
      track('kneeR', 0.6, 0.2),
      track('neck', 0.2, -0.3),
    ],
  }
}
