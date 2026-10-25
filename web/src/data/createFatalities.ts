import { createFatalityRepository } from './createFatalityRepository'
import type { Fatality } from './fatality'

// Every fatality, for the list page. The registry is built once and used for
// every id, instead of once per entry.
export function createFatalities(): Fatality[] {
  const repository = createFatalityRepository()
  return repository.keys().map((id) => repository.create(id))
}
