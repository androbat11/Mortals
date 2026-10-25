import type { MoveKind } from './move'

// The status line over the cards ("Showing 3 of 8 fatalities"). It is plain text
// logic, so the wording is tested apart from the screen.
export function describeMatches(shown: number, total: number, kind: MoveKind): string {
  const noun = kind === 'fatality' ? 'fatalities' : 'brutalities'
  if (shown === 0) return `No ${noun} match your search.`
  return `Showing ${shown} of ${total} ${noun}`
}
