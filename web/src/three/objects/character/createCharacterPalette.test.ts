import { describe, expect, it } from 'vitest'
import { createCharacterPalette } from './createCharacterPalette'

describe('createCharacterPalette', () => {
  it('has three distinct colours', () => {
    const { skin, outfit, accent } = createCharacterPalette()
    expect(new Set([skin, outfit, accent]).size).toBe(3)
  })

  it('returns a new object each time', () => {
    expect(createCharacterPalette()).not.toBe(createCharacterPalette())
  })
})
