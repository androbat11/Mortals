import type { Fatality } from '../../../data/fatality'
import FatalityCard from '../../molecules/FatalityCard/FatalityCard'
import styles from './FatalityList.module.css'

type FatalityListProps = {
  fatalities: Fatality[]
  hrefFor: (fatality: Fatality) => string
}

// Design: an organism, the list of cards. A real `ul`, so a screen reader says
// how many fatalities there are. The links come from the `hrefFor` function the
// page passes, so this component is the same for any set of fatalities and knows
// nothing about the routes. The layout is a grid in the CSS Module.
function FatalityList({ fatalities, hrefFor }: FatalityListProps) {
  return (
    <ul className={styles.list}>
      {fatalities.map((fatality) => (
        <li key={fatality.id} className={styles.item}>
          <FatalityCard fatality={fatality} href={hrefFor(fatality)} />
        </li>
      ))}
    </ul>
  )
}

export default FatalityList
