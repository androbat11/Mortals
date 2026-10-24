import { describe, expect, it } from 'vitest'
import { clampDelta } from './clampDelta'

describe('clampDelta', () => {
  it('keeps normal frame deltas unchanged', () => {
    expect(clampDelta(0.016)).toBe(0.016)
  })

  it('clamps the long delta that follows a hidden tab', () => {
    expect(clampDelta(5)).toBe(0.1)
  })

  it('accepts a custom maximum', () => {
    expect(clampDelta(5, 0.5)).toBe(0.5)
  })
})
