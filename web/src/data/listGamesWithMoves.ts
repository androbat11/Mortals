import { createGame } from './createGame'
import type { FighterEntry } from './fighterEntry'
import type { Game } from './game'
import { listGameIds } from './listGameIds'
import type { MoveKind } from './move'

// The games that at least one move of this kind comes from, in the order of the
// timeline filter, so the filter never offers a game that would show nothing.
export function listGamesWithMoves(
  entries: FighterEntry[],
  kind: MoveKind,
): Game[] {
  const used = new Set(
    entries.flatMap((entry) =>
      entry.moves.filter((move) => move.kind === kind).flatMap((move) => move.games),
    ),
  )
  return listGameIds()
    .filter((id) => used.has(id))
    .map(createGame)
}
