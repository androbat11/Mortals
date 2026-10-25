import type { Fatality } from './fatality'
import type { Game } from './game'

// The distinct games of the given fatalities, in the order each first appears,
// so a new game shows up in the filter as soon as a fatality with that game is
// added, and the order is stable. Games are told apart by id.
export function listGames(fatalities: Fatality[]): Game[] {
  const games = new Map<string, Game>()
  fatalities.forEach(({ game }) => {
    if (!games.has(game.id)) games.set(game.id, game)
  })
  return [...games.values()]
}
