import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { createFatality } from '../data/createFatality'
import { useFatality } from './useFatality'

describe('useFatality', () => {
  it('returns the entry for the id', () => {
    const { result } = renderHook(() => useFatality('sample-uppercut'))
    expect(result.current).toEqual(createFatality('sample-uppercut'))
  })

  it('returns the same object across re-renders, so the page does not rebuild the scene', () => {
    const { result, rerender } = renderHook(() => useFatality('sample-uppercut'))
    const first = result.current

    rerender()

    expect(result.current).toBe(first)
  })
})
