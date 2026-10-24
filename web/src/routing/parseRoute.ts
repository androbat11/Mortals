import { isFatalityId } from '../data/isFatalityId'
import type { Route } from './route'

// Design: turn whatever is in the address bar into a route, and never fail: an
// empty, unknown, or mistyped hash (or an id that does not exist) is the list, so
// a bad link shows something useful instead of a broken page.
export function parseRoute(hash: string): Route {
  const [, section, id] = hash.replace(/^#/, '').split('/')

  if (section === 'fatality' && id && isFatalityId(id)) {
    return { name: 'fatality', id }
  }
  return { name: 'list' }
}
