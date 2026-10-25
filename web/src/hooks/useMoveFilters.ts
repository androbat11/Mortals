import { useCallback, useMemo, useState } from 'react'
import { createEmptyFilters } from '../data/createEmptyFilters'
import type { GameId } from '../data/game'
import type { MoveKind } from '../data/move'
import type { MoveFilters } from '../data/moveFilters'

export type MoveFilterControls = {
  filters: MoveFilters
  setText: (text: string) => void
  setGame: (game: GameId | null) => void
  setCategory: (category: string | null) => void
  clear: () => void
}

type State = MoveFilters & { kind: MoveKind }

// Design: the filters are state, so they live in a hook, and the header search and
// the page filters both write to this one place. The search text follows the user
// from the Fatalities to the Brutalities page, but a game or category chosen on one
// page is dropped on the other: a fatality range is not a brutality class, and the
// games on offer differ. The chosen kind is stored with the state so that is
// derived while rendering, with no effect to reset it.
function forKind(state: State, kind: MoveKind): State {
  return state.kind === kind ? state : { ...state, kind, game: null, category: null }
}

export function useMoveFilters(kind: MoveKind): MoveFilterControls {
  const [state, setState] = useState<State>(() => ({ ...createEmptyFilters(), kind }))
  const { text, game, category } = forKind(state, kind)
  const filters = useMemo(() => ({ text, game, category }), [text, game, category])

  const update = useCallback(
    (change: Partial<MoveFilters>) =>
      setState((previous) => ({ ...forKind(previous, kind), ...change })),
    [kind],
  )

  return {
    filters,
    setText: (next) => update({ text: next }),
    setGame: (next) => update({ game: next }),
    setCategory: (next) => update({ category: next }),
    clear: () => update(createEmptyFilters()),
  }
}
