import { describe, expect, it } from 'vitest'
import { createFatalities } from './createFatalities'
import { createGame } from './createGame'
import { filterByGame } from './filterByGame'
import type { GameId } from './game'
import { isGameId } from './isGameId'
import { listGameIds } from './listGameIds'
import { listGames } from './listGames'

describe('listGames', () => {
  it('lists each game once, in order of first appearance', () => {
    const games = listGames(createFatalities())
    expect(games.length).toBeGreaterThanOrEqual(2)
    expect(new Set(games.map((game) => game.id)).size).toBe(games.length)
    expect(games[0].id).toBe(createFatalities()[0].game.id)
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
    const shown = filterByGame(all, firstGame.id)
    expect(shown.length).toBeGreaterThan(0)
    expect(shown.length).toBeLessThan(all.length)
    shown.forEach((fatality) => expect(fatality.game.id).toBe(firstGame.id))
  })

  it('keeps every fatality in exactly one game', () => {
    const total = listGames(all).reduce(
      (count, game) => count + filterByGame(all, game.id).length,
      0,
    )
    expect(total).toBe(all.length)
  })

  it('returns nothing for an unknown game', () => {
    expect(filterByGame(all, 'no-such-game' as GameId)).toEqual([])
  })
})

describe('game ids', () => {
  it('lists every id once, and every id has a name', () => {
    const ids = listGameIds()
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => {
      expect(createGame(id).id).toBe(id)
      expect(createGame(id).name.trim()).not.toBe('')
    })
  })

  it('recognises real ids and rejects everything else', () => {
    expect(isGameId('sample-game')).toBe(true)
    expect(isGameId('Sample game (placeholder)')).toBe(false)
    expect(isGameId('')).toBe(false)
  })

  it('covers every game used by a fatality', () => {
    createFatalities().forEach((fatality) =>
      expect(isGameId(fatality.game.id)).toBe(true),
    )
  })
})
