import type { AnimationId } from '../three/animation/animationTypes'

// Design: type-first, and a fatality is plain data. The ids are a closed union
// (like `AnimationId`), so a mistyped id is a compile error and the registry can
// be required to have an entry for every one. Adding a fatality means adding an
// id here, a factory, and one line in the registry; nothing in the 3D code or
// the UI changes, which is what "a new fatality is data plus an animation" means.
export type FatalityId =
  | 'sample-uppercut'
  | 'sample-sweep-kick'
  | 'sample-overhead-smash'

// A tutorial always has at least one step (the mission says every fatality has
// a tutorial), so the list is typed as non-empty: an entry without steps does
// not compile.
export type TutorialSteps = [string, ...string[]]

export type Fatality = {
  id: FatalityId
  name: string
  game: string
  description: string
  tutorialSteps: TutorialSteps
  // Which animation plays for this fatality; the compiler checks it exists.
  animationId: AnimationId
}
