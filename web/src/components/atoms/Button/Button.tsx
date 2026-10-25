import type { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  children: ReactNode
  onClick: () => void
  variant?: ButtonVariant
}

// Design: an atom. A real `button` element, so it works with touch, mouse, and
// keyboard (Tab, Enter, Space) and is announced correctly, with a large target
// and a visible focus ring from the global style. The variants are the design's
// three triggers: crimson for fatality actions, bronze for brutality ones, and a
// ghost for the rest. It takes `children` and `onClick`, so it is not tied to
// playback.
function Button({ children, onClick, variant = 'ghost' }: ButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      data-variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
