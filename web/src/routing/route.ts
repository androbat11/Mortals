// Design: type-first. The pages of the archive are a closed union, so a route can
// only be one of them and the compiler checks every place that handles a route.
export type Route =
  | { name: 'about' }
  | { name: 'fatalities' }
  | { name: 'brutalities' }
