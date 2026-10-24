import type { Animation } from '../animationTypes'
import { createXTrack } from './createXTrack'

// Design: an original, generic move, not a Mortal Kombat one: both arms raised
// overhead while looking up, then slammed down into a squat while the head drops
// forward, a hold, and a return. It runs 3 seconds and starts and ends at the
// rest pose, so the loop has no pop. Timeline: raise at 0.9, slam at 1.2 (held
// to 1.8), rest by 2.6. The squat is shallow because there is no root motion.
export function createOverheadSmashFinisher(): Animation {
  return {
    id: 'overhead-smash-finisher',
    duration: 3,
    tracks: [
      createXTrack('shoulderL', [[0, 0], [0.9, -3.0], [1.2, -0.3], [1.8, -0.3], [2.6, 0], [3, 0]]),
      createXTrack('shoulderR', [[0, 0], [0.9, -3.0], [1.2, -0.3], [1.8, -0.3], [2.6, 0], [3, 0]]),
      createXTrack('elbowL', [[0, 0], [0.9, -0.2], [1.2, -0.1], [1.8, -0.1], [2.6, 0], [3, 0]]),
      createXTrack('elbowR', [[0, 0], [0.9, -0.2], [1.2, -0.1], [1.8, -0.1], [2.6, 0], [3, 0]]),
      createXTrack('hipL', [[0, 0], [0.9, 0.1], [1.2, -0.4], [1.8, -0.4], [2.6, 0], [3, 0]]),
      createXTrack('hipR', [[0, 0], [0.9, 0.1], [1.2, -0.4], [1.8, -0.4], [2.6, 0], [3, 0]]),
      createXTrack('kneeL', [[0, 0], [0.9, 0], [1.2, 0.9], [1.8, 0.9], [2.6, 0], [3, 0]]),
      createXTrack('kneeR', [[0, 0], [0.9, 0], [1.2, 0.9], [1.8, 0.9], [2.6, 0], [3, 0]]),
      createXTrack('neck', [[0, 0], [0.9, -0.3], [1.2, 0.3], [1.8, 0.3], [2.6, 0], [3, 0]]),
    ],
  }
}
