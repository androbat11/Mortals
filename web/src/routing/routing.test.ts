import { describe, expect, it } from 'vitest'
import { createFatalities } from '../data/createFatalities'
import { listGames } from '../data/listGames'
import { fatalityHref, listHref } from './hrefs'
import { parseRoute } from './parseRoute'

describe('parseRoute', () => {
  it('treats an empty or root hash as the list', () => {
    expect(parseRoute('')).toEqual({ name: 'list', game: null })
    expect(parseRoute('#')).toEqual({ name: 'list', game: null })
    expect(parseRoute('#/')).toEqual({ name: 'list', game: null })
  })

  it('parses a fatality route with a real id', () => {
    expect(parseRoute('#/fatality/sample-uppercut')).toEqual({
      name: 'fatality',
      id: 'sample-uppercut',
    })
  })

  it('falls back to the list for an unknown id, a missing id, or junk', () => {
    expect(parseRoute('#/fatality/nope')).toEqual({ name: 'list', game: null })
    expect(parseRoute('#/fatality/')).toEqual({ name: 'list', game: null })
    expect(parseRoute('#/fatality')).toEqual({ name: 'list', game: null })
    expect(parseRoute('#/something/else')).toEqual({ name: 'list', game: null })
  })
})

describe('parseRoute with a game filter', () => {
  const [game] = listGames(createFatalities())

  it('reads a known game from the address', () => {
    expect(parseRoute(`#/?game=${encodeURIComponent(game)}`)).toEqual({
      name: 'list',
      game,
    })
  })

  it('ignores an unknown or empty game', () => {
    expect(parseRoute('#/?game=No%20such%20game')).toEqual({ name: 'list', game: null })
    expect(parseRoute('#/?game=')).toEqual({ name: 'list', game: null })
    expect(parseRoute('#/?other=1')).toEqual({ name: 'list', game: null })
  })

  it('still opens a fatality when the address also has a query', () => {
    expect(parseRoute('#/fatality/sample-uppercut?game=x')).toEqual({
      name: 'fatality',
      id: 'sample-uppercut',
    })
  })
})

describe('hrefs', () => {
  it('writes the list with and without a game', () => {
    expect(listHref()).toBe('#/')
    expect(listHref(null)).toBe('#/')
    expect(listHref('A & B')).toBe('#/?game=A%20%26%20B')
  })

  it('round-trips a game with special characters through parseRoute', () => {
    const [game] = listGames(createFatalities())
    expect(parseRoute(listHref(game))).toEqual({ name: 'list', game })
  })

  it('round-trips through parseRoute', () => {
    expect(parseRoute(listHref())).toEqual({ name: 'list', game: null })
    expect(parseRoute(fatalityHref('sample-uppercut'))).toEqual({
      name: 'fatality',
      id: 'sample-uppercut',
    })
  })
})
