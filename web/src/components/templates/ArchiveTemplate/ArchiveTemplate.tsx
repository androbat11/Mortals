import type { ReactNode } from 'react'
import styles from './ArchiveTemplate.module.css'

type ArchiveTemplateProps = {
  title: string
  intro: string
  children: ReactNode
}

// Design: a template, the shape of a move page: the page title and one intro
// paragraph over a body slot. The `h1` takes focus after a route change, which is
// why it has `tabIndex={-1}`.
function ArchiveTemplate({ title, intro, children }: ArchiveTemplateProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 tabIndex={-1} className={styles.title}>
          {title}
        </h1>
        <p className={styles.intro}>{intro}</p>
      </header>
      {children}
    </div>
  )
}

export default ArchiveTemplate
