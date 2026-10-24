import { createFatalities } from '../data/createFatalities'
import { isFatalityId } from '../data/isFatalityId'
import { listGames } from '../data/listGames'
import type { Route } from './route'

// Design: turn whatever is in the address bar into a route, and never fail: an
// empty, unknown, or mistyped hash (or an id or game that does not exist) falls
// back to the list, so a bad or stale link shows something useful instead of a
// broken page.
export function parseRoute(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#/, '').split('?')
  const [, section, id] = path.split('/')

  if (section === 'fatality' && id && isFatalityId(id)) {
    return { name: 'fatality', id }
  }

  const game = new URLSearchParams(query).get('game')
  const known = game !== null && listGames(createFatalities()).includes(game)
  return { name: 'list', game: known ? game : null }
}
