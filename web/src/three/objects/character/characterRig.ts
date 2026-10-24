import type { Group } from 'three'

// Design: type-first. The shape of the character is defined before the code that
// builds it. The named joints are the contract with Phase 5: an animation
// rotates `joints.elbowL` and so on, without searching the scene for objects.
// "L" and "R" are the character's own left and right.
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
