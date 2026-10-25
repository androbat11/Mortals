import type { ReactNode } from 'react'
import styles from './InfoPanel.module.css'

type InfoPanelProps = {
  title: string
  tone: 'fatality' | 'brutality'
  children: ReactNode
}

// Design: a molecule, a titled block of text with a coloured edge (crimson for
// fatalities, bronze for brutalities). It takes `children`, so the About page
// fills it with whatever it explains.
function InfoPanel({ title, tone, children }: InfoPanelProps) {
  return (
    <section className={styles.panel} data-tone={tone}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </section>
  )
}

export default InfoPanel
