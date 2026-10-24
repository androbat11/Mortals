import { describe, expect, it } from 'vitest'
import { createCharacter } from '../objects/character/createCharacter'
import type { Animation } from './animationTypes'
import { createAnimationPlayer } from './createAnimationPlayer'

// The shoulder rotates from 0 to -2 over 2 seconds, so its angle is -time.
const animation: Animation = {
  id: 'uppercut-finisher',
  duration: 2,
  tracks: [
    {
      joint: 'shoulderR',
      keyframes: [
        { time: 0, rotation: { x: 0 } },
        { time: 2, rotation: { x: -2 } },
      ],
    },
  ],
}

describe('createAnimationPlayer', () => {
  it('advances by the delta and applies the pose for that time', () => {
    const rig = createCharacter()
    const update = createAnimationPlayer(rig, animation)

    update(0.5)
    expect(rig.joints.shoulderR.rotation.x).toBeCloseTo(-0.5)

    update(0.5)
    expect(rig.joints.shoulderR.rotation.x).toBeCloseTo(-1)
  })

  it('keeps the pose when no time passes', () => {
    const rig = createCharacter()
    const update = createAnimationPlayer(rig, animation)
    update(1)

    update(0)

    expect(rig.joints.shoulderR.rotation.x).toBeCloseTo(-1)
  })

  it('loops back to the start after the duration', () => {
    const rig = createCharacter()
    const update = createAnimationPlayer(rig, animation)

    update(2.5)

    expect(rig.joints.shoulderR.rotation.x).toBeCloseTo(-0.5)
  })

  it('keeps each player\'s time separate', () => {
    const rig = createCharacter()
    const first = createAnimationPlayer(rig, animation)
    const second = createAnimationPlayer(rig, animation)

    first(1)
    second(0.25)

    expect(rig.joints.shoulderR.rotation.x).toBeCloseTo(-0.25)
  })

  it('ignores a non-finite delta and keeps playing afterwards', () => {
    const rig = createCharacter()
    const update = createAnimationPlayer(rig, animation)
    update(0.5)

    update(Number.NaN)
    update(0.5)

    expect(rig.joints.shoulderR.rotation.x).toBeCloseTo(-1)
  })

  it('does not break on an animation with no duration', () => {
    const rig = createCharacter()
    const update = createAnimationPlayer(rig, { ...animation, duration: 0 })

    expect(() => update(1)).not.toThrow()
    expect(rig.joints.shoulderR.rotation.x).toBeCloseTo(0)
  })
})
