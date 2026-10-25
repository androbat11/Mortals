import type { ReactNode } from 'react'
import styles from './AboutTemplate.module.css'

type AboutTemplateProps = {
  hero: ReactNode
  stats: ReactNode
  explainers: ReactNode
  notation: ReactNode
  roster: ReactNode
}

// Design: a template, the vertical rhythm of the About page: hero, a row of stat
// boxes, two explainer panels side by side, then the notation and the roster, each
// under its own heading. It only places slots, so the page decides the content.
function AboutTemplate({ hero, stats, explainers, notation, roster }: AboutTemplateProps) {
  return (
    <div className={styles.page}>
      {hero}
      <div className={styles.stats}>{stats}</div>
      <div className={styles.explainers}>{explainers}</div>
      <section className={styles.section} aria-labelledby="about-notation">
        <h2 id="about-notation">How to read an input</h2>
        {notation}
      </section>
      <section className={styles.section} aria-labelledby="about-roster">
        <h2 id="about-roster">The roster</h2>
        {roster}
      </section>
    </div>
  )
}

export default AboutTemplate
