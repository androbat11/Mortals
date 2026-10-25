import styles from './CornerBrackets.module.css'

// Design: an atom, the industrial bracket marks the design puts on the corners of
// a preview slot. Decorative, so it is hidden from assistive technology, and it
// ignores pointer events so it never blocks the controls under it.
function CornerBrackets() {
  return (
    <span className={styles.brackets} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

export default CornerBrackets
