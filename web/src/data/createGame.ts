import type { Game, GameId } from './game'

// The names live in a function, not a module-level constant, so nothing global is
// shared; the `Record` type makes the compiler require a name for every id. They
// are placeholders, like the sample fatalities, and are replaced with the real
// games' titles without touching any link.
export function createGame(id: GameId): Game {
  const names: Record<GameId, string> = {
    'sample-game': 'Sample game (placeholder)',
    'second-sample-game': 'Second sample game (placeholder)',
  }
  return { id, name: names[id] }
}
