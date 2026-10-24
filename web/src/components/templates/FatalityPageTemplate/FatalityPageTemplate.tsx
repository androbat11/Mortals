import type { ReactNode } from 'react'
import styles from './FatalityPageTemplate.module.css'

type FatalityPageTemplateProps = {
  scene: ReactNode
  details: ReactNode
}

// Design: a template owns the layout and nothing else: two slots, the scene and
// the details, so it knows nothing about fatalities and can hold any scene next
// to any text. The layout is in the CSS Module, written mobile-first: stacked on
// a phone, side by side from tablet width.
function FatalityPageTemplate({ scene, details }: FatalityPageTemplateProps) {
  return (
    <main className={styles.page}>
      <div className={styles.scene}>{scene}</div>
      <div className={styles.details}>{details}</div>
    </main>
  )
}

export default FatalityPageTemplate
