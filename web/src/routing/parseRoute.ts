import { isFatalityId } from '../data/isFatalityId'
import { isGameId } from '../data/isGameId'
import type { Route } from './route'

// Design: turn whatever is in the address bar into a route, and never fail: an
// empty, unknown, or mistyped hash (or an id or game that does not exist) falls
// back to the list, so a bad or stale link shows something useful instead of a
// broken page. It only checks ids against lists of ids, so parsing an address
// never builds any fatality.
export function parseRoute(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#/, '').split('?')
  const [, section, id] = path.split('/')

  if (section === 'fatality' && id && isFatalityId(id)) {
    return { name: 'fatality', id }
  }

  const game = new URLSearchParams(query).get('game')
  return { name: 'list', game: game !== null && isGameId(game) ? game : null }
}
