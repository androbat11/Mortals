import { createFatalityRepository } from './createFatalityRepository'
import type { Fatality, FatalityId } from './fatality'

// The lookup the pages will use: a fatality by its id. Each call returns a new
// object, so one caller cannot change what another sees.
export function createFatality(id: FatalityId): Fatality {
  return createFatalityRepository().create(id)
}
