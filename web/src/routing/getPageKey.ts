import type { Route } from './route'

// Which page a route shows, ignoring the choices made inside a page: choosing a
// game filter changes the route but is still the list page, so it must not count
// as moving to a new page. A fatality is its own page, per id.
export function getPageKey(route: Route): string {
  return route.name === 'fatality' ? `fatality:${route.id}` : 'list'
}
