import type { FatalityId } from '../data/fatality'

// Design: type-first. The pages the app has are a closed union, so a route can
// only be the list or one fatality with a real id, and the compiler checks every
// place that handles a route.
export type Route =
  | { name: 'list' }
  | { name: 'fatality'; id: FatalityId }
