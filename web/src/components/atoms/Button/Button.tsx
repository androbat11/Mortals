import type { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  children: ReactNode
  onClick: () => void
}

// Design: an atom. A real `button` element, so it works with touch, mouse, and
// keyboard (Tab, Enter, Space) and is announced correctly, with a large target
// and a visible focus ring in the CSS. It takes `children` and `onClick`, so it
// is not tied to playback and later screens can reuse it.
function Button({ children, onClick }: ButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
