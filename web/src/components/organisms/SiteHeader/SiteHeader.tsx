import { createNavItems } from '../../../routing/navItems'
import type { Route } from '../../../routing/route'
import MoveSearch from '../../molecules/MoveSearch/MoveSearch'
import SiteNav from '../../molecules/SiteNav/SiteNav'
import styles from './SiteHeader.module.css'

export type SiteSearch = {
  value: string
  onChange: (value: string) => void
}

type SiteHeaderProps = {
  current: Route['name']
  search?: SiteSearch
}

// Design: an organism, the brand, the navigation, and (on the move pages only) the
// search. The About page has nothing to search, so it gets no field instead of a
// dead one. The brand is a link home, not a heading, so each page's own `h1` is the
// only top-level heading.
function SiteHeader({ current, search }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#/" className={styles.brand}>
          Mortals
        </a>
        <SiteNav items={createNavItems()} current={current} />
        {search && (
          <div className={styles.search}>
            <MoveSearch value={search.value} onChange={search.onChange} />
          </div>
        )}
      </div>
    </header>
  )
}

export default SiteHeader
