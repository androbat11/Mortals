import { useMemo } from 'react'
import { createFatality } from '../data/createFatality'
import type { Fatality, FatalityId } from '../data/fatality'

// Design: looking a fatality up is logic, so it lives in a hook and the
// components only render what they are given. The lookup builds a new object, so
// it is memoised on the id: the page then keeps the same entry between renders
// and anything that depends on it (the scene) is not rebuilt for no reason.
export function useFatality(id: FatalityId): Fatality {
  return useMemo(() => createFatality(id), [id])
}
