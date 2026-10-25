import type { Game, GameId } from '../../../data/game'
import FilterLink from '../../atoms/FilterLink/FilterLink'
import styles from './GameFilter.module.css'

type GameFilterProps = {
  games: Game[]
  selected: GameId | null
  hrefFor: (game: GameId | null) => string
}

// Design: a molecule, the whole filter: "All games" first, then one choice per
// game. It is a labelled navigation list of links, and it takes the way to write
// each link from the caller, so it knows nothing about the routes. The choices
// wrap onto new lines on a narrow screen instead of overflowing.
function GameFilter({ games, selected, hrefFor }: GameFilterProps) {
  return (
    <nav aria-label="Filter by game">
      <ul className={styles.list}>
        <li>
          <FilterLink href={hrefFor(null)} current={selected === null}>
            All games
          </FilterLink>
        </li>
        {games.map((game) => (
          <li key={game.id}>
            <FilterLink href={hrefFor(game.id)} current={selected === game.id}>
              {game.name}
            </FilterLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default GameFilter
