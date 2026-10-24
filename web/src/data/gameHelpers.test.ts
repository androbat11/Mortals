import { describe, expect, it } from 'vitest'
import { createFatalities } from './createFatalities'
import { filterByGame } from './filterByGame'
import { listGames } from './listGames'

describe('listGames', () => {
  it('lists each game once, in order of first appearance', () => {
    const games = listGames(createFatalities())
    expect(games.length).toBeGreaterThanOrEqual(2)
    expect(new Set(games).size).toBe(games.length)
    expect(games[0]).toBe(createFatalities()[0].game)
  })

  it('lists nothing for no fatalities', () => {
    expect(listGames([])).toEqual([])
  })
})

describe('filterByGame', () => {
  const all = createFatalities()
  const [firstGame] = listGames(all)

  it('returns everything for no filter', () => {
    expect(filterByGame(all, null)).toEqual(all)
  })

  it('returns only the fatalities of the chosen game', () => {
    const shown = filterByGame(all, firstGame)
    expect(shown.length).toBeGreaterThan(0)
    expect(shown.length).toBeLessThan(all.length)
    shown.forEach((fatality) => expect(fatality.game).toBe(firstGame))
  })

  it('keeps every fatality in exactly one game', () => {
    const total = listGames(all).reduce(
      (count, game) => count + filterByGame(all, game).length,
      0,
    )
    expect(total).toBe(all.length)
  })

  it('returns nothing for an unknown game', () => {
    expect(filterByGame(all, 'No such game')).toEqual([])
  })
})
