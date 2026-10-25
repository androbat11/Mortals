import type { Fighter } from '../../../data/fighter'
import styles from './FighterHeader.module.css'

type FighterHeaderProps = {
  fighter: Fighter
  headingId: string
}

// Design: a molecule, the top of a fighter's section: the title above the name,
// the real name and realm, and the labelled facts. It gives the heading an id so
// the section and the roster strip can point to it.
function FighterHeader({ fighter, headingId }: FighterHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.title}>{fighter.title}</p>
      <h2 id={headingId} className={styles.name}>
        {fighter.name}
      </h2>
      <p className={styles.alias}>
        {fighter.alias} · {fighter.realm}
      </p>
      <dl className={styles.facts}>
        {fighter.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}

export default FighterHeader
