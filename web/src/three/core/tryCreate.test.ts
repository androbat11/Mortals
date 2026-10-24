import { describe, expect, it } from 'vitest'
import { tryCreate } from './tryCreate'

describe('tryCreate', () => {
  it('returns the created object', () => {
    expect(tryCreate(() => 'ok')).toBe('ok')
  })

  it('returns null when creation throws', () => {
    expect(
      tryCreate(() => {
        throw new Error('no WebGL')
      }),
    ).toBeNull()
  })
})
