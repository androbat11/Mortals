import type { ReactNode } from 'react'
import styles from './BackLink.module.css'

type BackLinkProps = {
  href: string
  children: ReactNode
}

// Design: an atom, a plain anchor (so the browser's own back, new-tab, and
// keyboard behaviour work) with an arrow. The arrow is decoration only, so it is
// hidden from screen readers. It takes `href` and `children`, so it knows
// nothing about the routes.
function BackLink({ href, children }: BackLinkProps) {
  return (
    <a className={styles.link} href={href}>
      <span aria-hidden="true">←</span> {children}
    </a>
  )
}

export default BackLink
