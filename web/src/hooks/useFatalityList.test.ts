import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { createFatalities } from '../data/createFatalities'
import { listGames } from '../data/listGames'
import { useFatalityList } from './useFatalityList'

describe('useFatalityList', () => {
  const all = createFatalities()

  it('returns every game and every fatality when there is no filter', () => {
    const { result } = renderHook(() => useFatalityList(null))
    expect(result.current.games).toEqual(listGames(all))
    expect(result.current.fatalities).toHaveLength(all.length)
  })

  it('returns only the chosen game\'s fatalities but still every game', () => {
    const [game] = listGames(all)
    const { result } = renderHook(() => useFatalityList(game))

    expect(result.current.games).toEqual(listGames(all))
    result.current.fatalities.forEach((fatality) => expect(fatality.game).toBe(game))
    expect(result.current.fatalities.length).toBeLessThan(all.length)
  })

  it('returns the same result across re-renders for the same game', () => {
    const { result, rerender } = renderHook(() => useFatalityList(null))
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })
})
