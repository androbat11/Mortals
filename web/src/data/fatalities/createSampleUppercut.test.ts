import { describe, expect, it } from 'vitest'
import { createAnimation } from '../../three/animation/animations/createAnimation'
import { createSampleUppercut } from './createSampleUppercut'

describe('createSampleUppercut', () => {
  const fatality = createSampleUppercut()

  it('has a non-empty name, game, and description', () => {
    expect(fatality.name.trim()).not.toBe('')
    expect(fatality.game.name.trim()).not.toBe('')
    expect(fatality.description.trim()).not.toBe('')
  })

  it('has at least one tutorial step and every step is non-empty', () => {
    expect(fatality.tutorialSteps.length).toBeGreaterThan(0)
    fatality.tutorialSteps.forEach((step) => expect(step.trim()).not.toBe(''))
  })

  it('says it is sample data and claims no real game', () => {
    expect(fatality.game.name.toLowerCase()).toContain('sample')
    expect(fatality.description.toLowerCase()).toContain('sample')
  })

  it('points at an animation that exists', () => {
    expect(createAnimation(fatality.animationId).id).toBe(fatality.animationId)
  })

  it('returns a new object each time', () => {
    expect(createSampleUppercut()).not.toBe(createSampleUppercut())
  })
})
