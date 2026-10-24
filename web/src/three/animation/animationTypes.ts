import type { JointName } from '../objects/character/characterRig'

// Design: type-first, and an animation is plain data. It names the joints it
// moves (the same `JointName`s the rig exposes), so the compiler rejects a track
// for a joint that does not exist, and a new fatality is a new value of this
// type, not new code. Rotations are Euler angles in radians; see
// `characterRig.ts` for which sign swings a limb forward.
export type Rotation = {
  x: number
  y: number
  z: number
}

// An axis left out of a keyframe is 0, so a keyframe only lists what it moves.
export type Keyframe = {
  time: number
  rotation: Partial<Rotation>
}

export type JointTrack = {
  joint: JointName
  keyframes: Keyframe[]
}

// The ids are a closed union so a typo cannot select a missing animation, and
// so a future data entry's `animationId` is checked by the compiler.
export type AnimationId = 'uppercut-finisher'

export type Animation = {
  id: AnimationId
  duration: number
  tracks: JointTrack[]
}

// What an evaluation returns: the rotation of every joint that has a track.
export type Pose = Partial<Record<JointName, Rotation>>
