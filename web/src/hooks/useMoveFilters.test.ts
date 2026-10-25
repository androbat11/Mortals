import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { MoveKind } from '../data/move'
import { useMoveFilters } from './useMoveFilters'

const render = () =>
  renderHook(({ kind }: { kind: MoveKind }) => useMoveFilters(kind), {
    initialProps: { kind: 'fatality' as MoveKind },
  })

describe('useMoveFilters', () => {
  it('starts with no filter', () => {
    const { result } = render()
    expect(result.current.filters).toEqual({ text: '', game: null, category: null })
  })

  it('sets each filter on its own and clears them all', () => {
    const { result } = render()

    act(() => result.current.setText('scorpion'))
    act(() => result.current.setGame('mk11'))
    act(() => result.current.setCategory('Close'))
    expect(result.current.filters).toEqual({
      text: 'scorpion',
      game: 'mk11',
      category: 'Close',
    })

    act(() => result.current.clear())
    expect(result.current.filters).toEqual({ text: '', game: null, category: null })
  })

  it('keeps the search text but drops the game and category on the other kind', () => {
    const { result, rerender } = render()
    act(() => result.current.setText('sub'))
    act(() => result.current.setGame('mk1'))
    act(() => result.current.setCategory('Far'))

    rerender({ kind: 'brutality' })

    expect(result.current.filters).toEqual({ text: 'sub', game: null, category: null })
  })

  it('returns the same filters object while nothing changes', () => {
    const { result, rerender } = render()
    const before = result.current.filters
    rerender({ kind: 'fatality' })
    expect(result.current.filters).toBe(before)
  })
})
