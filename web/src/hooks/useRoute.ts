import { useMemo, useSyncExternalStore } from 'react'
import { parseRoute } from '../routing/parseRoute'
import type { Route } from '../routing/route'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

// Design: the current route is state that lives outside React (the address bar),
// so it is read with `useSyncExternalStore`, which re-renders when the hash
// changes and cleans its listener up. The hash string is the snapshot; the route
// is derived from it, so the same hash gives the same route object.
export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getHash)
  return useMemo(() => parseRoute(hash), [hash])
}
