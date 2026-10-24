import type { CharacterRig, JointName } from '../objects/character/characterRig'
import type { Pose } from './animationTypes'

// Design: this is the only place that touches the rig. It sets the rotation of
// each joint named in the pose and leaves the others alone, so the animation
// data never needs to know how the rig is built. `Object.keys` loses the key
// type, so the cast to `JointName[]` is kept here, once.
export function applyPose(rig: CharacterRig, pose: Pose) {
  const names = Object.keys(pose) as JointName[]
  names.forEach((name) => {
    const rotation = pose[name]
    if (rotation) {
      rig.joints[name].rotation.set(rotation.x, rotation.y, rotation.z)
    }
  })
}
