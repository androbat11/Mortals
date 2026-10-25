import type { FighterEntry } from './fighterEntry'
import type { Move, MoveKind } from './move'
import type { MoveFilters } from './moveFilters'

function inputText(move: Move): string {
  return move.input
    .map((step) => {
      if (step.type === 'label') return step.text
      if (step.type === 'button') return step.button
      return step.direction
    })
    .join(' ')
}

function matchesText(entry: FighterEntry, move: Move, text: string): boolean {
  const query = text.trim().toLowerCase()
  if (query === '') return true
  const { fighter } = entry
  const haystack = [
    fighter.name,
    fighter.title,
    fighter.alias,
    move.name,
    move.description,
    move.category,
    move.gameTag,
    move.trigger ?? '',
    inputText(move),
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}

// The moves of one kind that match the filters, grouped by fighter, in roster
// order; a fighter with no matching move is left out. Text matches the fighter,
// the move, its category, its trigger, and its input; a game matches any game the
// move comes from; a category must match exactly.
export function filterEntries(
  entries: FighterEntry[],
  kind: MoveKind,
  filters: MoveFilters,
): FighterEntry[] {
  return entries
    .map((entry) => ({
      ...entry,
      moves: entry.moves.filter(
        (move) =>
          move.kind === kind &&
          matchesText(entry, move, filters.text) &&
          (filters.game === null || move.games.includes(filters.game)) &&
          (filters.category === null || move.category === filters.category),
      ),
    }))
    .filter((entry) => entry.moves.length > 0)
}
