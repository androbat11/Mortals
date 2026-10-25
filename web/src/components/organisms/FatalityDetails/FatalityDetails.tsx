import type { Fatality } from '../../../data/fatality'
import FatalityHeader from '../../molecules/FatalityHeader/FatalityHeader'
import TutorialSteps from '../../molecules/TutorialSteps/TutorialSteps'
import styles from './FatalityDetails.module.css'

type FatalityDetailsProps = {
  fatality: Fatality
}

// Design: an organism, one self-contained part of the screen: everything
// written about a fatality (game, name, what it does, and how to perform it),
// built from the molecules. It only renders the entry it is given, so it has no
// logic, and it is the same for every fatality (a new one is data only).
function FatalityDetails({ fatality }: FatalityDetailsProps) {
  return (
    <article className={styles.details}>
      <FatalityHeader name={fatality.name} game={fatality.game.name} />
      <section className={styles.section}>
        <h2 className={styles.title}>What it does</h2>
        <p className={styles.text}>{fatality.description}</p>
      </section>
      <TutorialSteps steps={fatality.tutorialSteps} />
    </article>
  )
}

export default FatalityDetails
