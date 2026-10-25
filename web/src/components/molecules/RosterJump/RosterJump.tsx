import type { Fighter } from '../../../data/fighter'
import styles from './RosterJump.module.css'

type RosterJumpProps = {
  fighters: Fighter[]
  onJump: (fighterId: Fighter['id']) => void
}

// Design: a molecule, the strip of fighter names that jumps to a section. On a
// phone it scrolls sideways inside its own box (the design's fighter strip), so
// the page itself never scrolls sideways. It is a labelled `nav` of buttons, not
// `#` links, because the app's routes use the URL hash.
function RosterJump({ fighters, onJump }: RosterJumpProps) {
  return (
    <nav aria-label="Jump to a fighter">
      <ul className={styles.strip}>
        {fighters.map((fighter) => (
          <li key={fighter.id}>
            <button
              type="button"
              className={styles.jump}
              onClick={() => onJump(fighter.id)}
            >
              {fighter.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RosterJump
