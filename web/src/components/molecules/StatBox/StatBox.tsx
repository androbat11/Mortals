import styles from './StatBox.module.css'

type StatBoxProps = {
  value: number
  label: string
}

// Design: a molecule, one big number with its label, for the counts of the About
// page. The value comes first in the markup, so it reads "12 fatalities".
function StatBox({ value, label }: StatBoxProps) {
  return (
    <div className={styles.box}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default StatBox
