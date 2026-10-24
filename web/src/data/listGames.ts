import type { Fatality } from './fatality'

// The distinct games of the given fatalities, in the order each first appears,
// so a new game shows up in the filter as soon as a fatality with that game is
// added, and the order is stable.
export function listGames(fatalities: Fatality[]): string[] {
  return [...new Set(fatalities.map((fatality) => fatality.game))]
}
