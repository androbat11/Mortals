import { Timer } from 'three'
import { describe, expect, it } from 'vitest'
import { createTimer } from './createTimer'

describe('createTimer', () => {
  it('returns a new timer each time', () => {
    const timer = createTimer()
    expect(timer).toBeInstanceOf(Timer)
    expect(createTimer()).not.toBe(timer)
  })
})
