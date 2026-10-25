import type { FatalityId } from '../data/fatality'
import type { GameId } from '../data/game'

// The only places a link is written. The routes use the URL hash, which works on
// any static host with no server rewrite rules and needs no dependency. The
// chosen game is part of the address (`#/?game=...`), so a filtered list can be
// shared and reloaded, and the back button works.
export function listHref(game: GameId | null = null) {
  return game === null ? '#/' : `#/?game=${encodeURIComponent(game)}`
}

export function fatalityHref(id: FatalityId) {
  return `#/fatality/${id}`
}
