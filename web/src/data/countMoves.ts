import type { FighterEntry } from './fighterEntry'
import type { MoveKind } from './move'

// How many moves of one kind a fighter has, for the roster and the About cards.
export function countMoves(entry: FighterEntry, kind: MoveKind): number {
  return entry.moves.filter((move) => move.kind === kind).length
}

// How many moves of one kind there are in all, for the stat boxes.
export function countAllMoves(entries: FighterEntry[], kind: MoveKind): number {
  return entries.reduce((total, entry) => total + countMoves(entry, kind), 0)
}
