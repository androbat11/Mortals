import type { Game } from '../../../data/game'
import type { MoveFilters } from '../../../data/moveFilters'
import FilterChip from '../../atoms/FilterChip/FilterChip'
import styles from './MoveFilterBar.module.css'

type MoveFilterBarProps = {
  games: Game[]
  categories: string[]
  categoryName: string
  filters: MoveFilters
  onGame: (game: Game['id'] | null) => void
  onCategory: (category: string | null) => void
}

// Design: a molecule, the two chip groups of a move page (the game, and the range
// or class). Pressing the chip that is already on turns it off, so the
// filters need no separate "all" chip. The groups are named with `role="group"`,
// and each chip carries its on/off state.
function MoveFilterBar({
  games,
  categories,
  categoryName,
  filters,
  onGame,
  onCategory,
}: MoveFilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.group} role="group" aria-label="Filter by game">
        {games.map((game) => (
          <FilterChip
            key={game.id}
            label={game.name}
            selected={filters.game === game.id}
            onSelect={() => onGame(filters.game === game.id ? null : game.id)}
          />
        ))}
      </div>
      <div className={styles.group} role="group" aria-label={`Filter by ${categoryName}`}>
        {categories.map((category) => (
          <FilterChip
            key={category}
            label={category}
            selected={filters.category === category}
            onSelect={() =>
              onCategory(filters.category === category ? null : category)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default MoveFilterBar
