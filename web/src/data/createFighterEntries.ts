import { createFighterRepository } from './createFighterRepository'
import type { FighterEntry } from './fighterEntry'

// Every fighter with their moves, in roster order. The registry is built once and
// used for every id.
export function createFighterEntries(): FighterEntry[] {
  const repository = createFighterRepository()
  return repository.keys().map((id) => repository.create(id))
}
