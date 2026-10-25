import SiteFooter from '../components/organisms/SiteFooter/SiteFooter'
import SiteHeader from '../components/organisms/SiteHeader/SiteHeader'
import SiteTemplate from '../components/templates/SiteTemplate/SiteTemplate'
import type { MoveKind } from '../data/move'
import { useMoveFilters } from '../hooks/useMoveFilters'
import { useRoute } from '../hooks/useRoute'
import { useRouteChange } from '../hooks/useRouteChange'
import AboutPage from './AboutPage'
import BrutalitiesPage from './BrutalitiesPage'
import FatalitiesPage from './FatalitiesPage'

// Design: chooses the page for the current route inside the site frame. A route is
// a closed union, so the compiler checks that every page is handled. The filters
// live here, above the pages, so the header search and the page's filters write to
// the same state and the search text survives a move between the two move pages.
// The About page has nothing to filter, so the header gets no search there.
function AppRoutes() {
  const route = useRoute()
  useRouteChange(route)
  const kind: MoveKind = route.name === 'brutalities' ? 'brutality' : 'fatality'
  const controls = useMoveFilters(kind)
  const search =
    route.name === 'about'
      ? undefined
      : { value: controls.filters.text, onChange: controls.setText }

  return (
    <SiteTemplate
      header={<SiteHeader current={route.name} search={search} />}
      footer={<SiteFooter />}
    >
      {route.name === 'about' && <AboutPage />}
      {route.name === 'fatalities' && <FatalitiesPage controls={controls} />}
      {route.name === 'brutalities' && <BrutalitiesPage controls={controls} />}
    </SiteTemplate>
  )
}

export default AppRoutes
