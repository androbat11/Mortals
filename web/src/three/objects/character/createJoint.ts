import { Group } from 'three'
import type { Position } from './characterRig'

// A joint is an empty group that marks a pivot. Animation rotates the group, and
// everything attached to it (the part, and the next joint down the limb) moves
// with it. It is created at a position relative to its parent.
export function createJoint({ x, y, z }: Position) {
  const joint = new Group()
  joint.position.set(x, y, z)
  return joint
}
