import type { NavItem } from '../../../routing/navItems'
import type { Route } from '../../../routing/route'
import styles from './SiteNav.module.css'

type SiteNavProps = {
  items: NavItem[]
  current: Route['name']
}

// Design: a molecule, the main navigation. It receives the links as data, marks
// the current page with `aria-current="page"` (read by screen readers, and used by
// the CSS for the amber underline, so the two cannot disagree).
function SiteNav({ items, current }: SiteNavProps) {
  return (
    <nav aria-label="Main">
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={styles.link}
              aria-current={item.name === current ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SiteNav
