import type { Game, GameId } from './game'

// The display names live in a function, not a module-level constant, so nothing
// global is shared; the `Record` type makes the compiler require a name for every
// id.
export function createGame(id: GameId): Game {
  const names: Record<GameId, string> = {
    mk1: 'Mortal Kombat 1',
    mk11: 'Mortal Kombat 11',
    mkx: 'Mortal Kombat X',
  }
  return { id, name: names[id] }
}
