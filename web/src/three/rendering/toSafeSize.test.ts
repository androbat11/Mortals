import { describe, expect, it } from 'vitest'
import { toSafeSize } from './toSafeSize'

describe('toSafeSize', () => {
  it('keeps a real size unchanged', () => {
    expect(toSafeSize(800, 600)).toEqual({ width: 800, height: 600 })
  })

  it('replaces a zero size so the aspect ratio is never NaN', () => {
    const { width, height } = toSafeSize(0, 0)
    expect(width / height).toBe(1)
  })
})
