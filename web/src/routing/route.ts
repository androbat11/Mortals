import type { FatalityId } from '../data/fatality'

// Design: type-first. The pages the app has are a closed union, so a route can
// only be the list (optionally narrowed to one game, `null` meaning all games) or
// one fatality with a real id, and the compiler checks every place that handles
// a route.
export type Route =
  | { name: 'list'; game: string | null }
  | { name: 'fatality'; id: FatalityId }
