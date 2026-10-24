import { describe, expect, it } from 'vitest'
import { clampPixelRatio } from './clampPixelRatio'

describe('clampPixelRatio', () => {
  it('keeps ratios at or below the cap', () => {
    expect(clampPixelRatio(1)).toBe(1)
    expect(clampPixelRatio(2)).toBe(2)
  })

  it('caps high-density ratios at 2', () => {
    expect(clampPixelRatio(3)).toBe(2)
  })
})
