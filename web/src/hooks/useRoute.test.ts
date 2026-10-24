import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useRoute } from './useRoute'

afterEach(() => {
  window.location.hash = ''
})

describe('useRoute', () => {
  it('reads the current hash', () => {
    window.location.hash = '#/fatality/sample-uppercut'
    const { result } = renderHook(() => useRoute())
    expect(result.current).toEqual({ name: 'fatality', id: 'sample-uppercut' })
  })

  it('is the list for an empty hash', () => {
    const { result } = renderHook(() => useRoute())
    expect(result.current).toEqual({ name: 'list' })
  })

  it('follows the hash when it changes', () => {
    const { result } = renderHook(() => useRoute())

    act(() => {
      window.location.hash = '#/fatality/sample-uppercut'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(result.current).toEqual({ name: 'fatality', id: 'sample-uppercut' })
  })

  it('keeps the same route object while the hash does not change', () => {
    const { result, rerender } = renderHook(() => useRoute())
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })
})
