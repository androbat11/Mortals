import type { Animation, Pose } from './animationTypes'
import { sampleTrack } from './sampleTrack'

// Design: evaluating an animation is a pure function of the animation and the
// time, with no rig, no Three.js, and no state. That keeps it testable without
// WebGL and lets a pause (a fixed time) or a replay (time back to 0) be a
// change to the time only. Joints that have no track are left out of the pose,
// so they keep whatever rotation they have.
export function evaluateAnimation(animation: Animation, time: number): Pose {
  const pose: Pose = {}
  animation.tracks.forEach(({ joint, keyframes }) => {
    pose[joint] = sampleTrack(keyframes, time)
  })
  return pose
}
