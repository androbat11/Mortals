import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useRoute } from './useRoute'

afterEach(() => {
  window.location.hash = ''
})

describe('useRoute', () => {
  it('reads the current hash', () => {
    window.location.hash = '#/brutalities'
    const { result } = renderHook(() => useRoute())
    expect(result.current).toEqual({ name: 'brutalities' })
  })

  it('is the About page for an empty hash', () => {
    const { result } = renderHook(() => useRoute())
    expect(result.current).toEqual({ name: 'about' })
  })

  it('follows the hash when it changes', () => {
    const { result } = renderHook(() => useRoute())

    act(() => {
      window.location.hash = '#/brutalities'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(result.current).toEqual({ name: 'brutalities' })
  })

  it('keeps the same route object while the hash does not change', () => {
    const { result, rerender } = renderHook(() => useRoute())
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })
})
