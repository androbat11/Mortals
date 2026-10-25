import type { GameId } from './game'

// What the user has chosen to narrow the archive: free text, a game, and a
// category (a range for fatalities, a class for brutalities). `null` means "all".
export type MoveFilters = {
  text: string
  game: GameId | null
  category: string | null
}
