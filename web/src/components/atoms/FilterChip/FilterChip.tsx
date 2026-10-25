import styles from './FilterChip.module.css'

type FilterChipProps = {
  label: string
  selected: boolean
  onSelect: () => void
}

// Design: an atom, one choice in a filter. A real `button` with `aria-pressed`, so
// keyboard and screen reader users get the on/off state that sighted users see as
// the crimson fill.
function FilterChip({ label, selected, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      className={styles.chip}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {label}
    </button>
  )
}

export default FilterChip
