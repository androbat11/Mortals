import { describe, expect, it, vi } from 'vitest'
import { tryCreate } from './tryCreate'

describe('tryCreate', () => {
  it('returns the created object', () => {
    expect(tryCreate(() => 'ok')).toBe('ok')
  })

  it('returns null and logs the error when creation throws', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const error = new Error('no WebGL')

    expect(
      tryCreate(() => {
        throw error
      }),
    ).toBeNull()
    expect(log).toHaveBeenCalledWith(error)
    log.mockRestore()
  })
})
