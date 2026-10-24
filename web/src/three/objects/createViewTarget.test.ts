import { describe, expect, it } from 'vitest'
import { createViewTarget } from './createViewTarget'

describe('createViewTarget', () => {
  it('is at the character\'s chest height above the ground origin', () => {
    const { x, y, z } = createViewTarget()
    expect([x, z]).toEqual([0, 0])
    expect(y).toBeGreaterThan(0.5)
    expect(y).toBeLessThan(1.8)
  })

  it('returns a new vector each time, so one caller cannot move another\'s target', () => {
    expect(createViewTarget()).not.toBe(createViewTarget())
  })
})
