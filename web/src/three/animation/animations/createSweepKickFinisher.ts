import type { Animation } from '../animationTypes'
import { createXTrack } from './createXTrack'

// Design: an original, generic move, not a Mortal Kombat one: both hands up as a
// guard, the right leg wound back, then kicked high and forward, a hold, and a
// return to the stance. The standing leg bends a little to balance. It runs 3
// seconds and starts and ends at the rest pose, so the loop has no pop. Timeline:
// wind-up at 0.7, kick at 1.0 (held to 1.6), rest by 2.5.
export function createSweepKickFinisher(): Animation {
  return {
    id: 'sweep-kick-finisher',
    duration: 3,
    tracks: [
      createXTrack('hipR', [[0, 0], [0.7, 0.4], [1.0, -1.9], [1.6, -1.9], [2.5, 0], [3, 0]]),
      createXTrack('kneeR', [[0, 0], [0.7, 1.2], [1.0, 0.1], [1.6, 0.1], [2.5, 0], [3, 0]]),
      createXTrack('hipL', [[0, 0], [0.7, -0.2], [1.0, -0.1], [1.6, -0.1], [2.5, 0], [3, 0]]),
      createXTrack('kneeL', [[0, 0], [0.7, 0.3], [1.0, 0.1], [1.6, 0.1], [2.5, 0], [3, 0]]),
      createXTrack('shoulderL', [[0, 0], [0.7, -0.8], [1.6, -0.8], [2.5, 0], [3, 0]]),
      createXTrack('elbowL', [[0, 0], [0.7, -1.5], [1.6, -1.5], [2.5, 0], [3, 0]]),
      createXTrack('shoulderR', [[0, 0], [0.7, -0.6], [1.6, -0.6], [2.5, 0], [3, 0]]),
      createXTrack('elbowR', [[0, 0], [0.7, -1.4], [1.6, -1.4], [2.5, 0], [3, 0]]),
    ],
  }
}
