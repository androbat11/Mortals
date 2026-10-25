import { useEffect, useRef } from 'react'
import { getPageKey } from '../routing/getPageKey'
import type { Route } from '../routing/route'

// Design: following a hash link does not behave like loading a page: the scroll
// position stays where it was, and keyboard and screen reader focus stays on the
// link that was clicked, which is no longer on the screen. So when the app moves
// to a different page, go to the top and move focus to the new page's heading
// (which has `tabIndex={-1}`, so it can take focus), and a screen reader reads it.
// It reacts to the page, not to the route object: choosing a game filter changes
// the route but not the page, so it must not scroll, and it must not run on the
// first render, where the browser restores the scroll position itself. The
// previous page is kept in a ref (not a skip-first flag), so React's StrictMode
// double run in development does not trigger it either.
export function useRouteChange(route: Route) {
  const pageKey = getPageKey(route)
  const previous = useRef(pageKey)

  useEffect(() => {
    if (previous.current === pageKey) return
    previous.current = pageKey
    window.scrollTo(0, 0)
    document.querySelector('h1')?.focus({ preventScroll: true })
  }, [pageKey])
}
