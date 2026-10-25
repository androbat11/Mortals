import type { ReactNode } from 'react'
import styles from './FatalityPageTemplate.module.css'

type FatalityPageTemplateProps = {
  scene: ReactNode
  controls: ReactNode
  details: ReactNode
}

// Design: a template owns the layout and nothing else: three slots, the scene,
// the controls (shown over the bottom of the scene), and the details. It knows
// nothing about fatalities, so it can hold any scene next to any text. The layout
// is in the CSS Module, written mobile-first: stacked on a phone and a portrait
// tablet, side by side from about 960px, where the details column is wide enough
// for a title and a badge to sit comfortably.
function FatalityPageTemplate({
  scene,
  controls,
  details,
}: FatalityPageTemplateProps) {
  return (
    <main className={styles.page}>
      <div className={styles.scene}>
        {scene}
        <div className={styles.controls}>{controls}</div>
      </div>
      <div className={styles.details}>{details}</div>
    </main>
  )
}

export default FatalityPageTemplate
