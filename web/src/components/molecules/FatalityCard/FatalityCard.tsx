import type { Fatality } from '../../../data/fatality'
import GameBadge from '../../atoms/GameBadge/GameBadge'
import styles from './FatalityCard.module.css'

type FatalityCardProps = {
  fatality: Fatality
  href: string
}

// Design: a molecule, one fatality as a card. The whole card is a single link,
// which gives a large touch target and one tab stop per fatality, instead of a
// small "read more" link. The `href` comes from the caller, so the card knows
// nothing about the routes.
function FatalityCard({ fatality, href }: FatalityCardProps) {
  return (
    <a className={styles.card} href={href}>
      <GameBadge>{fatality.game}</GameBadge>
      <h2 className={styles.title}>{fatality.name}</h2>
      <p className={styles.text}>{fatality.description}</p>
    </a>
  )
}

export default FatalityCard
