import { describe, expect, it } from 'vitest'
import type { AnimationId } from '../animationTypes'
import { createAnimation } from './createAnimation'
import { createAnimationRepository } from './createAnimationRepository'

const ids: AnimationId[] = ['uppercut-finisher']

describe('animation registry', () => {
  it('returns an animation with the requested id for every registered id', () => {
    ids.forEach((id) => {
      expect(createAnimationRepository().create(id).id).toBe(id)
      expect(createAnimation(id).id).toBe(id)
    })
  })

  it('creates a new animation object on each lookup', () => {
    expect(createAnimation('uppercut-finisher')).not.toBe(
      createAnimation('uppercut-finisher'),
    )
  })
})
