import ArchiveTemplate from '../components/templates/ArchiveTemplate/ArchiveTemplate'
import MoveArchive from '../components/organisms/MoveArchive/MoveArchive'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { MoveFilterControls } from '../hooks/useMoveFilters'

type BrutalitiesPageProps = {
  controls: MoveFilterControls
}

// Design: the same shape as the Fatalities page, for brutalities: finishers that
// need a trigger condition to be met during the fight, shown on each card.
function BrutalitiesPage({ controls }: BrutalitiesPageProps) {
  useDocumentTitle('Brutalities - Mortals')
  return (
    <ArchiveTemplate
      title="Brutalities"
      intro="Finishers that are earned mid-fight. Each card lists the trigger you must meet, then the input."
    >
      <MoveArchive kind="brutality" controls={controls} />
    </ArchiveTemplate>
  )
}

export default BrutalitiesPage
