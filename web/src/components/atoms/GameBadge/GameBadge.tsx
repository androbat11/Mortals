import type { ReactNode } from 'react'
import styles from './GameBadge.module.css'

type GameBadgeProps = {
  children: ReactNode
}

// Design: an atom, the smallest piece: a label for the game a fatality comes
// from. It takes `children` instead of a `game` string, so it is not tied to
// fatalities and can label anything.
function GameBadge({ children }: GameBadgeProps) {
  return <span className={styles.badge}>{children}</span>
}

export default GameBadge
