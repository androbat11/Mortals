import { useId } from 'react'
import type { TutorialSteps as Steps } from '../../../data/fatality'
import styles from './TutorialSteps.module.css'

type TutorialStepsProps = {
  steps: Steps
}

// Design: a molecule that shows the tutorial as an ordered list, because the
// order is the point of a tutorial and a screen reader announces the count and
// position. The section is labelled by its own heading (`useId` keeps the id
// unique if there are several). The steps are a fixed list that never reorders,
// so using the position in the key is safe here.
function TutorialSteps({ steps }: TutorialStepsProps) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className={styles.section}>
      <h2 id={headingId} className={styles.title}>
        How to perform it
      </h2>
      <ol className={styles.list}>
        {steps.map((step, index) => (
          <li key={`${index}-${step}`} className={styles.step}>
            {step}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default TutorialSteps
