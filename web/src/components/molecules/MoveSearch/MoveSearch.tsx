import ReticleIcon from '../../atoms/ReticleIcon/ReticleIcon'
import styles from './MoveSearch.module.css'

type MoveSearchProps = {
  value: string
  onChange: (value: string) => void
}

// Design: a molecule, the search field of the header. A `type="search"` input
// with a real label (hidden visually, so a screen reader still names it), and it
// filters as the user types, so there is no submit button.
function MoveSearch({ value, onChange }: MoveSearchProps) {
  return (
    <label className={styles.field}>
      <span className={styles.name}>Search the archive</span>
      <span className={styles.icon}>
        <ReticleIcon />
      </span>
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder="Search fighter, move, or input…"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default MoveSearch
