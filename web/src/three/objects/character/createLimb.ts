import type { Material } from 'three'
import type { PartSize, Position } from './characterRig'
import { createBodyPart } from './createBodyPart'
import { createJoint } from './createJoint'

type LimbSpec = {
  position: Position
  upper: { size: PartSize; material: Material }
  lower: { size: PartSize; material: Material }
}

// Design: an arm and a leg have the same shape: an upper part hanging from a
// joint, and a lower part hanging from a second joint at the end of the upper
// part (shoulder and elbow, hip and knee). One function builds both, so the
// four limbs are mirrored by construction and cannot drift apart.
export function createLimb({ position, upper, lower }: LimbSpec) {
  const joint = createJoint(position)
  joint.add(createBodyPart(upper.size, upper.material))

  const childJoint = createJoint({ x: 0, y: -upper.size.height, z: 0 })
  childJoint.add(createBodyPart(lower.size, lower.material))
  joint.add(childJoint)

  return { joint, childJoint }
}
