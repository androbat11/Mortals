import type { ReactNode } from 'react'
import styles from './FilterLink.module.css'

type FilterLinkProps = {
  href: string
  current: boolean
  children: ReactNode
}

// Design: an atom, one choice in a filter. It is an anchor (so a new tab, a
// copied link, and the keyboard all work), and the current choice says so with
// `aria-current`, which a screen reader announces, as well as with its colour,
// so the state is not shown by colour alone.
function FilterLink({ href, current, children }: FilterLinkProps) {
  return (
    <a
      className={current ? `${styles.link} ${styles.current}` : styles.link}
      href={href}
      aria-current={current ? 'true' : undefined}
    >
      {children}
    </a>
  )
}

export default FilterLink
