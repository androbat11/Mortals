import { countMoves } from '../../../data/countMoves'
import type { FighterEntry } from '../../../data/fighterEntry'
import { fatalitiesHref } from '../../../routing/hrefs'
import styles from './RosterGrid.module.css'

type RosterGridProps = {
  entries: FighterEntry[]
}

// Design: an organism, the About page's fighter cards: name, title, one line about
// them, and how many fatalities and brutalities they have. Each card links to the
// Fatalities page; the counts are derived from the data, so they cannot disagree
// with the pages.
function RosterGrid({ entries }: RosterGridProps) {
  return (
    <ul className={styles.grid}>
      {entries.map((entry) => (
        <li key={entry.fighter.id} className={styles.card}>
          <p className={styles.title}>{entry.fighter.title}</p>
          <h3 className={styles.name}>{entry.fighter.name}</h3>
          <p className={styles.summary}>{entry.fighter.summary}</p>
          <p className={styles.counts}>
            {countMoves(entry, 'fatality')} fatalities ·{' '}
            {countMoves(entry, 'brutality')} brutalities
          </p>
          <a href={fatalitiesHref()} className={styles.link}>
            See {entry.fighter.name}’s finishers
          </a>
        </li>
      ))}
    </ul>
  )
}

export default RosterGrid
