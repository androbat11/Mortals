import { useMemo } from 'react'
import { createFatalities } from '../data/createFatalities'
import { filterByGame } from '../data/filterByGame'
import { listGames } from '../data/listGames'

// Design: working out what the list page shows is logic, so it is a hook and the
// page only renders. It returns every game (for the filter) and the fatalities
// of the chosen game, memoised on the game so the list is not rebuilt on every
// render.
export function useFatalityList(game: string | null) {
  return useMemo(() => {
    const all = createFatalities()
    return { games: listGames(all), fatalities: filterByGame(all, game) }
  }, [game])
}
