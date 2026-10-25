import type { FighterEntry } from '../../../data/fighterEntry'
import FighterHeader from '../../molecules/FighterHeader/FighterHeader'
import MoveCard from '../MoveCard/MoveCard'
import styles from './FighterSection.module.css'

type FighterSectionProps = {
  entry: FighterEntry
  activeId: string | null
  onPlay: (id: string) => void
  onStop: () => void
}

// Design: an organism, one fighter's block on a move page: the header and a grid
// of that fighter's cards (one column on a phone, two from tablet width). The
// element id is what the roster strip scrolls to; the heading id names the
// section for screen readers.
function FighterSection({ entry, activeId, onPlay, onStop }: FighterSectionProps) {
  const headingId = `heading-${entry.fighter.id}`
  return (
    <section
      id={`fighter-${entry.fighter.id}`}
      className={styles.section}
      aria-labelledby={headingId}
    >
      <FighterHeader fighter={entry.fighter} headingId={headingId} />
      <div className={styles.grid}>
        {entry.moves.map((move) => (
          <MoveCard
            key={move.id}
            move={move}
            active={activeId === move.id}
            onPlay={onPlay}
            onStop={onStop}
          />
        ))}
      </div>
    </section>
  )
}

export default FighterSection
