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

  it('has keyframes in increasing time order within the duration, for every registered animation', () => {
    ids.forEach((id) => {
      const animation = createAnimation(id)
      animation.tracks.forEach(({ keyframes }) => {
        const times = keyframes.map((keyframe) => keyframe.time)
        expect(times).toEqual([...times].sort((a, b) => a - b))
        expect(times[0]).toBeGreaterThanOrEqual(0)
        expect(times[times.length - 1]).toBeLessThanOrEqual(animation.duration)
      })
    })
  })

  it('creates a new animation object on each lookup', () => {
    expect(createAnimation('uppercut-finisher')).not.toBe(
      createAnimation('uppercut-finisher'),
    )
  })
})
