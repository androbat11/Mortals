import { describe, expect, it } from 'vitest'
import { createAnimation } from '../three/animation/animations/createAnimation'
import { countAllMoves, countMoves } from './countMoves'
import { createEmptyFilters } from './createEmptyFilters'
import { createFighterEntries } from './createFighterEntries'
import { filterEntries } from './filterEntries'
import { listCategories } from './listCategories'
import { listGamesWithMoves } from './listGamesWithMoves'
import { toInputSteps } from './toInputSteps'

const entries = createFighterEntries()
const moves = entries.flatMap((entry) => entry.moves)

describe('the archive data', () => {
  it('has fighters in the registry order, each listed once', () => {
    const ids = entries.map((entry) => entry.fighter.id)
    expect(ids[0]).toBe('scorpion')
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every move a unique id, its fighter, and a real animation', () => {
    expect(new Set(moves.map((move) => move.id)).size).toBe(moves.length)
    entries.forEach((entry) =>
      entry.moves.forEach((move) => {
        expect(move.fighter).toBe(entry.fighter.id)
        expect(createAnimation(move.animationId).id).toBe(move.animationId)
      }),
    )
  })

  it('has non-empty text and an input for every move', () => {
    moves.forEach((move) => {
      expect(move.name.trim()).not.toBe('')
      expect(move.description.trim()).not.toBe('')
      expect(move.category.trim()).not.toBe('')
      expect(move.input.length).toBeGreaterThan(0)
      expect(move.games.length).toBeGreaterThan(0)
    })
  })

  it('gives every brutality a trigger and no fatality one', () => {
    moves.forEach((move) =>
      expect(move.trigger !== null).toBe(move.kind === 'brutality'),
    )
  })

  it('ends every fatality input with an attack button', () => {
    moves
      .filter((move) => move.kind === 'fatality')
      .forEach((move) => expect(move.input.at(-1)?.type).toBe('button'))
  })

  it('marks every move as unverified until it is checked against the games', () => {
    moves.forEach((move) => expect(move.unverified).toBe(true))
  })

  it('has between five and eight fighters, as the mission scopes the MVP', () => {
    expect(entries.length).toBeGreaterThanOrEqual(5)
    expect(entries.length).toBeLessThanOrEqual(8)
  })
})

describe('toInputSteps', () => {
  it('turns arrows into directions, 1 to 4 into buttons, and the rest into labels', () => {
    expect(toInputSteps(['↓', '←', '2', '+', 'AMPLIFY (R1/RB)'])).toEqual([
      { type: 'direction', direction: 'down' },
      { type: 'direction', direction: 'left' },
      { type: 'button', button: '2' },
      { type: 'label', text: '+' },
      { type: 'label', text: 'AMPLIFY (R1/RB)' },
    ])
  })
})

describe('filterEntries', () => {
  it('returns only the moves of the chosen kind, grouped by fighter', () => {
    const fatalities = filterEntries(entries, 'fatality', createEmptyFilters())
    fatalities.forEach((entry) =>
      entry.moves.forEach((move) => expect(move.kind).toBe('fatality')),
    )
    expect(fatalities.length).toBeLessThanOrEqual(entries.length)
  })

  it('leaves out a fighter with no matching move (Raiden has no fatalities)', () => {
    const names = filterEntries(entries, 'fatality', createEmptyFilters()).map(
      (entry) => entry.fighter.id,
    )
    expect(names).not.toContain('raiden')
    expect(
      filterEntries(entries, 'brutality', createEmptyFilters()).map((e) => e.fighter.id),
    ).toContain('raiden')
  })

  it('searches the fighter, the move, the description, and the input, ignoring case', () => {
    const search = (text: string) =>
      filterEntries(entries, 'fatality', { ...createEmptyFilters(), text })
        .flatMap((entry) => entry.moves)
        .map((move) => move.name)

    expect(search('scorpion')).toContain("You're Next")
    expect(search('ROYAL EXECUTION')).toEqual(['Royal Execution'])
    expect(search('katana')).toContain("You're Next")
    expect(search('nothing matches this')).toEqual([])
  })

  it('filters by game, including moves that come from several games', () => {
    const mk1 = filterEntries(entries, 'brutality', {
      ...createEmptyFilters(),
      game: 'mk1',
    }).flatMap((entry) => entry.moves)

    expect(mk1.length).toBeGreaterThan(0)
    mk1.forEach((move) => expect(move.games).toContain('mk1'))
  })

  it('filters by category and combines every filter', () => {
    const close = filterEntries(entries, 'fatality', {
      ...createEmptyFilters(),
      category: 'Close',
    }).flatMap((entry) => entry.moves)
    close.forEach((move) => expect(move.category).toBe('Close'))

    const none = filterEntries(entries, 'fatality', {
      text: 'royal',
      game: 'mkx',
      category: 'Close',
    })
    expect(none).toEqual([])
  })
})

describe('listings and counts', () => {
  it('lists the categories of each kind without repeats', () => {
    const ranges = listCategories(entries, 'fatality')
    expect(new Set(ranges).size).toBe(ranges.length)
    expect(ranges).toEqual(expect.arrayContaining(['Close', 'Mid', 'Far']))
    expect(listCategories(entries, 'brutality')).toContain('Combo Finisher')
  })

  it('lists only the games that have a move of the kind, in timeline order', () => {
    const ids = listGamesWithMoves(entries, 'fatality').map((game) => game.id)
    expect(ids).toEqual(['mk11', 'mk1'])
    expect(listGamesWithMoves(entries, 'brutality').map((g) => g.id)).toContain('mkx')
  })

  it('counts a fighter\'s moves and the total of each kind', () => {
    const scorpion = entries[0]
    expect(countMoves(scorpion, 'fatality')).toBe(3)
    expect(countMoves(scorpion, 'brutality')).toBe(3)
    expect(countAllMoves(entries, 'fatality') + countAllMoves(entries, 'brutality')).toBe(
      moves.length,
    )
  })
})
