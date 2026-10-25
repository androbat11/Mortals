import { useMemo } from 'react'
import { createFatalities } from '../data/createFatalities'
import { filterByGame } from '../data/filterByGame'
import type { GameId } from '../data/game'
import { listGames } from '../data/listGames'

// Design: working out what the list page shows is logic, so it is a hook and the
// page only renders. It returns every game (for the filter), the fatalities of
// the chosen game, and the status line ("3 fatalities", "1 fatality in <game>")
// so the wording is not built inside the page. It is memoised on the game so the
// list is not rebuilt on every render.
export function useFatalityList(game: GameId | null) {
  return useMemo(() => {
    const all = createFatalities()
    const games = listGames(all)
    const fatalities = filterByGame(all, game)
    const count = `${fatalities.length} ${fatalities.length === 1 ? 'fatality' : 'fatalities'}`
    const chosen = games.find((candidate) => candidate.id === game)
    return {
      games,
      fatalities,
      status: chosen ? `${count} in ${chosen.name}` : count,
    }
  }, [game])
}
