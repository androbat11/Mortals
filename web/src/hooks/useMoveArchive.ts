import { useMemo } from 'react'
import { countAllMoves } from '../data/countMoves'
import type { FighterEntry } from '../data/fighterEntry'
import type { Game } from '../data/game'
import { filterEntries } from '../data/filterEntries'
import { listCategories } from '../data/listCategories'
import { listGamesWithMoves } from '../data/listGamesWithMoves'
import type { MoveKind } from '../data/move'
import type { MoveFilters } from '../data/moveFilters'
import { useFighterEntries } from './useFighterEntries'

export type MoveArchive = {
  visible: FighterEntry[]
  games: Game[]
  categories: string[]
  total: number
  shown: number
}

// What a move page shows for one kind of move and the current filters: the
// matching fighters with their moves, what the filters offer, and the counts for
// the status line. It is derived (memoised), not stored, so it cannot go stale.
export function useMoveArchive(kind: MoveKind, filters: MoveFilters): MoveArchive {
  const entries = useFighterEntries()
  return useMemo(() => {
    const visible = filterEntries(entries, kind, filters)
    return {
      visible,
      games: listGamesWithMoves(entries, kind),
      categories: listCategories(entries, kind),
      total: countAllMoves(entries, kind),
      shown: countAllMoves(visible, kind),
    }
  }, [entries, kind, filters])
}
