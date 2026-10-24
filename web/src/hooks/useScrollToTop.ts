import { useEffect } from 'react'
import type { Route } from '../routing/route'

// Following a hash link does not scroll to the top of the new page, so go there
// when the route changes. Without it, opening a fatality from the middle of the
// list would show the middle of the page.
export function useScrollToTop(route: Route) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])
}
