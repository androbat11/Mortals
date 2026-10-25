import { brutalitiesHref, fatalitiesHref } from '../../../routing/hrefs'
import styles from './AboutHero.module.css'

// Design: an organism, the hero of the About (home) page: the title, a short
// pitch, and the two ways into the archive. The calls to action are links, because
// they go to another page; they are styled as the design's triggers (crimson for
// fatalities, bronze for brutalities).
function AboutHero() {
  return (
    <header className={styles.hero}>
      <p className={styles.kicker}>Finishing move archive</p>
      <h1 tabIndex={-1} className={styles.title}>
        Finish <span>them</span>
      </h1>
      <p className={styles.pitch}>
        Browse the fighters, watch an animated preview of each fatality and
        brutality, and learn the exact input to perform it.
      </p>
      <div className={styles.actions}>
        <a href={fatalitiesHref()} className={styles.fatality}>
          Fatalities
        </a>
        <a href={brutalitiesHref()} className={styles.brutality}>
          Brutalities
        </a>
      </div>
    </header>
  )
}

export default AboutHero
