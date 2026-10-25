import type { Fatality } from './fatality'
import type { GameId } from './game'

// `null` means no filter (everything); otherwise only that game's fatalities.
export function filterByGame(
  fatalities: Fatality[],
  game: GameId | null,
): Fatality[] {
  return game === null
    ? fatalities
    : fatalities.filter((fatality) => fatality.game.id === game)
}
