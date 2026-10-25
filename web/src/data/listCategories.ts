import type { FighterEntry } from './fighterEntry'
import type { MoveKind } from './move'

// The distinct categories of one kind of move (the ranges of the fatalities, or
// the classes of the brutalities), in the order they first appear, for the
// filter chips.
export function listCategories(entries: FighterEntry[], kind: MoveKind): string[] {
  const categories = new Set<string>()
  entries.forEach((entry) =>
    entry.moves
      .filter((move) => move.kind === kind)
      .forEach((move) => categories.add(move.category)),
  )
  return [...categories]
}
