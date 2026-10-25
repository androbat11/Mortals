import type { ReactNode } from 'react'
import styles from './ListPageTemplate.module.css'

type ListPageTemplateProps = {
  header: ReactNode
  children: ReactNode
}

// Design: a template owns the layout and nothing else: a header slot and the
// content (`children`), centred with a readable maximum width and padding that
// grows with the screen. It knows nothing about fatalities, so it can hold any
// list.
function ListPageTemplate({ header, children }: ListPageTemplateProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>{header}</header>
      {children}
    </main>
  )
}

export default ListPageTemplate
