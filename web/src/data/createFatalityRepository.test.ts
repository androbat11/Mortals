import { describe, expect, it } from 'vitest'
import { createAnimation } from '../three/animation/animations/createAnimation'
import { createFatality } from './createFatality'
import { createFatalityRepository } from './createFatalityRepository'
import type { FatalityId } from './fatality'

const ids: FatalityId[] = ['sample-uppercut']

describe('fatality registry', () => {
  it('returns an entry with the requested id for every registered id', () => {
    ids.forEach((id) => {
      expect(createFatalityRepository().create(id).id).toBe(id)
      expect(createFatality(id).id).toBe(id)
    })
  })

  it('links every fatality to an animation that exists', () => {
    ids.forEach((id) => {
      const { animationId } = createFatality(id)
      expect(createAnimation(animationId).id).toBe(animationId)
    })
  })

  it('creates a new object on each lookup', () => {
    expect(createFatality('sample-uppercut')).not.toBe(
      createFatality('sample-uppercut'),
    )
  })
})
