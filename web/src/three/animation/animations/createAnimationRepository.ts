import { createRepository } from '../../core/createRepository'
import type { Animation, AnimationId } from '../animationTypes'
import { createUppercutFinisher } from './createUppercutFinisher'

// Design: the registry of animations, keyed by animation id, made with the same
// `createRepository` as everything else. Typing it as `Record<AnimationId, ...>`
// makes the compiler require an entry for every id (and reject unknown ones), so
// a data entry's `animationId` always finds an animation. Adding an animation
// is one factory, one new id in `AnimationId`, and one line here; the compiler
// reports whichever step is missing.
export function createAnimationRepository() {
  return createRepository<Record<AnimationId, () => Animation>>({
    'uppercut-finisher': createUppercutFinisher,
  })
}
