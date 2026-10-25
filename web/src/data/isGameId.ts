import type { GameId } from './game'
import { listGameIds } from './listGameIds'

// A type guard for a game id taken from the address bar. It only looks at the
// list of ids, so checking an address never builds any fatality.
export function isGameId(value: string): value is GameId {
  return (listGameIds() as string[]).includes(value)
}
