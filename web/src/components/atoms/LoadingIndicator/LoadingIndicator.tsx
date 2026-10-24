import type { ReactNode } from 'react'
import styles from './LoadingIndicator.module.css'

type LoadingIndicatorProps = {
  children: ReactNode
}

// Design: an atom, a short message shown while something loads. `role="status"`
// makes a screen reader announce it politely, so a user who cannot see the empty
// area still knows something is coming. It takes `children` for the wording, so
// it is not tied to the 3D scene.
function LoadingIndicator({ children }: LoadingIndicatorProps) {
  return (
    <div className={styles.indicator} role="status">
      {children}
    </div>
  )
}

export default LoadingIndicator
