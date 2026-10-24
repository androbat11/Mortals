import type { Fatality } from './fatality'

// `null` means no filter (everything); otherwise only that game's fatalities. An
// unknown game gives an empty list, which callers avoid by only passing games
// that exist.
export function filterByGame(
  fatalities: Fatality[],
  game: string | null,
): Fatality[] {
  return game === null
    ? fatalities
    : fatalities.filter((fatality) => fatality.game === game)
}
