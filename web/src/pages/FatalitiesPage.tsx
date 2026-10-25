import ArchiveTemplate from '../components/templates/ArchiveTemplate/ArchiveTemplate'
import MoveArchive from '../components/organisms/MoveArchive/MoveArchive'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { MoveFilterControls } from '../hooks/useMoveFilters'

type FatalitiesPageProps = {
  controls: MoveFilterControls
}

// Design: a page only composes: the template with this page's words, and the
// archive for fatalities. The filters come from `AppRoutes`, so the header search
// and the page filters share one state.
function FatalitiesPage({ controls }: FatalitiesPageProps) {
  useDocumentTitle('Fatalities - Mortals')
  return (
    <ArchiveTemplate
      title="Fatalities"
      intro="The finishing moves, by fighter. Press Play on a card to watch our animated preview, then read the input."
    >
      <MoveArchive kind="fatality" controls={controls} />
    </ArchiveTemplate>
  )
}

export default FatalitiesPage
