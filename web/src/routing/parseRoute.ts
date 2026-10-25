import type { Route } from './route'

// Design: turn whatever is in the address bar into a route, and never fail: an
// empty, unknown, or mistyped hash is the About page (the landing screen), so a
// bad or stale link shows something useful instead of a broken page.
export function parseRoute(hash: string): Route {
  const [, section] = hash.replace(/^#/, '').split('?')[0].split('/')

  if (section === 'fatalities') return { name: 'fatalities' }
  if (section === 'brutalities') return { name: 'brutalities' }
  return { name: 'about' }
}
