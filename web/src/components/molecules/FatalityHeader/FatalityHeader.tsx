import GameBadge from '../../atoms/GameBadge/GameBadge'
import styles from './FatalityHeader.module.css'

type FatalityHeaderProps = {
  name: string
  game: string
}

// Design: a molecule, the badge and the page title together. The name is the
// page's one `h1`, and the game comes first so a reader sees where it is from.
function FatalityHeader({ name, game }: FatalityHeaderProps) {
  return (
    <header className={styles.header}>
      <GameBadge>{game}</GameBadge>
      <h1 className={styles.title} tabIndex={-1}>
        {name}
      </h1>
    </header>
  )
}

export default FatalityHeader
