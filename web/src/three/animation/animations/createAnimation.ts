import type { Animation, AnimationId } from '../animationTypes'
import { createAnimationRepository } from './createAnimationRepository'

// The factory the scene repository exposes: look an animation up by its id.
export function createAnimation(id: AnimationId): Animation {
  return createAnimationRepository().create(id)
}
