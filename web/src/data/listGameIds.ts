import type { GameId } from './game'

// Every game id. Writing them as the keys of a `Record<GameId, true>` makes the
// compiler require all of them (and reject unknown ones), so this list cannot
// drift from the `GameId` type.
export function listGameIds(): GameId[] {
  const all: Record<GameId, true> = {
    'sample-game': true,
    'second-sample-game': true,
  }
  return Object.keys(all) as GameId[]
}
