import type { Route } from './route'

// Which page a route shows. With one route per page this is the route's name; it
// stays a function so a route that carries a choice inside a page can ignore that
// choice, and a move to another page is the only thing that counts as a page
// change (for scrolling to the top and moving focus).
export function getPageKey(route: Route): string {
  return route.name
}
