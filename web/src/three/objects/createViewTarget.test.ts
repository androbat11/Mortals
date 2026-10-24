import { Box3, Vector3 } from 'three'
import { describe, expect, it } from 'vitest'
import { createCharacter } from './character/createCharacter'
import { createViewTarget } from './createViewTarget'

describe('createViewTarget', () => {
  it('is the centre of the character, above the ground origin', () => {
    const { root } = createCharacter()
    root.updateMatrixWorld(true)
    const centre = new Box3().setFromObject(root).getCenter(new Vector3())
    const target = createViewTarget()

    expect(target.x).toBeCloseTo(0)
    expect(target.z).toBeCloseTo(0)
    expect(target.y).toBeCloseTo(centre.y)
  })

  it('returns a new vector each time, so one caller cannot move another\'s target', () => {
    expect(createViewTarget()).not.toBe(createViewTarget())
  })
})
