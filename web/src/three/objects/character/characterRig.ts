import type { Group } from 'three'

// Design: type-first. The shape of the character is defined before the code that
// builds it. The named joints are the contract with the animation: it
// rotates `joints.elbowL` and so on, without searching the scene for objects.
// "L" and "R" are the character's own left and right.
//
// Conventions an animation relies on: the character faces +z and its left is
// +x. Parts hang down from their joints, so rotating a limb joint about x by a
// NEGATIVE angle swings it forward (toward +z) and a POSITIVE angle swings it
// backward; a knee or elbow bends the lower part the same way.
export type JointName =
  | 'neck'
  | 'shoulderL'
  | 'shoulderR'
  | 'elbowL'
  | 'elbowR'
  | 'hipL'
  | 'hipR'
  | 'kneeL'
  | 'kneeR'

export type CharacterRig = {
  root: Group
  joints: Record<JointName, Group>
}

export type PartSize = {
  width: number
  height: number
  depth: number
}

export type Position = {
  x: number
  y: number
  z: number
}
