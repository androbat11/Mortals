import type { ReactNode } from 'react'
import styles from './Tag.module.css'

type TagTone = 'fatality' | 'brutality' | 'neutral'

type TagProps = {
  children: ReactNode
  tone?: TagTone
}

// Design: an atom, a small sharp label (a range, a class, a game, "Unverified").
// One tag with a `tone` serves all of them instead of a component for each, so a
// new kind of label is a prop and not a new file. The tone is also written in the
// text, never colour alone.
function Tag({ children, tone = 'neutral' }: TagProps) {
  return (
    <span className={styles.tag} data-tone={tone}>
      {children}
    </span>
  )
}

export default Tag
