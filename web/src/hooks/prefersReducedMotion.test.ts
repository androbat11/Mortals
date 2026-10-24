import { afterEach, describe, expect, it, vi } from 'vitest'
import { prefersReducedMotion } from './prefersReducedMotion'

afterEach(() => vi.unstubAllGlobals())

describe('prefersReducedMotion', () => {
  it('is false when the browser cannot answer', () => {
    expect(prefersReducedMotion()).toBe(false)
  })

  it('follows the reduced-motion media query', () => {
    const matchMedia = vi.fn((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
    }))
    vi.stubGlobal('matchMedia', matchMedia)

    expect(prefersReducedMotion()).toBe(true)
    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })
})
