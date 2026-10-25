import type { GameId } from './game'

// Every game id, in the order of the design's timeline filter. Writing them as
// the keys of a `Record<GameId, true>` makes the compiler require all of them, so
// this list cannot drift from the `GameId` type.
export function listGameIds(): GameId[] {
  const all: Record<GameId, true> = { mk11: true, mk1: true, mkx: true }
  return Object.keys(all) as GameId[]
}
