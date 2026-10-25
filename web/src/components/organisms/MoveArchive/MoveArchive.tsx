import { describeMatches } from '../../../data/describeMatches'
import type { MoveKind } from '../../../data/move'
import type { MoveFilterControls } from '../../../hooks/useMoveFilters'
import { prefersReducedMotion } from '../../../hooks/prefersReducedMotion'
import { scrollToElement } from '../../../hooks/scrollToElement'
import { useActivePreview } from '../../../hooks/useActivePreview'
import { useMoveArchive } from '../../../hooks/useMoveArchive'
import Button from '../../atoms/Button/Button'
import MoveFilterBar from '../../molecules/MoveFilterBar/MoveFilterBar'
import RosterJump from '../../molecules/RosterJump/RosterJump'
import FighterSection from '../FighterSection/FighterSection'
import styles from './MoveArchive.module.css'

type MoveArchiveProps = {
  kind: MoveKind
  controls: MoveFilterControls
}

// Design: an organism, everything a move page shows below its title: the filters,
// the status line, the strip of fighters, and a section per matching fighter. The
// page picks the kind (fatality or brutality) and this works for both, which is why
// the two pages are small. The status line is a polite live region, so a screen
// reader hears how many moves match as the user types. An empty result says so and
// offers to clear the filters.
function MoveArchive({ kind, controls }: MoveArchiveProps) {
  const { filters, setGame, setCategory, clear } = controls
  const { visible, games, categories, total, shown } = useMoveArchive(kind, filters)
  const { activeId, play, stop } = useActivePreview()
  const categoryName = kind === 'fatality' ? 'range' : 'class'

  return (
    <div className={styles.archive}>
      <MoveFilterBar
        games={games}
        categories={categories}
        categoryName={categoryName}
        filters={filters}
        onGame={setGame}
        onCategory={setCategory}
      />
      <p className={styles.status} role="status">
        {describeMatches(shown, total, kind)}
      </p>
      {visible.length === 0 ? (
        <Button onClick={clear}>Clear search and filters</Button>
      ) : (
        <>
          <RosterJump
            fighters={visible.map((entry) => entry.fighter)}
            onJump={(id) => scrollToElement(`fighter-${id}`, !prefersReducedMotion())}
          />
          {visible.map((entry) => (
            <FighterSection
              key={entry.fighter.id}
              entry={entry}
              activeId={activeId}
              onPlay={play}
              onStop={stop}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default MoveArchive
