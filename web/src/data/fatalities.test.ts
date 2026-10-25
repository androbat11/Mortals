import { describe, expect, it } from 'vitest'
import { createAnimation } from '../three/animation/animations/createAnimation'
import { createFatalities } from './createFatalities'

describe('every registered fatality', () => {
  const fatalities = createFatalities()

  it('is well formed: non-empty text and at least one non-empty tutorial step', () => {
    fatalities.forEach((fatality) => {
      expect(fatality.name.trim()).not.toBe('')
      expect(fatality.game.name.trim()).not.toBe('')
      expect(fatality.description.trim()).not.toBe('')
      expect(fatality.tutorialSteps.length).toBeGreaterThan(0)
      fatality.tutorialSteps.forEach((step) => expect(step.trim()).not.toBe(''))
    })
  })

  it('is labelled as sample data until real content replaces it', () => {
    fatalities.forEach((fatality) => {
      expect(fatality.game.name.toLowerCase()).toContain('sample')
      expect(fatality.description.toLowerCase()).toContain('sample')
    })
  })

  it('points at an animation that exists, and no two share one', () => {
    fatalities.forEach((fatality) =>
      expect(createAnimation(fatality.animationId).id).toBe(fatality.animationId),
    )
    const animationIds = fatalities.map((fatality) => fatality.animationId)
    expect(new Set(animationIds).size).toBe(animationIds.length)
  })

  it('has unique names', () => {
    const names = fatalities.map((fatality) => fatality.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('covers at least two games, so there is something to filter by', () => {
    expect(new Set(fatalities.map((fatality) => fatality.game.id)).size).toBeGreaterThanOrEqual(2)
  })
})
