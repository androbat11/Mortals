import { useRoute } from '../hooks/useRoute'
import { useScrollToTop } from '../hooks/useScrollToTop'
import FatalityListPage from './FatalityListPage'
import FatalityPage from './FatalityPage'

// Design: chooses the page for the current route. A route is a closed union, so
// the compiler checks that every page is handled. The fatality page is keyed by
// its id, so going from one fatality to another builds a fresh page (and scene)
// instead of reusing the old one.
function AppRoutes() {
  const route = useRoute()
  useScrollToTop(route)

  if (route.name === 'fatality') {
    return <FatalityPage key={route.id} fatalityId={route.id} />
  }
  return <FatalityListPage />
}

export default AppRoutes
